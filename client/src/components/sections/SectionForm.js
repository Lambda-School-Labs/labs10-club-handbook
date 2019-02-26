import React, { Component } from 'react'
import axios from 'axios'
import TextEditor from './TextEditor'
import { Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { addSection, updateSection } from '../../store/actions/clubActions'

import {
  FormContainer,
  Row,
  Label,
  SectionInput,
  ImageInput,
} from '../../style/section-form'

class SectionForm extends Component {
  state = {
    clubId: null,
    title: '',
    body: '',
    imgPlacement: 4,
    selectedFile: null,
    image: '',
    orderPosition: null,
    contactName: '',
    contactInfo: '',
    color: null,
    font: null,
  }

  componentDidMount() {
    const { club_id } = this.props.currentUser

    if (this.props.update === true) {
      const currentSection = this.props.sections.find(
        section => section.id === this.props.match.params.id
      )
      this.setState({
        clubId: club_id,
        title: currentSection.title,
        body: currentSection.bidy,
        imgPlacement: currentSection.img_placement,
        image: currentSection.img_url,
        orderPosition: currentSection.order,
        contactName: currentSection.contact_name,
        contactInfo: currentSection.contact_info,
      })
    } else {
      this.setState({ clubId: club_id })
    }
  }

  changeHandler = e => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  bodyChangeHandler = e => {
    this.setState({ body: e })
  }

  fileHandler = e => {
    this.setState({ selectedFile: e.target.files[0] })
  }

  uploadImg = e => {
    e.preventDefault()
    console.log(`upload img`)

    const fd = new FormData()
    fd.append('image', this.state.selectedFile)

    axios
      .post('https://club-handbook.herokuapp.com/api/images/upload', fd)
      .then(res => {
        this.setState({ image: res.data.image })
      })
      .catch(err => console.log(err))
  }

  addSection = ev => {
    ev.preventDefault()
    let sectionInfo = {
      club_id: this.state.clubId,
      title: this.state.title,
      body: this.state.body,
      img_url: this.state.image,
      img_placement: this.state.imgPlacement,
      contact_name: this.state.contactName,
      contact_info: this.state.contactInfo,
    }
    this.props.addSection(this.state.clubId, sectionInfo)
  }

  updateSection = ev => {
    ev.preventDefault()
    let sectionInfo = {
      club_id: this.state.clubId,
      title: this.state.title,
      body: this.state.body,
      img_url: this.state.image,
      img_placement: this.state.imgPlacement,
      contact_name: this.state.contactName,
      contact_info: this.state.contactInfo,
    }
    this.props.updateSection(this.state.clubId, sectionInfo)
  }

  cancel = e => {
    this.props.cancel(e)
  }

  render() {
    const { clubId } = this.state

    if (!clubId) {
      return <h1>Loading...</h1>
    }

    return (
      <FormContainer>
        <form
          method="/POST"
          encType="multipart/form-data"
          onSubmit={this.props.update ? this.updateSection : this.addSection}
        >
          <div className="form-group">
            <Row>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.cancel}
              >
                Cancel
              </Button>

              {this.props.update ? (
                <h2>Update Section</h2>
              ) : (
                <h2>Create Section</h2>
              )}

              <Button
                onClick={
                  this.props.update ? this.updateSection : this.addSection
                }
                variant="contained"
                color="primary"
              >
                Save Section
              </Button>
            </Row>

            <Row>
              <Label htmlFor="title">Section Title</Label>
              <SectionInput
                id="title"
                name="title"
                onChange={this.changeHandler}
                required
                value={this.state.title}
              />
            </Row>

            <Label htmlFor="body" marginBottom>
              Section Body
            </Label>
            <TextEditor
              bodyChangeHandler={this.bodyChangeHandler}
              body={this.state.body}
            />

            <Row style={{ marginTop: '6rem' }}>
              <Label htmlFor="contact-name">Contact Name</Label>
              <SectionInput
                id="contact-name"
                name="contactName"
                onChange={this.changeHandler}
                required
                value={this.state.contactName}
              />
            </Row>

            <Row>
              <Label htmlFor="contact-info">Contact Info</Label>
              <SectionInput
                id="contact-info"
                name="contactInfo"
                onChange={this.changeHandler}
                required
                value={this.state.contactInfo}
              />
            </Row>

            <Row>
              <ImageInput
                label="Upload Image"
                onChange={this.fileHandler}
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.uploadImg}
              >
                Upload
              </Button>

              <Label htmlFor="section-type">Section Type</Label>
              <select name="section-type" id="section-type">
                <option value="4">No Image</option>
                <option value="1">Image Background</option>
                <option value="2">Image Left</option>
                <option value="3">Image Right</option>
              </select>
            </Row>

            <Row>
              <Label htmlFor="background">Background Color</Label>
              <select name="background" id="background">
                <option value="white">white</option>
                <option value="black">black</option>
                <option value="blue">blue</option>
                <option value="yellow">yellow</option>
                <option value="red">red</option>
                <option value="orange">orange</option>
              </select>

              <Label htmlFor="title-font">Title Font</Label>
              <select name="title-font" id="title-font">
                <option value="Helvetica Neue">Helvetica Neue</option>
                <option value="Sans Serif">Sans Serif</option>
                <option value="Roboto">Roboto</option>
              </select>
            </Row>

            <Row>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.cancel}
              >
                Cancel
              </Button>
              <Button
                onClick={
                  this.props.update ? this.updateSection : this.addSection
                }
                variant="contained"
                color="primary"
              >
                Save Section
              </Button>
            </Row>
          </div>
        </form>
      </FormContainer>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    sections: state.clubs.sections,
  }
}

export default connect(
  mapStateToProps,
  { addSection, updateSection }
)(SectionForm)

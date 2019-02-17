import React, { Component } from 'react'
import axios from 'axios'
import TextEditor from './TextEditor'
import renderHtml from 'react-render-html'
import { Button } from '@material-ui/core'

class SectionForm extends Component {
  state = {
    clubId: null,
    handbook: [],
    title: '',
    isSubsection: false,
    body: '',
    imgUrl: '',
    orderPosition: null,
    contactName: '',
    contactInfo: '',
    color: null,
    font: null,
    sectionType: null,
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

    const fd = new FormData()
    fd.append('image', this.state.selectedFile)

    axios
      .post('https://club-handbook.herokuapp.com/api/images/upload', fd)
      .then(res => {
        this.setState({ image: res.data.image })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="section-form">
        <form method="/POST" encType="multipart/form-data">
          <div className="form-group">
            <div className="action-btns">
              <Button variant="contained" color="secondary">
                Cancel
              </Button>

              <h2>Create Section</h2>

              <Button variant="contained" color="primary">
                Save Section
              </Button>
            </div>

            <label htmlFor="title">Section Title</label>
            <input
              id="title"
              name="title"
              onChange={this.changeHandler}
              style={{ width: '500px' }}
              required
            />

            <label htmlFor="subsection">Subsection</label>
            <input id="subsection" name="subsection" type="checkbox" />
            <span className="slider" />

            <TextEditor
              bodyChangeHandler={this.bodyChangeHandler}
              body={this.state.body}
            />

            <label htmlFor="contact-name">Contact Name</label>
            <input
              id="contact-name"
              name="contact-name"
              onChange={this.changeHandler}
              style={{ width: '500px' }}
              required
            />

            <label htmlFor="contact-info">Contact Info</label>
            <input
              id="contact-info"
              name="contact-info"
              onChange={this.changeHandler}
              style={{ width: '500px' }}
              required
            />

            <input
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

            <label htmlFor="section-type">Section Type</label>
            <select name="section-type" id="section-type">
              <option value="image-bg">Image Background</option>
              <option value="image-left">Image Left</option>
              <option value="image-right">Image Right</option>
              <option value="no-image">No Image</option>
            </select>

            <label htmlFor="background">Background Color</label>
            <select name="background" id="background">
              <option value="white">white</option>
              <option value="black">black</option>
              <option value="blue">blue</option>
              <option value="yellow">yellow</option>
              <option value="red">red</option>
              <option value="orange">orange</option>
            </select>

            <label htmlFor="title-font">Title Font</label>
            <select name="title-font" id="title-font">
              <option value="Helvetica Neue">Helvetica Neue</option>
              <option value="Sans Serif">Sans Serif</option>
              <option value="Roboto">Roboto</option>
            </select>

            <label htmlFor="body-font">Body Font</label>
            <select name="body-font" id="body-font">
              <option value="Helvetica Neue">Helvetica Neue</option>
              <option value="Sans Serif">Sans Serif</option>
              <option value="Roboto">Roboto</option>
            </select>

            <div className="action-btns">
              <Button variant="contained" color="secondary">
                Cancel
              </Button>
              <Button variant="contained" color="primary">
                Save Section
              </Button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

SectionForm.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
}

SectionForm.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
  'background',
  'align',
]

export default SectionForm
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import SectionForm from '../sections/SectionForm'
import DashBar from '../NewDash'
import HandbookForm from './HandbookForm'
import HandbookRender from './HandbookRender'
import LoadingPage from '../loading/loading'

import {
  getClubById,
  updateClub,
  createClub,
  getClubSections,
} from '../../store/actions/clubActions'

class HandbookPage extends React.Component {
  state = {
    sectionView: false,
    editView: false,
    addView: false,
    hasClub: false,
    title: '',
    sectionId: '',
    value: 0,
    displayHandbook: false,
  }

  componentDidMount() {
    if (this.props.currentUser) {
      if (this.props.currentUser.club_id) {
        this.setState({ hasClub: true })
        this.props.getClubById(this.props.currentUser.club_id)
        this.props.getClubSections(this.props.currentUser.club_id)
      }
    }
  }

  handleChange = ev => {
    this.setState({
      [ev.target.name]: ev.target.value,
    })
  }

  handleTabChange = (ev, value) => {
    this.setState({ value })
  }

  createClub = ev => {
    ev.preventDefault()
    let clubInfo = {
      name: this.state.title,
    }
    this.props.createClub(clubInfo)
  }

  updateClub = ev => {
    ev.preventDefault()
    let clubInfo = {
      name: this.state.title,
    }
    this.props.updateClub(this.props.currentUser.club_id, clubInfo)
  }

  sectionViewOn = ev => {
    ev.preventDefault()
    this.setState({
      sectionView: true,
    })
  }

  sectionViewOff = ev => {
    ev.preventDefault()
    this.setState({
      sectionView: false,
    })
  }

  toggleEditView = id => {
    this.setState({
      editView: !this.state.editView,
      sectionId: id,
    })
  }

  toggleAddView = ev => {
    ev.preventDefault()
    this.setState({
      addView: !this.state.addView,
    })
  }

  cancel = ev => {
    ev.preventDefault()
    this.setState({
      addView: false,
      editView: false,
      displayHandbook: false,
    })
  }

  displayHandbook = ev => {
    console.log('display handbook')
    ev.preventDefault()
    this.setState({
      displayHandbook: true,
    })
  }

  render() {
    return (
      <>
        <DashBar />
        <HandbookPageContainer>
          <HandbookForm
            hasClub={this.state.hasClub}
            updateClub={this.updateClub}
            createClub={this.createClub}
            sectionViewOn={this.sectionViewOn}
            sectionViewOff={this.sectionViewOff}
            sections={this.props.sections}
            sectionView={this.state.sectionView}
            toggleEditView={this.toggleEditView}
            toggleAddView={this.toggleAddView}
            title={this.state.title}
            handleChange={this.handleChange}
            handleTabChange={this.handleTabChange}
            value={this.state.value}
            club={this.props.club}
            clubId={this.props.club.id}
            displayHandbook={this.displayHandbook}
          />

          <HandbookRender
            displayHandbook={this.state.displayHandbook}
            cancel={this.cancel}
            sections={this.props.sections}
            // loading={this.props.loading}
          />

          {this.state.editView ? (
            <SectionForm
              cancel={this.toggleEditView}
              update
              sectionId={this.state.sectionId}
            />
          ) : null}

          {this.state.addView ? <SectionForm cancel={this.cancel} /> : null}
        </HandbookPageContainer>
        {this.props.loading ? <LoadingPage /> : null}
      </>
    )
  }
}
const HandbookPageContainer = styled.div`
  display: flex;
  max-width: 120rem;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 3rem;
  position: relative;
  z-index: 0;
`

const mapStateToProps = state => {
  return {
    currentUser: state.auth.currentUser,
    club: state.clubs.clubById,
    sections: state.clubs.sections,
    loading: state.clubs.loading,
  }
}

export default connect(
  mapStateToProps,
  { getClubById, updateClub, createClub, getClubSections }
)(HandbookPage)

import React from 'react'
import { AppBar, Button, Avatar } from '@material-ui/core'

import { connect } from 'react-redux'
import { updateUser } from '../../store/actions/usersActions'
import { Link } from 'react-router-dom'

import './Members.css'

class UpdateMembers extends React.Component {
  constructor() {
    super()
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
    }
  }

  handleChanges = event => {
    // this.setState({ [event.target.name]: event.target.value })
  }

  updateMember = event => {
    event.preventDefault()
    this.props.updateMember(this.state.value)
  }

  render() {
    return (
      <div className="members-container">
        <AppBar position="static">
          <div className="members-header">
            <h1>Update Club Member Info</h1>
          </div>
        </AppBar>
        <form onSubmit={this.updateMember}>
          <input
            type="text"
            name="firstname"
            onChange={this.handleChanges}
            placeholder="firstname"
            value={this.state.value}
          />

          <input
            type="text"
            name="lastname"
            onChange={this.handleChanges}
            placeholder="lastname"
            value={this.state.value}
          />

          <input
            type="text"
            name="email"
            onChange={this.handleChanges}
            placeholder="email"
            value={this.state.value}
          />
          <button>Update Club Member Info</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
    loading: state.users.loading,
  }
}

export default connect(
  mapStateToProps,
  { updateUser }
)(UpdateMembers)

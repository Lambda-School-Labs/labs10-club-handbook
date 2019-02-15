import React from 'react';
import styled from 'styled-components';
import { FormGroup, FormControlLabel, TextField, Button, Checkbox } from '@material-ui/core';

const SettingsContainer = styled.div`
margin: auto;
margin-top: 10px;
display: flex;
justify-content: center;
align-items: center;
width: 700px;
height: 450px;
`

class Settings extends React.Component {
    state = {
        checkedEmail: false,
        checkednText: false,
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    render() {
        return(
            <SettingsContainer>
            <form>
                <TextField
                    id="outlined-email"
                    label="Email"
                    margin="normal"
                    variant="outlined"
                    />
                <TextField
                    id="outlined-phone"
                    label="Phone"
                    margin="normal"
                    variant="outlined"
                    />
                <div>
                    <FormGroup row>
                        <FormControlLabel 
                            label="Email?"
                            labelPlacement="start"
                            control={
                                <Checkbox
                                    checked={this.state.checkedEmail}
                                    onChange={this.handleChange('checkedEmail')}
                                    value="checkedEmail"
                                    color="primary"
                                />
                            }
                        />
                        <FormControlLabel 
                            label="Text?"
                            labelPlacement="start"
                            control={
                                <Checkbox
                                    checked={this.state.checkedText}
                                    onChange={this.handleChange('checkedText')}
                                    value="checkedText"
                                    color="primary"
                                />
                            }
                        />
                    </FormGroup>
                </div>
                <Button variant="contained" size="large" color="primary">
                    SAVE
                </Button>
                <Button variant="contained" size="large" color="secondary">
                    LEAVE TEAM
                </Button>
            </form>
            </SettingsContainer>
        );
    }
}

export default Settings;
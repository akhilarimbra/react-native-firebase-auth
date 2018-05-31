import React, { Component } from 'react'
import {
  Text
} from 'react-native'

import {
  Button,
  Card,
  CardSection,
  Input,
  Spinner
} from './common'

import firebase from 'firebase'

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  onButtonPressed() {
    const { email, password } = this.state;
    if (!email) {
      alert('Enter email')
    } else {
      if (!password) {
        alert('Enter password')
      }
    }
    if (email && password) {
      this.setState({ error: '', loading: true})
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(error => {
          // Request Fails, try to create a user
          console.log(error)
          if (error.code != 'auth/user-not-found') {
            this.setState({ loading: false })
            this.setState({ error: error.message })
          }
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(error => {
              // If fails, show an error
              console.log(error)
              if (error.code != 'auth/email-already-in-use') {
                this.setState({ loading: false })
                this.setState({ error: error.message })
              }
            })
        })
    }
  }

  onLoginSuccess() {
    console.log("Success")
    this.setState({
      email: '',
      password: '',
      error: '',
      loading: false
    })


  }

  renderLoginButton() {
    if (this.state.loading) {
      return <Spinner size='small' />
    } else {
      return (
        <Button
          onPress={this.onButtonPressed.bind(this)}
          title='Login' />
      )
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            isPassword={false}
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            placeholder='someone@example.com'
            label='Email' />
        </CardSection>

        <CardSection>
          <Input
            isPassword={true}
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
            placeholder='******'
            label='Password' />
        </CardSection>

        <Text style={styles.authenticationErrorStyle}>{this.state.error}</Text>

        <CardSection>
          {this.renderLoginButton()}
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  authenticationErrorStyle: {
    color: 'red',
    fontWeight: '600',
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 0,
    alignSelf: 'center',
    textAlign: 'center'
  }
}

export default LoginForm

import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import firebase from 'firebase'

import {
  Header
} from './common/index'
import LoginForm from './LoginForm'

class App extends Component {
  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyAZkGdn1dqw9K_OM-sQwPldpme1CPsO8Hs",
      authDomain: "test-bc7c5.firebaseapp.com",
      databaseURL: "https://test-bc7c5.firebaseio.com",
      projectId: "test-bc7c5",
      storageBucket: "",
      messagingSenderId: "620047757814"
    }
    firebase.initializeApp(config)
  }

  render() {
    return (
      <View>
        <Header title='Authentication' />
        <LoginForm />
      </View>
    )
  }
}

export default App

import React, { Component } from 'react'
import {
  Text,
  View
} from 'react-native'
import firebase from 'firebase'

import {
  Header,
  Button,
  Card,
  CardSection,
  Spinner
} from './common/index'
import LoginForm from './LoginForm'

class App extends Component {
  state = {
    loggedIn: null
  }

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

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user)
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false })
      }
    })
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Card>
            <CardSection>
              <Button
                onPress={() => firebase.auth().signOut()}
                title='Log out' />
            </CardSection>
          </Card>
        )
      case false:
        return <LoginForm />
      default:
        return (
          <View style={styles.spinnerStyle}>
             <Spinner size='large' />
          </View>
        )
    }
  }

  render() {
    return (
      <View>
        <Header title='Authentication' />
        {this.renderContent()}
      </View>
    )
  }
}

const styles = {
  spinnerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
}

export default App

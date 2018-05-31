import React, { Component } from 'react'
import ReactNative, {
  Text,
  View
} from 'react-native'

class Header extends Component {
  render() {
    const { viewStyle, textStyle } = styles;
    const { title } = this.props;
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{ title }</Text>
      </View>
    )
  }
}

const styles = {
  viewStyle: {
    paddingTop: 20,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.3,
    elevation: 1,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
}

export { Header }

import React from 'react'
import { View, Alert } from 'react-native'
import {
  Screen, Title, Icon,
  TouchableOpacity } from '@shoutem/ui'

const Header = (props) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start', padding:20}}>
        <Title style={{flex: 1}}>{props.title}</Title>
        <TouchableOpacity onPress={() => {
          Alert.alert(
            'Infromation',
            'SLVN Group, s.r.o.',
            [
              {text: 'Close', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: true }
          )
        }}>
          <Icon name="about" />
        </TouchableOpacity>
      </View>)
  
}
const ModalHeader = (props) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'flex-start', padding:20}}>
        <TouchableOpacity onPress={() => {
          props.navigation.goBack()
        }}>
        <Icon name="back" />
        <Title style={{flex: 1}}></Title>
        </TouchableOpacity>
      </View>)
}
const Loading = (props) => {
  return (
    <Screen style={{ alignItems:'center', justifyContent:'center' }}>
      <Title>Loading</Title>
    </Screen>
  )
}
export { Header, ModalHeader, Loading }
import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import Topbar from '../components/topbar'
import HomeOptions from '../components/homeOptions'
import VarietyList from '../components/varietyList'
// import UserName from '../data/userName'
import { useAuthentication } from '../utils/hooks/useAuthentication'
import { getAuth } from 'firebase/auth'
import * as ImagePicker from 'expo-image-picker'

const auth = getAuth()
const Homescreen = ({ datas }) => {
  const { user } = useAuthentication()

  // const updateprofilename = () => {
  //   // user.displayName = 'idris'
  //   console.log('====================================')
  //   // console.log(user.displayName)
  //   console.log(auth.currentUser.displayName)
  //   console.log('====================================')
  // }
  // const { userData } = route.params
  return (
    <View style={styles.container}>
      <Topbar />
      {/* <Button title='log user' onPress={updateprofilename} /> */}
      {/* <UserName /> */}
      <HomeOptions />
      <VarietyList />
    </View>
  )
}

export default Homescreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

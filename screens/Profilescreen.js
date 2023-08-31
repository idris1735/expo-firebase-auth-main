import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'

const Profilescreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topHeaderContainer}>
        <TouchableOpacity style={styles.gobackButton}>
          <Text>{'<'} </Text>
        </TouchableOpacity>
        <View style={styles.username}>
          <Text>Username</Text>
        </View>
        <TouchableOpacity style={styles.otherFunctions}>
          <Text>...</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profilescreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
  },
  topHeaderContainer: {
    height: 60,
    width: '100%',
    backgroundColor: colors.light,
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

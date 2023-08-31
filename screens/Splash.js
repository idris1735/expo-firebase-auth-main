import React from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
// import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux' // Import useDispatch and useSelector
import { setTableNumber, selectTableNumber } from '../store/tableNumberSlice' // Import selectTableNumber

import colors from '../assets/colors/colors'

const Splash = ({ navigation }) => {
  const dispatch = useDispatch()
  const tableNumber = useSelector(selectTableNumber) // Get the tableNumber from Redux

  const handleContinue = () => {
    // Dispatch the action to set the table number in Redux
    dispatch(setTableNumber(tableNumber))

    // Navigate to the next screen (WelcomeScreen in your case)
    navigation.navigate('Homescreen')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome to RetailRise</Text>
      <Text>Please enter your table number:</Text>
      <TextInput
        style={styles.input}
        placeholder='Table Number'
        value={tableNumber} // Use tableNumber from Redux here
        onChangeText={(text) => dispatch(setTableNumber(text))} // Dispatch action to update tableNumber
        keyboardType='numeric'
      />
      <Button color={colors.green} title='Continue' onPress={handleContinue} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    borderRadius: 5,
  },
})

export default Splash

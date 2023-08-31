import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import colors from '../assets/colors/colors'

const DownloadReceiptImage = ({ order }) => {
  const navigation = useNavigation()

  const ordering = order

  const carryOrder = () => {
    console.log('====================================')
    console.log(ordering)
    console.log('====================================')
    navigation.navigate('GenerateImageButton', { orders: ordering })
  }
  return (
    <View>
      <TouchableOpacity onPress={carryOrder} style={styles.printButton}>
        <Text style={styles.buttonText}>Generate Image Receipt</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DownloadReceiptImage

const styles = StyleSheet.create({
  printButton: {
    backgroundColor: colors.green,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

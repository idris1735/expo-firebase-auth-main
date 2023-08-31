import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import * as Print from 'expo-print'
import colors from '../assets/colors/colors'

const PrintButton = ({ order }) => {
  console.log('====================================')
  console.log(order)
  console.log('====================================')
  const receiptData = `
  Order ID: ${order.orderID}
  Item: ${order.item}
  Quantity: ${order.quantity}
  Price: $${order.price}
`

  const handlePrintReceipt = async () => {
    const options = {
      html: receiptData,
      width: 200, // The width of the receipt (in pixels)
      height: 200, // The height of the receipt (in pixels)
    }

    await Print.printAsync(options)
  }

  return (
    <TouchableOpacity onPress={handlePrintReceipt} style={styles.printButton}>
      <Text style={styles.buttonText}>Print to POS</Text>
    </TouchableOpacity>
  )
}
export default PrintButton

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

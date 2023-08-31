import * as React from 'react'
import {
  View,
  StyleSheet,
  Button,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native'
import * as Print from 'expo-print'
import { shareAsync } from 'expo-sharing'
import colors from '../assets/colors/colors'

export default function PdfButton({ order }) {
  const html = `
<html>
  <head>
    <meta charset="UTF-8">
    <title>Receipt</title>
    <style>
      /* Styles for the receipt */
      body {
        font-family: Arial, sans-serif;
        font-size: 12px;
      }
      h1 {
        font-size: 14px;
        font-weight: bold;
        text-align: center;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      table td, table th {
        border: 1px solid #ddd;
        padding: 8px;
      }
      table th {
        text-align: left;
        background-color: #f2f2f2;
      }
      .subtotal {
        text-align: right;
      }
      .total {
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <h1>Receipt</h1>
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${order.item}</td>
          <td>${order.quantity}</td>
          <td>${order.price}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="subtotal" colspan="2">Subtotal:</td>
          <td>${order.price * order.quantity}</td>
        </tr>
        <tr>
          <td class="subtotal" colspan="2">Tax:</td>
          <td>${order.price * order.quantity * 0.1}</td>
        </tr>
        <tr>
          <td class="total" colspan="2">Total:</td>
          <td>${order.price * order.quantity * 1.1}</td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>
`

  const [selectedPrinter, setSelectedPrinter] = React.useState()

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    })
  }

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html })
    console.log('File has been saved to:', uri)
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
  }

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync() // iOS only
    setSelectedPrinter(printer)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={print} style={styles.printButton}>
        <Text style={styles.buttonText}>print</Text>
      </TouchableOpacity>
      <View style={styles.spacer} />
      <TouchableOpacity onPress={printToFile} style={styles.printButton}>
        <Text style={styles.buttonText}>Download PDF FILE</Text>
      </TouchableOpacity>
      {Platform.OS === 'ios' && (
        <>
          <View style={styles.spacer} />
          <Button title='Select printer' onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text
              style={styles.printer}
            >{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </View>
  )
}

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

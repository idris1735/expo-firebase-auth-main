import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import PdfButton from './pdfButton'
import GenerateImageButton from './generateImageButton'
import PrintButton from './printButton'
import DownloadReceiptImage from './downloadReceiptImage'

const OrderModal = ({ order, visible, onClose }) => {
  return (
    <Modal visible={visible} animationType='slide' onRequestClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.headerText}>ORDER RECEIPT</Text>
        <Text style={styles.orderText}>OrderID: {order.orderID}</Text>
        <Text style={styles.orderText}>Pizza type: {order.item} </Text>
        <Text style={styles.orderText}>Price: {order.price} </Text>
        <PdfButton order={order}></PdfButton>
        <DownloadReceiptImage order={order}></DownloadReceiptImage>
        <PrintButton order={order}></PrintButton>
      </View>
    </Modal>
  )
}
//
export default OrderModal

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  orderText: {
    fontSize: 15,
    color: 'black',
    marginBottom: 10,
    fontWeight: 'bold',
  },
})

import React, { useRef } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import ViewShot from 'react-native-view-shot'
import * as Sharing from 'expo-sharing'
import colors from '../assets/colors/colors'

const GenerateImageButton = ({ route, navigation }) => {
  const { orders } = route.params
  const viewShotRef = useRef(null)

  const handleDownloadReceipt = async () => {
    try {
      const uri = await viewShotRef.current.capture()
      await Sharing.shareAsync(uri)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            height: 400,
            width: 300,
            borderRadius: 10,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Pizza Order Receipt
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Image source={orders.image} style={{ width: 50, height: 50 }} />
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {orders.item}
              </Text>
              <Text>
                {orders.quantity} x ${orders.price.toFixed(2)}
              </Text>
            </View>
            <Text style={{ flex: 1, textAlign: 'right' }}>
              ${(orders.quantity * orders.price).toFixed(2)}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
              marginTop: 20,
            }}
          />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={{ flex: 1 }}>Subtotal:</Text>
            <Text>${(orders.quantity * orders.price).toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ flex: 1 }}>Tax (8%):</Text>
            <Text>${(orders.quantity * orders.price * 0.08).toFixed(2)}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Total:</Text>
            <Text style={{ fontWeight: 'bold' }}>
              ${(orders.quantity * orders.price * 1.08).toFixed(2)}
            </Text>
          </View>
        </View>
      </ViewShot>
      <TouchableOpacity
        onPress={handleDownloadReceipt}
        style={{
          backgroundColor: colors.green,
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 16 }}>Download</Text>
      </TouchableOpacity>
    </View>
  )
}

export default GenerateImageButton

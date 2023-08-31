import React, { useState, useEffect } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native'
import colors from '../assets/colors/colors'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { selectTableNumber } from '../store/tableNumberSlice'
import { setBalance, updateBalance } from '../store/balanceReducer'
import { setOrderData } from '../store/orderReducer' // Import the action
import { MaterialIcons } from '@expo/vector-icons'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { generateUniqueId } from '../store/generateUniqueId'
import { clearCart } from '../store/cartReducer'

const Checkout = ({ navigation }) => {
  const tableNumber = useSelector(selectTableNumber)
  const [selectedMethod, setSelectedMethod] = useState(null)
  const cartItems = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()
  const auth = getAuth()
  const currentBalance = useSelector((state) => state.balance.balance)

  const uniqueId = generateUniqueId() // Generate a unique ID

  const currentTime = new Date()
  const currentHour = currentTime.getHours()
  const currentMinute = currentTime.getMinutes()

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  const tax = (subtotal * 2) / 100
  const total = subtotal + tax

  const newBalance = (currentBalance - total).toFixed(2)

  const handlePaymentMethodSelection = (method) => {
    if (selectedMethod === method) {
      setSelectedMethod(null)
    } else {
      setSelectedMethod(method)
    }
  }

  const handleOrderPress = () => {
    if (!selectedMethod) {
      Alert.alert('Choose a payment option')
      return
    }

    const newOrderData = {
      id: uniqueId,
      cartItems: cartItems,
      time: `${currentHour}:${currentMinute}`,
      paymentMethod: selectedMethod,
      total: total.toFixed(2),
      status: 'processing',
      tableNumber: tableNumber,
    }

    // Dispatch the setOrderData action to update the order data in Redux
    dispatch(setOrderData(newOrderData))
    if (selectedMethod === 'Wallet') {
      // Deduct the balance only when "Wallet" is selected
      dispatch(updateBalance(parseFloat(newBalance)))
    }
    dispatch(clearCart())

    // Navigate to the Orderpage
    navigation.navigate('Orders')
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowContainer}
        >
          <Ionicons
            size={30}
            color={colors.darkestgray}
            name={'md-arrow-back-outline'}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Checkout</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {cartItems.map((item, index) => (
          <View key={index} style={styles.productContainer}>
            <View style={styles.lhs}>
              <View style={styles.imageContainer}>
                <Image
                  style={{
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: 7,
                  }}
                  source={{ uri: item.thumbnail }}
                />
              </View>
              <View style={styles.quantityTextContainer}>
                <Text style={styles.quantityText}>x{item.quantity}</Text>
              </View>
            </View>
            <View style={styles.chs}>
              <View style={styles.productTitleContainer}>
                <Text style={styles.productTitleText}>{item.title}</Text>
              </View>
            </View>
            <View style={styles.rhs}>
              <View style={styles.priceTextContainer}>
                <Text style={styles.priceText}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        ))}
        <View style={{ height: 40 }}></View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.billingsContainer}>
          <View style={styles.subtotalContainer}>
            <View style={styles.subTotalTextContainer}>
              <Text style={styles.subTotalText}>Subtotal:</Text>
            </View>
            <View style={styles.subTotalValueContainer}>
              <Text style={styles.subTotalValue}>${subtotal.toFixed(2)}</Text>
            </View>
          </View>
          <View style={styles.taxContainer}>
            <View style={styles.taxTextContainer}>
              <Text style={styles.taxText}>Tax: </Text>
            </View>
            <View style={styles.taxValueContainer}>
              <Text style={styles.taxValue}>2%</Text>
            </View>
          </View>
          <View
            style={{
              height: 30,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={styles.dashedLine}></View>
          </View>
          <View style={styles.totalContainer}>
            <View style={styles.totalTextContainer}>
              <Text style={styles.totalText}>Total: </Text>
            </View>
            <View style={styles.totalValueContainer}>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
          <View style={{ height: 10 }}></View>
          <View style={styles.paymentMethodContainer}>
            <Text style={styles.paymentMethodText}>Payment Method</Text>
            <View style={styles.billingTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.chooseCash,
                  selectedMethod === 'Cash' && styles.selectedMethod,
                ]}
                onPress={() => handlePaymentMethodSelection('Cash')}
              >
                <FontAwesome5
                  name='money-bill-wave'
                  size={24}
                  color={
                    selectedMethod === 'Cash' ? colors.light : colors.greygreen
                  }
                />
                <Text style={{ color: colors.light, fontWeight: '600' }}>
                  Cash
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.chooseDebitCard,
                  selectedMethod === 'Debit Card' && styles.selectedMethod,
                ]}
                onPress={() => handlePaymentMethodSelection('Debit Card')}
              >
                <FontAwesome5
                  name='credit-card'
                  size={24}
                  color={
                    selectedMethod === 'Debit Card'
                      ? colors.light
                      : colors.greygreen
                  }
                />
                <Text style={{ color: colors.light, fontWeight: '600' }}>
                  Debit Card
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.wallet,
                  selectedMethod === 'Wallet' && styles.selectedMethod,
                ]}
                onPress={() => handlePaymentMethodSelection('Wallet')}
              >
                <MaterialIcons
                  name='account-balance-wallet'
                  size={24}
                  color={
                    selectedMethod === 'Wallet'
                      ? colors.light
                      : colors.greygreen
                  }
                />
                <Text style={{ color: colors.light, fontWeight: '600' }}>
                  Wallet
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={handleOrderPress}
            style={styles.checkoutButton}
          >
            <Text style={styles.checkoutButtonText}>ORDER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.harsh,
  },
  arrowContainer: {
    marginTop: 1,
  },
  headingContainer: {
    height: 80,
    width: '100%',
    padding: 20,
    marginTop: 40,
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  headerText: {
    color: colors.darkestgray,
    fontWeight: '700',
    fontSize: 30,
    marginLeft: 20,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  scrollText: {
    fontSize: 16,
    marginBottom: 10,
  },
  bottomContainer: {
    height: 350,
    backgroundColor: colors.harshgreen,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: 'center',
    paddingVertical: 20,
  },
  checkoutButton: {
    backgroundColor: colors.green,
    width: '70%',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 160,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.light,
  },
  billingsContainer: {
    width: '100%',
    height: 100,
  },
  subtotalContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    height: 30,
    alignItems: 'center',
  },
  subTotalTextContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subTotalText: {
    fontSize: 20,
    paddingLeft: 25,
    color: colors.darkestgray,
    fontWeight: '500',
  },
  subTotalValueContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  subTotalValue: {
    fontSize: 20,
    paddingRight: 25,
    color: colors.darkestgray,
    fontWeight: '900',
  },
  taxContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    height: 30,
  },
  taxText: {
    fontSize: 18,
    paddingLeft: 25,
    color: colors.greygreen,
    fontWeight: '500',
  },
  taxTextContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taxValue: {
    fontSize: 18,
    paddingRight: 25,
    color: colors.greygreen,
    fontWeight: '900',
  },
  taxValueContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  dashedLine: {
    borderBottomWidth: 2,
    borderColor: colors.greygreen,
    borderStyle: 'dashed',
    width: '90%',
  },
  totalContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    height: 30,
  },
  totalTextContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 22,
    paddingLeft: 30,
    color: colors.crimson,
    fontWeight: '500',
  },
  totalValueContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  totalValue: {
    fontSize: 23,
    paddingRight: 30,
    color: colors.crimson,
    fontWeight: '900',
  },
  billingTypeContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseCash: {
    backgroundColor: colors.lightgreygreen,
    borderRadius: 7,
    width: 80,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  chooseDebitCard: {
    backgroundColor: colors.lightgreygreen,
    borderRadius: 7,
    width: 80,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  wallet: {
    backgroundColor: colors.lightgreygreen,
    borderRadius: 7,
    width: 80,
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  paymentMethodContainer: {
    height: 30,
    width: '100%',
  },
  paymentMethodText: {
    color: colors.darkestgray,
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: 1,
    textDecorationLine: 'underline',
  },
  selectedMethod: {
    backgroundColor: colors.greygreen,
    borderColor: colors.darkestgray,
    borderWidth: 2,
  },
  productContainer: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    marginTop: 10,
  },
  lhs: {
    height: '100%',
    width: '100%',
    flex: 2,
    flexDirection: 'row',
  },
  imageContainer: {
    height: '100%',
    width: '60%',
    borderRadius: 10,
    borderWidth: 1,
  },
  quantityTextContainer: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.dark,
  },
  chs: { flex: 2, height: '100%', width: '100%' },
  productTitleContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitleText: {
    fontSize: 21,
    fontWeight: '600',
    color: colors.darkestgray,
  },
  rhs: { flex: 1.5, height: '100%', width: '100%' },
  priceTextContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.crimson,
  },
})

export default Checkout

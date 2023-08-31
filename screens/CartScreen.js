import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native'
import React, { useEffect } from 'react'
import colors from '../assets/colors/colors'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from '../store/cartReducer'

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cart)

  useEffect(() => {
    // Fetch cart items here, if needed
  }, [])

  const onRefresh = () => {
    // You can dispatch actions or perform any other necessary action when refreshing
  }

  const plusPress = (item) => {
    dispatch(incrementQuantity({ id: item.id }))
  }

  const minusPress = (item) => {
    dispatch(decrementQuantity({ id: item.id }))
  }

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart({ id: itemId }))
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.allOrdersContainer}>
        <TouchableOpacity style={styles.orderContainer}>
          <View style={styles.orderleftInfo}>
            <View style={styles.imageContainer}>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  overflow: 'hidden',
                  borderRadius: 7,
                }}
                source={{ uri: item.thumbnail }}
              />
            </View>
          </View>
          <View style={styles.ordercenterInfo}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemPrice}>Price: ${item.price}</Text>

            <View style={styles.countingContainer}>
              <TouchableOpacity onPress={() => minusPress(item)}>
                <Text style={styles.minus}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => plusPress(item)}>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={styles.orderrightInfo}
            onPress={() => handleRemoveItem(item.id)}
          >
            <MaterialCommunityIcons
              style={styles.categoryIcon}
              name='delete'
              size={27}
              color={colors.green}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrowContainer}
        >
          <Ionicons
            size={30}
            color={colors.light}
            name={'md-arrow-back-outline'}
          />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Cart</Text>
        </View>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id.toString() || index.toString()}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRefresh} />
        }
        style={styles.cartList} // Style for the list container
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Checkout')}
        style={styles.checkoutButton}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    backgroundColor: colors.green,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    paddingHorizontal: 10,
    marginTop: 40,
    marginLeft: 10,
  },
  headerText: {
    fontSize: 27,
    fontWeight: '600',
    color: colors.light,
    paddingHorizontal: 10,
    marginTop: 40,
    marginLeft: 10,
    letterSpacing: 1,
  },
  cartList: {
    flex: 1, // Take up the remaining space
  },
  cartItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  checkoutButton: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.light,
  },
  allOrdersContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  orderContainer: {
    height: 120,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    // backgroundColor: 'red',
    flexDirection: 'row',
    borderBottomColor: colors.transgreen,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 2,
    width: 360,
  },
  orderleftInfo: {},
  imageContainer: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderColor: colors.transgreen,
    borderRadius: 10,
  },
  ordercenterInfo: {
    // backgroundColor: 'red',
    height: '100%',
    width: 130,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkestgray,
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.crimson,
    marginTop: 4,
    fontWeight: '900',
    // textAlign: 'center',
  },
  quantityText: {},
  orderrightInfo: {},
  countingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginTop: 10,
  },
  minus: {
    height: 30,
    marginTop: 10,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.light,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 21,
    backgroundColor: colors.crimson,
    borderRadius: 7,
    marginRight: 10,
  },
  quantityText: {
    fontWeight: '700',
    fontSize: 22,
    height: 30,
    width: 30,
    backgroundColor: colors.harsh,
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10,
  },
  plus: {
    height: 30,
    width: 30,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 21,
    backgroundColor: colors.crimson,
    borderRadius: 7,
    color: colors.light,
    marginLeft: 10,
  },
})

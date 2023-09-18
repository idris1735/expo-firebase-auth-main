import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  RefreshControl,
  Button,
} from 'react-native'
import { useSelector } from 'react-redux'
import {
  getFirestore,
  doc,
  getDocs,
  collection,
  query,
  orderBy,
} from 'firebase/firestore'
import colors from '../assets/colors/colors'
import { selectTableNumber } from '../store/tableNumberSlice'
import { auth } from '../config/firebase'
import { useDispatch } from 'react-redux'
import { fetchSalesData } from '../store/salesDataActions'
import { selectSalesData } from '../store/salesDataReducer'

const OrderBox = () => {
  const tableNumber = useSelector(selectTableNumber)
  const dispatch = useDispatch()
  const salesData = useSelector(selectSalesData)

  const logSales = () => {
    console.log(salesData)
  }

  if (!salesData || salesData.length === 0) {
    // Handle the case where salesData is not yet defined or empty
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text>No Sales Data Found</Text>
        <View>
          <Button onPress={logSales} title={'log the sales data'} />
        </View>
      </ScrollView>
    )
  }
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={{ height: 20 }}></View>

      {salesData
        .slice()
        .reverse()
        .map((order, index) => (
          <View style={styles.orderBoxContainer} key={index}>
            <View style={styles.viewOne}>
              <View style={styles.lhs}>
                <Text style={{ fontSize: 19, fontWeight: '600' }}>Table</Text>
                <Text
                  style={{
                    fontSize: 25,
                    color: colors.green,
                    fontWeight: '700',
                  }}
                >
                  {tableNumber}
                </Text>
              </View>
              <View style={styles.rhs}>
                <Text
                  style={{
                    color: colors.dark,
                    fontSize: 18,
                    fontWeight: '600',
                    marginBottom: 5,
                  }}
                >
                  id: {order.id}
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.secondary,
                    fontWeight: '800',
                  }}
                >
                  {order.status}
                </Text>
              </View>
            </View>
            <View style={styles.viewTwo}>
              <Text
                style={{ fontSize: 18, color: colors.dark, fontWeight: '600' }}
              >
                Menu
              </Text>
              <View style={{ height: 5 }}></View>
              <FlatList
                horizontal
                data={order.cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.imageItem}>
                    <Image
                      source={{ uri: item.thumbnail }}
                      style={styles.image}
                    />
                    <View style={styles.quantityBox}>
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                    </View>
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <View style={styles.viewThree}>
              <View style={styles.lhs}>
                <Text
                  style={{
                    color: colors.greygreen,
                    fontSize: 18,
                    fontWeight: '700',
                  }}
                >
                  {order.time}
                </Text>
              </View>
              <View style={styles.chs}>
                <Text
                  style={{
                    color: colors.greygreen,
                    fontSize: 18,
                    fontWeight: '700',
                  }}
                >
                  payment: {order.paymentMethod}
                </Text>
              </View>
              <View style={styles.rhs}>
                <Text
                  style={{
                    color: colors.crimson,
                    fontSize: 21,
                    fontWeight: '700',
                  }}
                >
                  ${order.total}
                </Text>
              </View>
            </View>
          </View>
        ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  orderBoxContainer: {
    width: '90%',
    height: 250,
    borderRadius: 10,
    elevation: 15,
    shadowColor: colors.green,
    paddingVertical: 45,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.transgreen,
  },
  viewOne: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginTop: -25,
  },
  lhs: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rhs: {
    flex: 1,
    alignItems: 'flex-end',
  },
  chs: {
    flex: 1,
    alignItems: 'center',
  },
  // Add styles for your image items here
  imageItem: {
    marginRight: 10,
    position: 'relative',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.transgreen,
  },
  // Quantity box styles
  quantityBox: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.green,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  viewTwo: {
    width: '100%',
    marginTop: 15,
  },
  viewThree: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
})

export default OrderBox

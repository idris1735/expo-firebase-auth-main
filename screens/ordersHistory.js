import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'

const OrdersHistory = () => {
  return (
    <View>
      <TouchableOpacity style={styles.barContainer}>
        <MaterialIcons
          style={styles.infoIcon}
          name='receipt-long'
          size={24}
          color={colors.green}
        />
        <Text style={styles.barText}>Order History</Text>
        <MaterialCommunityIcons
          style={{ marginLeft: 145 }}
          name='greater-than'
          size={18}
          color='#3b3b3b'
        />
      </TouchableOpacity>
    </View>
  )
}

export default OrdersHistory

const styles = StyleSheet.create({
  barContainer: {
    height: 50,
    width: 340,
    marginTop: 15,
    elevation: 5,
    borderRadius: 4,
    backgroundColor: colors.light,
    alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
  },
  barText: {
    color: '#3b3b3b',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
  },
  infoIcon: {
    marginLeft: 10,
  },
})

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import Products from '../components/products'
import colors from '../assets/colors/colors'
import { Ionicons } from '@expo/vector-icons'

const Katalog = ({ navigation }) => {
  return (
    <View style={styles.body}>
      <View style={styles.titleContainer}>
        <View style={styles.titleBody}>
          <Text style={styles.titleText}>All Products</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('CartScreen')}
          style={styles.cartIconContainer}
        >
          <Ionicons
            style={styles.cartIcon}
            name='cart'
            size={30}
            color={colors.light}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ height: 30 }}></View>
          <Products />
        </View>
      </ScrollView>
    </View>
  )
}

export default Katalog

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  titleContainer: {
    height: 90,
    width: '100%',
    backgroundColor: colors.green,
    flexDirection: 'row',
  },

  cartIconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  cartIcon: {
    marginRight: 25,
    marginBottom: 5,
    backgroundColor: colors.crimson,
    borderRadius: 10,
    padding: 5,
  },
  titleBody: {
    // height: 80,
    // width: 100,
    marginLeft: 10,
    flex: 1,
    // backgroundColor: 'red',
  },
  titleText: {
    fontSize: 24,
    color: 'white',
    elevation: 2,
    marginTop: 50,
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  container: {
    // marginTop: 10,
    // backgroundColor: 'crimson',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-evenly',
    // flexWrap: 'wrap',
  },
})

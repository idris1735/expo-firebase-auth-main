import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import ProductBox from '../components/productBox'
import colors from '../assets/colors/colors'

const ElectronicsVariety = () => {
  return (
    <View style={styles.body}>
      <View style={styles.titleContainer}>
        <View style={styles.titleBody}>
          <Text style={styles.titleText}>Electronics</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <ProductBox />
          <View style={{ height: 30 }}></View>
        </View>
      </ScrollView>
    </View>
  )
}

export default ElectronicsVariety

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  titleContainer: {
    height: 90,
    width: '100%',
    backgroundColor: colors.green,
  },
  titleBody: {
    // height: 80,
    // width: 100,
  },
  titleText: {
    fontSize: 24,
    color: 'white',
    elevation: 2,
    marginTop: 55,
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

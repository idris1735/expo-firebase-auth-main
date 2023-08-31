import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const electronicsUrl =
  'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'
const oraimoUrl = 'https://www.oraimo.com/upload/web3_167576098030.jpg'

const boxes = [
  {
    id: '1',
    image: require('../assets/buypizza.jpg'),
    text: 'Buy Pizza',
    screenName: 'Buypizza',
  },
  {
    id: '2',
    image: { uri: electronicsUrl },
    text: 'Electronics',
    screenName: 'ElectronicsVariety',
  },
  {
    id: '3',
    image: { uri: oraimoUrl },
    text: 'Oraimo',
    screenName: 'OraimoVariety',
  },
  {
    id: '4',
    image: require('../assets/dominos.jpg'),
    text: 'Dominos',
    screenName: 'Buypizza',
  },
  {
    id: '5',
    image: require('../assets/burgerking.jpg'),
    text: 'Burger King',
    screenName: 'Buypizza',
  },

  {
    id: '6',
    image: require('../assets/coldstone.jpg'),
    text: 'Coldstone Icecream',
  },
  {
    id: '7',
    image: require('../assets/kfc-banner.jpg'),
    text: 'KFC Chicken',
  },
]
const Box = ({ id, image, text, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.box}>
        <ImageBackground source={image} resizeMode='cover' style={styles.image}>
          <Text style={styles.text}>{text}</Text>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}
const VarietyList = () => {
  const navigation = useNavigation()

  // const navigateToScreen = (screenName) => {
  //   navigation.navigate(screenName)
  // }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {boxes.map((box) => (
        <Box
          key={box.id}
          id={box.id}
          image={box.image}
          text={box.text}
          onPress={() => navigation.navigate(box.screenName)}
        />
      ))}
    </ScrollView>
  )
}

export default VarietyList

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  box: {
    width: 320,
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    marginLeft: 8,
    fontWeight: '600',
    marginTop: 80,
    // textAlign: 'center',
  },
})

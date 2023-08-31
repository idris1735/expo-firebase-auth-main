import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from 'react-native'
import React from 'react'
import Svgs from './svgs'
import SvgUri from 'react-native-svg'
import colors from '../assets/colors/colors'
import AddCash from '../assets/svgs/addcash.svg'
import Airtime from '../assets/svgs/buy-airtime.svg'
import BuyData from '../assets/svgs/buy-data.svg'
import Paybills from '../assets/svgs/pay-bills.svg'
import GetLunch from '../assets/svgs/getfood.svg'
import GetGroceries from '../assets/svgs/getGroceries.svg'

const boxFunctions = [
  {
    id: 1,
    title: 'Add Cash',
    route: 'Screen1',
    color: '#0891b2',
    svg: <AddCash />,
  },
  {
    id: 2,
    title: 'Buy Airtime',
    route: 'Screen2',
    color: '#e11d48',
    svg: <Airtime />,
  },
  {
    id: 3,
    title: 'Buy Data',
    route: 'Screen3',
    color: '#16a34a',
    svg: <BuyData />,
  },
  {
    id: 4,
    title: 'Pay Bills',
    route: 'Screen4',
    color: '#002851',
    svg: <Paybills />,
  },
  {
    id: 5,
    title: 'Get Lunch',
    route: 'Screen5',
    color: '#115e59',
    svg: <GetLunch />,
  },
  {
    id: 6,
    title: 'Get Groceries',
    route: 'Screen6',
    color: '#ca8a04',
    svg: <GetGroceries />,
  },
]

const HomeOptions = ({ navigation }) => {
  const handleBoxPress = (route) => {
    navigation.navigate(route)
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {boxFunctions.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.boxBanner, { backgroundColor: item.color }]}
            onPress={() => handleBoxPress(item.route)}
          >
            <View style={styles.svgImage}>{item.svg}</View>

            <View>
              <Text style={styles.boxText}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

export default HomeOptions

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: '100%',
    marginTop: 20,
  },
  boxBanner: {
    height: 80,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 13,
    elevation: 5,
  },
  boxText: {
    color: colors.dark,
    marginTop: 15,
    fontWeight: '500',
    fontSize: 16,
  },
  svgImage: {
    marginTop: 35,
  },
})

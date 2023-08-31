import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  Entypo,
} from '@expo/vector-icons'
import FetchData from '../components/fetchData'
import LogoutButton from '../components/logoutButton'
import ProfileInfo from '../components/profileInfo'
import OrdersHistory from './ordersHistory'
import { getAuth } from 'firebase/auth'

const auth = getAuth()
const SettingsInfo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.upperMargin}></View>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerText}>User Information</Text>
        </View>
        <View style={styles.upperMarginTwo}></View>

        <ProfileInfo></ProfileInfo>

        {/* <Button title='log console auth' onPress={() => console.log(auth)} /> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Profilescreen')}
          style={styles.barContainer}
        >
          <Ionicons
            style={styles.infoIcon}
            name='person'
            size={24}
            color={colors.green}
          />
          <Text style={styles.barText}>Change Password</Text>
          <MaterialCommunityIcons
            style={{ marginLeft: 200 }}
            name='greater-than'
            size={18}
            color='#3b3b3b'
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.barContainer}>
          <FontAwesome
            style={styles.infoIcon}
            name='cc-mastercard'
            size={24}
            color={colors.green}
          />
          <Text style={styles.barText}>Payments</Text>
          <MaterialCommunityIcons
            style={{ marginLeft: 165 }}
            name='greater-than'
            size={18}
            color='#3b3b3b'
          />
        </TouchableOpacity>

        <OrdersHistory />

        <TouchableOpacity style={styles.barContainer}>
          <MaterialCommunityIcons
            style={styles.infoIcon}
            name='ticket-percent'
            size={24}
            color={colors.green}
          />
          <Text style={styles.barText}>Promo Codes</Text>
          <MaterialCommunityIcons
            style={{ marginLeft: 145 }}
            name='greater-than'
            size={18}
            color='#3b3b3b'
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.barContainer}>
          <MaterialIcons
            style={styles.infoIcon}
            name='design-services'
            size={24}
            color={colors.green}
          />
          <Text style={styles.barText}>Terms of Service</Text>
          <MaterialCommunityIcons
            style={{ marginLeft: 120 }}
            name='greater-than'
            size={18}
            color='#3b3b3b'
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.barContainer}>
          <MaterialIcons
            style={styles.infoIcon}
            name='contact-support'
            size={24}
            color={colors.green}
          />
          <Text style={styles.barText}>Customer Support</Text>
          <MaterialCommunityIcons
            style={{ marginLeft: 110 }}
            name='greater-than'
            size={18}
            color='#3b3b3b'
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.barContainer}>
          <MaterialIcons
            style={styles.infoIcon}
            name='privacy-tip'
            size={24}
            color={colors.green}
          />
          <Text style={styles.barText}>Privacy Policy</Text>
          <MaterialCommunityIcons
            style={{ marginLeft: 140 }}
            name='greater-than'
            size={18}
            color='#3b3b3b'
          />
        </TouchableOpacity>

        <LogoutButton />

        <FetchData />
        <View style={styles.bottomMargin}></View>
      </ScrollView>
    </View>
  )
}

export default SettingsInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  upperMargin: {
    marginTop: 50,
  },
  upperMarginTwo: {
    marginTop: 10,
  },
  headerTitleContainer: {
    width: '100%',
    marginLeft: 0,
    padding: 10,
    marginTop: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 33,
    fontWeight: '700',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
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
  bottomMargin: {
    marginBottom: 20,
  },
  // greaterThanIcon: {
  //   marginLeft: 200,
  //   fontWeight: '900',
  // },
})

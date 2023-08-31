import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../assets/colors/colors'
import OrderBox from '../components/orderBox'
import { getAuth } from 'firebase/auth'
import { useAuthentication } from '../utils/hooks/useAuthentication'
import auth from '../config/firebase'

const Orderpage = ({ navigation }) => {
  const { user } = useAuthentication()

  const pressMe = () => {
    console.log('this is the user: ' + user)
    console.log('this is the auth output: ' + auth.currentUser.uid)
  }

  return (
    <View style={styles.container}>
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.lessthanButton}>
            <MaterialCommunityIcons
              style={styles.categoryIcon}
              name='less-than'
              size={18}
              color='black'
            />
          </View>
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>My Orders</Text>
        </View>
        <TouchableOpacity onPress={pressMe}>
          <View style={styles.starButton}>
            <MaterialCommunityIcons
              style={styles.categoryIcon}
              name='refresh'
              size={18}
              color='white'
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <OrderBox />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topButtonsContainer: {
    marginTop: 80,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.green,
    paddingBottom: 10,
  },
  lessthanButton: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 8,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.dark,
  },
  starButton: {
    height: 40,
    borderRadius: 8,
    width: 40,
    backgroundColor: colors.green,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Orderpage

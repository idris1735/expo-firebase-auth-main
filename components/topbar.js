import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import colors from '../assets/colors/colors'
import { useAuthentication } from '../utils/hooks/useAuthentication'
import { getAuth, signOut } from 'firebase/auth'
import { Ionicons } from '@expo/vector-icons'
import { SvgUri } from 'react-native-svg'
import HelpSVG from '../assets/svgs/help.svg'
import UserName from '../data/userName'
import { connect } from 'react-redux' // Import connect from react-redux
import { auth } from '../config/firebase'
// import { setBalance } from '../store/balanceReducer'
// Import the action to set the balance
import { selectTableNumber } from '../store/tableNumberSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
// import { selectBalance } from '../store/balanceReducer'
const Topbar = (props) => {
  // Use the selectBalance selector to get the balance from Redux
  // const balance = useSelector(selectBalance)
  const user = useSelector((state) => state.user)

  const [loading, setLoading] = useState(true) // Track loading state

  // useEffect(() => {
  //   // Check if the balance has been loaded (assuming a value of 0 means it's not loaded)
  //   if (balance !== 0) {
  //     setLoading(false) // Set loading to false when balance is available
  //   }
  // }, [balance])

  // const logBalance = async () => {
  //   console.log('====================================')
  //   console.log('hello, logBalance is pressed')
  //   console.log('====================================')
  // }
  const logName = () => {
    console.log(user)
  }

  return (
    <View style={styles.topbar}>
      <View style={styles.container}>
        {/* PROFILE BUTTON */}
        <TouchableOpacity
          onPress={logName}
          style={styles.profileButtonContainer}
        >
          <Image
            style={styles.profileImg}
            source={require('../assets/profile.png')}
          />
          <Text style={{ textAlign: 'center' }}>Name </Text>
        </TouchableOpacity>
        {/* BALANCE */}
        {/* <TouchableOpacity onPress={logBalance} style={styles.balanceButton}>
          <View style={styles.balcontainer}>
            <Text style={styles.balText}>
              ${loading ? 'Loading...' : balance}
            </Text>
            <Ionicons
              style={styles.balInfo}
              size={21}
              color={colors.green}
              name={'arrow-down'}
            />
          </View>
          <Text style={styles.BalanceText}>Balance</Text>
        </TouchableOpacity> */}
        {/* HELP BUTTON */}
        <TouchableOpacity style={styles.helpButton}>
          <HelpSVG width={40} height={40} />
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     balance: state.balance.balance, // Access the balance property from the balance reducer
//   }
// }

export default Topbar // Connect the component to Redux

const styles = StyleSheet.create({
  topbar: {
    // marginTop: 50,
    height: 132,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderBottomColor: colors.green,
  },
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  profileButtonContainer: {
    height: '100%',
    width: 55,
    marginLeft: 8,

    // flex: 1,
  },
  profileImg: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
    borderColor: colors.transgreen,
    borderWidth: 2,
  },
  // userTextContainer: {
  //   height: 100,
  //   width: 200,
  //   // backgroundColor: colors.crimson,
  //   marginTop: 8,
  // },
  // userText: {
  //   marginTop: 8,
  //   fontSize: 26,
  //   fontWeight: '700',
  // },
  balanceButton: {
    // flex: 1,
  },
  balcontainer: {
    flexDirection: 'row',
  },
  balText: {
    fontSize: 19,
    fontWeight: '700',
  },
  balInfo: {
    marginLeft: 5,
  },
  BalanceText: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
  },
  helpButton: {
    // flex: 1,
    height: 60,
    width: 60,
    marginTop: 5,
  },
  helpText: {
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
    color: colors.green,
  },
})

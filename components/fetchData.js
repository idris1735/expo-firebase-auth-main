import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import React from 'react'
import colors from '../assets/colors/colors'
import axios from 'axios'
import Modal from 'react-native-modal'

const FetchData = () => {
  const [showModal, setShowModal] = useState(false)

  const handleFetch = () => {
    setShowModal(true)
    const apiUrl = 'https://retailer.rnd.riskgratis.com/api/auth/token'

    const credentials = {
      login: 'admin',
      password: 'P@55Word',
      db: 'retailer.rnd.riskgratis.com',
    }

    axios
      .post(apiUrl, credentials)
      .then((response) => {
        const { data } = response
        console.log(data.token)
        // Do something with the token, such as save it to the app's state or to AsyncStorage
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return (
    <View>
      <TouchableOpacity onPress={handleFetch} style={styles.barContainer}>
        <Text style={styles.barText}>Fetch Data</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType='slide'>
        <View style={styles.modalbox}></View>
      </Modal>
    </View>
  )
}

export default FetchData

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
})

// =========================================================

// import React, { useState } from 'react'
// import { StyleSheet, View, Text, Button } from 'react-native'
// import Odoo from 'react-native-odoo'

// const FetchData = () => {
//   const [connected, setConnected] = useState(false)
//   const [token, setToken] = useState('')

//   const connectToOdoo = async () => {
//     try {
//       const odoo = new Odoo({
//         host: 'localhost',
//         port: 8069,
//         database: 'odoo',
//         username: 'admin',
//         password: 'admin',
//         token: token,
//       })
//       await odoo.connect()
//       setConnected(true)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const getOdooToken = async () => {
//     try {
//       const response = await fetch(
//         'https://retailer.rnd.riskgratis.com/api/auth/token?login=admin&password=P%4055Word&db=retailer.rnd.riskgratis.com'
//       )
//       const data = await response.json()
//       setToken(data.token)
//       console.log(JSON.str)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text>React Native Expo + Odoo</Text>
//       <Button title='Get Odoo Token' onPress={getOdooToken} />
//       <Button title='Connect to Odoo' onPress={connectToOdoo} />
//       {connected ? (
//         <Text>Connected to Odoo!</Text>
//       ) : (
//         <Text>Not connected to Odoo.</Text>
//       )}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })

// export default FetchData

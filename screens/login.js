import React, { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import axios from 'axios'
import colors from '../assets/colors/colors'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/actions'
// import auth from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { setUser } from '../store/userReducer'
import { getDatabase, ref, get, child } from 'firebase/database'

export default function Login({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // Dispatch the setUser action to update Redux state
  const dispatch = useDispatch()

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      )
      const user = userCredential.user

      // Fetch user data from Realtime Database
      const database = getDatabase()
      const userDataRef = ref(database, `users/${user.uid}`)
      const userDataSnapshot = await get(child(userDataRef, 'salesData')) // Adjust the path accordingly

      if (userDataSnapshot.exists()) {
        const docData = userDataSnapshot.val() // Get the user data

        dispatch(setUser(docData))

        // User has successfully signed in.
        console.log('User signed in:', user)
        // Add your navigation logic here.
        navigation.navigate('Splash')
      } else {
        console.error('User data not found.')
        Alert.alert('Login Error', 'User data not found') // Display an alert
      }
    } catch (error) {
      console.error('Error signing in:', error)
      Alert.alert('Login Error', 'Invalid username or password') // Display an alert
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sales Login</Text>
      <TextInput
        style={styles.input}
        placeholder='Username'
        onChangeText={setUsername}
        value={username}
        autoCapitalize={'none'}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        onChangeText={setPassword}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: colors.green,
    width: '80%',
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

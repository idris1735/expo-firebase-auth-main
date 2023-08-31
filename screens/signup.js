import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {
  doc,
  getFirestore,
  setDoc,
  collection,
  addDoc,
} from 'firebase/firestore'
import { auth } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setBalance } from '../store/balanceReducer'
import colors from '../assets/colors/colors'
import Checkbox from 'expo-checkbox'
import { ActivityIndicator } from 'react-native-paper'

const fireStore = getFirestore() // Initialize Firestore outside of the component

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [termsChecked, setTermsChecked] = useState(false)

  const handleSignUp = async () => {
    if (firstName && lastName && email && phone && password && termsChecked) {
      setIsLoading(true)

      try {
        console.log('Starting signup process...')

        // Step 1: Create Firebase Authentication User
        console.log('Step 1: Creating Firebase Authentication User...')
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        console.log('Step 1: Firebase Authentication User Created.')

        const user = userCredential.user
        const uid = user.uid

        // Step 2: Create User Document in Firestore
        console.log('Step 2: Creating User Document in Firestore...')
        const userDocRef = doc(fireStore, 'users', uid)
        await setDoc(userDocRef, {
          firstName,
          lastName,
          email,
          password,
          phone,
        })
        console.log('Step 2: User Document Created in Firestore.')

        // Done: Navigation
        console.log('Signup process completed successfully.')
        navigation.navigate('Splash')
      } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message
        console.error('Error during signup process:', errorMessage)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder='First Name'
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Last Name'
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        keyboardType='number-pad'
        style={styles.input}
        placeholder='Phone Number'
        value={phone}
        onChangeText={(text) => setPhone(text)}
      />

      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={termsChecked}
          onValueChange={(value) => setTermsChecked(value)}
          color={termsChecked ? colors.green : undefined}
        />
        <Text style={styles.label}>I accept the terms and conditions</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        {isLoading ? (
          <ActivityIndicator size='small' color='#FFFFFF' />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    width: '80%',
    height: 50,
    backgroundColor: colors.green,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    color: colors.green,
    marginTop: 20,
  },
  checkboxContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 8,
  },
})

export default SignUp

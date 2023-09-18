import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set, push } from 'firebase/database'
import { auth, database } from '../config/firebase'
import { useDispatch } from 'react-redux'
import colors from '../assets/colors/colors'
import Checkbox from 'expo-checkbox'
import { ActivityIndicator } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'
import { setSalesData, setUser } from '../store/userReducer'

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [termsChecked, setTermsChecked] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSignUp = async () => {
    try {
      if (firstName && lastName && email && phone && password && termsChecked) {
        setIsLoading(true)
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

        // Step 2: Create User Data in Realtime Database
        console.log('Step 2: Creating User Data in Realtime Database...')
        const userDataRef = ref(database, `users/${uid}/userData`)
        const docData = {
          firstName,
          lastName,
          email,
          phone,
          role: 'seller', // Assuming all sign-ups are sellers initially
        }

        await set(userDataRef, docData)
        console.log('Step 2: User Data Created in Realtime Database.')

        // Step 3: Add a new sale under salesData with a unique key (e.g., sale1, sale2, ...)
        console.log('Step 3: Adding Sales Data as a subcollection...')
        const salesDataRef = ref(database, `users/${uid}/salesData`)
        const newSaleRef = push(salesDataRef) // Generates a unique key for the new sale
        const newSaleKey = newSaleRef.key

        const salesData = {
          cartItems: [],
          time: '',
          paymentMethod: '',
          total: 0,
          status: 'processing',
          tableNumber: '',
          saleID: '',
          orderID: '',
        }

        const specificSaleRef = ref(
          database,
          `users/${uid}/salesData/${newSaleKey}`
        )
        await set(specificSaleRef, salesData)
        console.log('Sales Data added as a subcollection.')

        dispatch(setUser(docData))
        dispatch(setSalesData(salesData))
        console.log('Document Data dispatched to redux.')
        console.log('Signup process completed successfully.')
        navigation.navigate('Splash')
      } else {
        // Handle missing fields or unchecked terms
        Alert.alert(
          'Please fill in all the required fields and accept the terms and conditions.'
        )
      }
    } catch (error) {
      const errorCode = error.code
      const errorMessage = error.message
      console.error('Error during signup process:', errorMessage)

      // Handle specific error codes or display a general error message to the user
      if (errorCode === 'auth/email-already-in-use') {
        Alert.alert('Email is already in use. Please use a different email.')
      } else {
        Alert.alert('Error during signup process. Please try again later.')
      }
    } finally {
      setIsLoading(false)
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
      <View style={{ width: '80%' }}>
        <TextInput
          secureTextEntry={!showPassword}
          style={{
            width: '100%',
            height: 50,
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 5,
            paddingLeft: 10,
            marginBottom: 10,
          }}
          placeholder='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={togglePasswordVisibility}
        >
          <FontAwesome5
            name={showPassword ? 'eye' : 'eye-slash'}
            size={20}
            color={showPassword ? 'black' : 'gray'}
          />
        </TouchableOpacity>
      </View>

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
  eyeIcon: {
    position: 'absolute',
    top: 12, // Adjust the position as needed
    right: 10, // Adjust the position as needed
  },
})

export default SignUp

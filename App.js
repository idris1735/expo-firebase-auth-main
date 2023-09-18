import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import './config/firebase'
import SignUp from './screens/signup'
import Login from './screens/login'

import Details from './components/details'
import 'react-native-gesture-handler'
import TabNavigator from './navigation/TabNavigator'
import WelcomeScreen from './screens/WelcomeScreen'
import Homescreen from './screens/homescreen'
import Buypizza from './screens/Buypizza'
import PrintButton from './components/printButton'
import PdfButton from './components/pdfButton'
import GenerateImageButton from './components/generateImageButton'
import DownloadReceiptImage from './components/downloadReceiptImage'
import Profilescreen from './screens/Profilescreen'
import Orderpage from './screens/orderpage'
import ElectronicsVariety from './screens/ElectronicsVariety'
import OraimoVariety from './screens/oraimoVariety'
import CartScreen from './screens/CartScreen'
import ProductBox from './components/productBox'
import Splash from './screens/Splash'
import { Provider } from 'react-redux'
import store from './store/store'
import Checkout from './screens/Checkout'
// import 'expo-firestore-offline-persistence'
import UserRoleScreen from './screens/userRoleScreen'

//      ADMIN ==================
import AdminLogin from './ADMIN/authenticaton/adminLogin'
import AdminSignup from './ADMIN/authenticaton/adminSignup'
import AdminWelcomeScreen from './ADMIN/screens/adminWelcomeScreen'

const Stack = createStackNavigator()

const App = () => {
  // if (!global.tableNumber) {
  //   return <Splash />
  // }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='UserRoleScreen' component={UserRoleScreen} />

          <Stack.Screen
            name='AdminWelcomeScreen'
            component={AdminWelcomeScreen}
          />

          <Stack.Screen name='AdminLogin' component={AdminLogin} />
          <Stack.Screen name='AdminSignup' component={AdminSignup} />
          <Stack.Screen name='Welcome' component={WelcomeScreen} />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Splash' component={Splash} />
          <Stack.Screen name='Homescreen' component={TabNavigator} />
          <Stack.Screen name='Buypizza' component={Buypizza} />
          <Stack.Screen name='Details' component={Details} />
          <Stack.Screen
            name='ElectronicsVariety'
            component={ElectronicsVariety}
          />
          <Stack.Screen name='OraimoVariety' component={OraimoVariety} />
          <Stack.Screen name='PrintButton' component={PrintButton} />
          <Stack.Screen
            name='GenerateImageButton'
            component={GenerateImageButton}
          />
          <Stack.Screen name='PdfButton' component={PdfButton} />
          <Stack.Screen
            name='DownloadReceiptImage'
            component={DownloadReceiptImage}
          />
          <Stack.Screen name='Profilescreen' component={Profilescreen} />
          <Stack.Screen name='Orderpage' component={Orderpage} />
          <Stack.Screen name='CartScreen' component={CartScreen} />
          <Stack.Screen name='ProductBox' component={ProductBox} />
          <Stack.Screen name='Checkout' component={Checkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})

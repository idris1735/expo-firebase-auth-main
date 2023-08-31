import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Badge } from 'react-native-elements'
import Homescreen from '../screens/homescreen'
import Search from '../screens/katalog'
import Orderpage from '../screens/orderpage'
import SettingsInfo from '../screens/settinginfo'
import { Ionicons } from '@expo/vector-icons'
import colors from '../assets/colors/colors'
import { cartCounts } from '../components/cartCounts'
import { useNavigation } from '@react-navigation/native'
import katalog from '../screens/katalog'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          let coloring

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
            coloring = focused ? colors.green : colors.dark
          } else if (route.name === 'Katalog') {
            iconName = focused ? 'md-list' : 'md-list-outline'
            coloring = focused ? colors.green : colors.dark
          } else if (route.name === 'Orders') {
            iconName = focused ? 'md-receipt' : 'md-receipt-outline'
            coloring = focused ? colors.green : colors.dark
            return (
              <View style={{ position: 'relative' }}>
                <Ionicons name={iconName} size={30} color={colors.green} />
                {cartCounts > 0 && (
                  <Badge
                    status='success'
                    value={cartCounts}
                    containerStyle={{
                      position: 'absolute',
                      top: -6,
                      right: -14,
                    }}
                  />
                )}
              </View>
            )
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline'
            coloring = focused ? colors.green : colors.dark
          }

          // You can also use other icon libraries like MaterialCommunityIcons
          return <Ionicons name={iconName} size={30} color={colors.green} />
        },

        tabBarActiveTintColor: '#01CD74',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
        headerShown: false,
        tabBarLabel: () => {
          return null
        },
      })}
    >
      <Tab.Screen name='Home' component={Homescreen} />
      <Tab.Screen name='Katalog' component={katalog} />
      <Tab.Screen name='Orders' component={Orderpage} />
      <Tab.Screen name='Settings' component={SettingsInfo} />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({})

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native'
import React from 'react'
import colors from '../assets/colors/colors'
import { auth } from '../config/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'

const ProfileInfo = () => {
  const [userData, setUserData] = useState(null) // State to store user data
  const [isLoading, setIsLoading] = useState(true) // State to manage loading indicator

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser
        if (!user) {
          console.log('User not logged in.')
          setIsLoading(false) // Set loading to false
          return
        }

        const uid = user.uid
        const userDocRef = doc(db, 'users', uid)
        const userDocSnapshot = await getDoc(userDocRef)

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data()
          setUserData(userData) // Set user data
        } else {
          console.log('User document not found in Firestore.')
        }

        setIsLoading(false) // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error)
        setIsLoading(false) // Set loading to false in case of an error
      }
    }

    // Call the fetchUserData function when the component mounts
    fetchUserData()
  }, [])

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        width: '100%',
      }}
    >
      <View style={styles.container}>
        {/* profile image */}
        <View style={styles.profileContainer}>
          <TouchableOpacity style={styles.profileImageContainer}>
            <View>
              <Image
                style={[styles.profileImage, { width: 70, height: 70 }]}
                source={require('../assets/profile.png')}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* profile info */}

        <View style={styles.infosContainer}>
          {isLoading ? (
            // Display loading indicator while fetching data
            <ActivityIndicator size='large' color={colors.green} />
          ) : userData ? (
            // Display user data if available
            <>
              <TouchableOpacity>
                <View style={styles.displayNameContainer}>
                  <Button title='Log' onPress={logMe} />
                  <Text style={styles.displayTitle}>FULL NAME: </Text>
                  <Text style={styles.displayName}>
                    {userData.firstName} {userData.lastName}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.userNameContainer}>
                  <Text style={styles.displayTitle}>USERNAME: </Text>
                  <Text style={styles.userNameText}>{userData.email}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.mobileContainer}>
                  <Text style={styles.displayTitle}>MOBILE: </Text>
                  <Text style={styles.mobileText}>{userData.phone}</Text>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            // Display a message if no data is available
            <Text>No user data found.</Text>
          )}
        </View>
      </View>
    </View>
  )
}

export default ProfileInfo

const styles = StyleSheet.create({
  container: {
    height: 250,
    width: 250,
    backgroundColor: colors.light,
    borderRadius: 10,
    elevation: 5,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    height: 70,
    width: 70,
    borderRadius: 10,
    marginTop: 10,
  },
  profileImage: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.transgreen,
  },
  infosContainer: {
    marginTop: 30,
  },
  displayNameContainer: {
    flexDirection: 'row',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.green,
    justifyContent: 'center',
  },
  displayTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  displayName: {
    color: '#343a40',
    fontSize: 18,
    fontWeight: '800',
  },
  userNameContainer: {
    marginTop: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    justifyContent: 'center',
    borderTopColor: colors.green,
  },
  userNameText: {
    color: '#343a40',
    fontSize: 18,
    fontWeight: '800',
  },
  mobileContainer: {
    flexDirection: 'row',
    marginTop: 15,
    borderTopWidth: 1,
    justifyContent: 'center',
    borderTopColor: colors.green,
  },
  mobileText: {
    color: '#343a40',
    fontSize: 18,
    fontWeight: '800',
  },
})

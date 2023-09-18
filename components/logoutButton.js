import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import Modal from 'react-native-modal'
import React, { useState } from 'react'
import colors from '../assets/colors/colors'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'
import { auth } from '../config/firebase'
import { useNavigation } from '@react-navigation/native'

const LogoutButton = () => {
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)

  const handleLogout = () => {
    auth.signOut() // call your logout function from useAuth hook
    setShowModal(false)
    navigation.navigate('SignUp')
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={styles.barContainer}
      >
        <Entypo
          style={styles.infoIcon}
          name='log-out'
          size={24}
          color={colors.crimson}
        />
        <Text style={styles.barTextOut}>Log Out</Text>
        <MaterialCommunityIcons
          style={{ marginLeft: 190 }}
          name='greater-than'
          size={18}
          color='#3b3b3b'
        />
      </TouchableOpacity>
      <Modal visible={showModal} animationType='slide'>
        <View style={styles.modalbox}>
          <Text
            style={{
              marginBottom: 20,
              color: colors.light,
              fontSize: 20,
              fontWeight: '500',
            }}
          >
            Are you sure you want to log out?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <TouchableOpacity style={[styles.buttons]} onPress={handleLogout}>
              <Text
                style={{
                  color: colors.crimson,
                  fontWeight: '600',
                  fontSize: 19,
                }}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => setShowModal(false)}
            >
              <Text
                style={{
                  color: colors.green,
                  fontWeight: '600',
                  fontSize: 19,
                }}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default LogoutButton

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
  barTextOut: {
    color: colors.crimson,
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 20,
  },
  infoIcon: {
    marginLeft: 10,
  },
  modalbox: {
    height: 200,
    width: 300,
    backgroundColor: colors.crimson,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 10,
    elevation: 5,
  },
  buttons: {
    height: 35,
    width: 60,
    backgroundColor: colors.light,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

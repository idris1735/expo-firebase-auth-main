import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native'

export default function UserRoleScreen({ navigation }) {
  const animatedValue = new Animated.Value(0)

  const startAnimation = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start()
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.textContainer,
          { transform: [{ scale: animatedValue }] },
        ]}
        onStartShouldSetResponder={() => startAnimation()}
      >
        <Text style={styles.welcomeText}>Welcome to Riskgratis</Text>
      </Animated.View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AdminLogin')}
        >
          <Text style={styles.buttonText}>ADMIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Text style={styles.buttonText}>SALES TEAM</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01CD74',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 40,
    color: 'white',
    fontWeight: '600',
  },
  buttonsContainer: {
    // flexDirection: 'row',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 40,
  },
  buttonText: {
    color: '#01CD74',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
})

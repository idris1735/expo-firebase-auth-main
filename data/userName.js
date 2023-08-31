// import { StyleSheet, Text, View, Button } from 'react-native'
// import React from 'react'
// import { useAuthentication } from '../utils/hooks/useAuthentication'
// import { getAuth } from 'firebase/auth'
// import colors from '../assets/colors/colors'

// const auth = getAuth()
// const UserName = ({ firstName }) => {
//   const { user } = useAuthentication()

//   return (
//     <View style={styles.userTextContainer}>
//       <Text style={styles.userText}>
//         {' '}
//         Welcome, {auth.currentUser.displayName}
//       </Text>
//       {/* <Button
//         title='log firstname'
//         onPress={() => console.log(auth.currentUser)}
//       /> */}
//     </View>
//   )
// }

// export default UserName

// const styles = StyleSheet.create({
//   userTextContainer: {
//     // height: 100,
//     width: 200,
//     // backgroundColor: colors.crimson,
//     marginTop: 8,
//   },
//   userText: {
//     marginTop: 8,
//     fontSize: 30,
//     fontWeight: '700',
//     color: colors.green,
//     textShadowColor: colors.dark,
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 5,
//     letterSpacing: 2,
//   },
// })

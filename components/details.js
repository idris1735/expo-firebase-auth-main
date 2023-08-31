import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native'
import { useState } from 'react'
import colors from '../assets/colors/colors'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import categoriesData from '../data/categoriesData'
import popularData from '../data/popularData'
import OrderModal from '../components/orderModal'
import PrintButton from '../components/printButton'
import PdfButton from '../components/pdfButton'
import GenerateImageButton from '../components/generateImageButton'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Details = ({ route, navigation }) => {
  const { items } = route.params
  const [counts, setcounts] = useState(1)
  const orderID = '#12345'

  const [isModalVisible, setIsModalVisible] = useState(false)

  // const handleOrderPress = () => {
  //   setIsModalVisible(true)
  // }

  // const handleCloseModal = () => {
  //   setIsModalVisible(false)
  // }
  const [addedToCart, setAddedToCart] = useState(false)

  const addToCart = async () => {
    try {
      const existingCart = await AsyncStorage.getItem('order')
      const cartItems = existingCart ? JSON.parse(existingCart) : []

      const newCartItems = {
        orderID: orderID,
        item: items.type,
        quantity: counts,
        price: items.price,
        image: items.popularImage,
      }

      cartItems.push(newCartItems)

      await AsyncStorage.setItem('order', JSON.stringify(cartItems))
      setAddedToCart(true)
      navigation.navigate('Orders')
    } catch (error) {
      console.log(error)
    }
  }

  const renderPizzaContainers = ({ item }) => {
    return (
      <View style={styles.ingredientsWrapContainer}>
        <View style={styles.ingredientsContainer}>
          <Image style={styles.ingredientsImage} source={item.image} />
        </View>
        <View style={styles.ingredientTextContainer}>
          <Text style={styles.ingredientText}>{item.ingredient}</Text>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* Top Buttons */}
      <View style={styles.topButtonsContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.lessthanButton}>
            <MaterialCommunityIcons
              style={styles.categoryIcon}
              name='less-than'
              size={18}
              color='black'
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.starButton}>
            <MaterialCommunityIcons
              style={styles.categoryIcon}
              name='star'
              size={18}
              color='white'
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Pizza Title */}
      <View style={styles.pizzaTypeContainer}>
        <Text style={styles.pizzaTypeText}>{items.type}</Text>
        <Text style={styles.pizzaPriceText}>${items.price}</Text>
      </View>

      {/* Pizza Specs */}
      <View style={styles.specsContainer}>
        <View style={styles.specsTextsContainer}>
          <View style={styles.sizeSpecs}>
            <Text style={styles.sizeTitle}>Size</Text>
            <Text style={styles.sizeText}>{items.size}"</Text>
          </View>
          <View style={styles.sizeSpecs}>
            <Text style={styles.sizeTitle}>Crust</Text>
            <Text style={styles.sizeText}>{items.Crust}</Text>
          </View>
          <View style={styles.sizeSpecs}>
            <Text style={styles.sizeTitle}>Delivery in</Text>
            <Text style={styles.sizeText}>{items.DeliveryTime}</Text>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image style={styles.pizzaImage} source={items.popularImage} />
        </View>
      </View>
      {/* Ingredients */}
      <View style={styles.ingredientsWrapper}>
        <View>
          <Text style={styles.ingredientTitle}>Ingredients</Text>
        </View>
        <View>
          <FlatList
            key={items.id}
            renderItem={renderPizzaContainers}
            data={items.Ingredients}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
      <TouchableOpacity>
        <View style={styles.buttonContainer}>
          <View style={styles.countsButtonContainer}>
            <TouchableOpacity
              onPress={() => setcounts(counts - 1)}
              style={styles.minusCountButton}
            >
              <Text style={styles.signText}> - </Text>
            </TouchableOpacity>
            <View style={styles.orderCounts}>
              <Text style={styles.signText}> {counts} </Text>
            </View>
            <TouchableOpacity
              style={styles.addCountButton}
              onPress={() => setcounts(counts + 1)}
            >
              <Text style={styles.signText}> + </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            disabled={addedToCart}
            onPress={addToCart}
            style={[
              styles.button,
              { backgroundColor: addedToCart ? colors.green : colors.crimson },
            ]}
          >
            <Text style={styles.buttonText}>
              {addedToCart ? 'Added to cart!' : 'Add to cart >'}{' '}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <OrderModal
          order={order}
          visible={isModalVisible}
          onClose={handleCloseModal}
        /> */}
      </TouchableOpacity>
      {/* <View style={{ display: isVisible ? 'flex' : 'none' }}>
        <PrintButton order={order} />
        <PdfButton order={order} />
        <GenerateImageButton order={order} />
      </View> */}
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
  },
  topButtonsContainer: {
    marginTop: 80,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessthanButton: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: colors.dark,
    borderRadius: 8,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starButton: {
    height: 40,
    borderRadius: 8,
    width: 40,
    backgroundColor: colors.green,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pizzaTypeContainer: {
    height: 78,
    width: 172,
    marginLeft: 20,
    marginTop: 30,
  },
  pizzaTypeText: {
    fontSize: 32,
    fontWeight: '700',
  },
  pizzaPriceText: {
    height: 39,
    width: 87,
    fontWeight: '600',
    color: colors.crimson,
    fontSize: 32,
    marginTop: 15,
  },
  specsContainer: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  specsTextsContainer: {
    marginLeft: 20,
    marginTop: 15,
  },
  sizeSpecs: {
    marginTop: 15,
  },
  sizeTitle: {
    color: colors.harsh,
    fontWeight: '500',
    fontSize: 16,
  },
  sizeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  imageContainer: {
    height: 176,
    width: 296,
  },
  pizzaImage: {
    marginLeft: 30,
    marginTop: 30,
  },
  ingredientsWrapper: { marginTop: 40 },
  ingredientTitle: {
    marginTop: 10,
    color: colors.dark,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.4,
    marginLeft: 20,
  },
  ingredientsWrapContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientsContainer: {
    marginTop: 20,
    height: 80,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.dark,
    elevation: 3,
  },
  ingredientTextContainer: {
    justifyContent: 'center',
  },
  ingredientText: {
    marginTop: 5,
    fontSize: 17,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    marginTop: 10,
    height: 55,
    width: 170,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.dark,
    elevation: 3,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  countsButtonContainer: {
    height: 55,
    width: 80,
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 70,
  },
  minusCountButton: {
    height: '100%',
    width: 40,
    borderRadius: 12.5,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.dark,
    elevation: 3,
  },
  signText: {
    fontSize: 30,
    fontWeight: '400',
  },
  orderCounts: {
    height: '100%',
    width: 50,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCountButton: {
    height: '100%',
    width: 40,
    borderRadius: 12.5,
    backgroundColor: colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.dark,
    elevation: 3,
  },
})

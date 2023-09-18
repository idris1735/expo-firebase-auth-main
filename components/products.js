import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../store/cartReducer' // Adjust the path accordingly
import colors from '../assets/colors/colors'
import { Picker } from '@react-native-picker/picker'

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const dispatch = useDispatch()

  useEffect(() => {
    // Fetch the products data from the API
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
        // Extract unique categories from the products data
        const uniqueCategories = [
          ...new Set(data.products.map((product) => product.category)),
        ]
        setCategories(['All', ...uniqueCategories]) // Include "All" as an option
      })
  }, [])

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory)

  const addToCartHandler = (product) => {
    dispatch(addToCart(product))

    Alert.alert(product.title + ' is added to the cart')
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectContainer}>
        <Text style={styles.selectLabel}>Select Category:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.select}
        >
          {categories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>
      </View>

      {filteredProducts.map((product) => (
        <View key={product.id} style={styles.productContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.thumbnail }}
              style={styles.productImage}
            />
          </View>
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productCategory}>
              Category: {product.category}
            </Text>
          </View>
          <View style={styles.Rhs}>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>${product.price}</Text>
            </View>

            {/* <View style={styles.cartCounts}>
              <TouchableOpacity style={styles.cartButton}>
                <Text style={styles.cartButtonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cartButtonZero}>
                <Text style={styles.cartButtonTextZero}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cartButton}>
                <Text style={styles.cartButtonText}>+</Text>
              </TouchableOpacity>
            </View> */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCartHandler(product)} // Add to cart action
              >
                <Text style={styles.addToCartButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: -10,
    borderWidth: 1,
    borderColor: colors.green,
    borderRadius: 5,
  },
  selectLabel: {
    fontSize: 16,
    marginRight: 5,
    marginLeft: 8,
  },
  select: {
    flex: 1,
  },
  productContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    // padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 7,
    height: 140,
  },
  imageContainer: {
    flex: 1,
    marginRight: 16,
    borderWidth: 1,
    borderColor: colors.green,
    height: 100,
    borderRadius: 5,
    marginLeft: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 16,
    marginTop: 8,
  },
  Rhs: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red',
    height: 70,
  },
  productPrice: {
    fontSize: 23,
    fontWeight: '700',
    color: colors.crimson,
    // marginBottom: 10,
    textAlign: 'center',
    marginTop: 40,
  },
  cartCounts: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  buttonContainer: {
    // marginTop: 10.5,
    height: 70,
    width: 90,
    // backgroundColor: 'red',
    marginLeft: 10,
    borderBottomRightRadius: 7,
  },
  addToCartButton: {
    backgroundColor: colors.green,
    borderBottomRightRadius: 7,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderTopLeftRadius: 7,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: '700',
  },
  // cartButton: {
  //   backgroundColor: colors.green,
  //   borderRadius: 10,
  //   width: 32,
  //   height: 32,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginLeft: 0,
  // },
  // cartButtonText: {
  //   color: 'white',
  //   fontSize: 20,
  // },
  // cartButtonZero: {
  //   width: 25,
  //   height: 25,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginLeft: 0,
  // },
  // cartButtonTextZero: {
  //   color: 'black',
  //   fontSize: 20,
  // },
})

export default Products

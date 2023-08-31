import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import colors from '../assets/colors/colors'

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

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
          <Image
            source={{ uri: product.thumbnail }}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>Price: ${product.price}</Text>
            <Text style={styles.productCategory}>
              Category: {product.category}
            </Text>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <Text style={styles.cartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
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
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productDetails: {
    flex: 2,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    marginTop: 8,
  },
  productCategory: {
    fontSize: 16,
    marginTop: 8,
  },
  cartButton: {
    backgroundColor: colors.green,
    borderRadius: 50,
    width: 100,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default Products

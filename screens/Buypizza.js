import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native'
import colors from '../assets/colors/colors'
import { Feather } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import categoriesData from '../data/categoriesData'
import popularData from '../data/popularData'
import { useAuthentication } from '../utils/hooks/useAuthentication'
import { getAuth, signOut } from 'firebase/auth'

const auth = getAuth()

const Buypizza = ({ navigation }) => {
  const { user } = useAuthentication()

  let usermail = user?.email
  console.log('====================================')
  console.log(user)
  console.log('====================================')

  const renderCategoryData = ({ item }) => {
    return (
      <View
        style={[
          styles.categoriesOptions,
          { backgroundColor: item.selected ? colors.green : 'white' },
        ]}
      >
        <Image style={styles.categoryImage} source={item.image} />
        <Text style={styles.categoryText}>{item.title}</Text>
        <View
          style={{
            backgroundColor: item.selected ? colors.light : colors.green,
            borderRadius: 20,
            height: 26,
            width: 26,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <MaterialCommunityIcons
            style={styles.categoryIcon}
            name='greater-than'
            size={18}
            color='black'
          />
        </View>
      </View>
    )
  }
  return (
    <ScrollView
      contentInsetAdjustmentBehavior='automatic'
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.container}>
        {/* Profile Container */}
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImg}
            source={require('../assets/profile.png')}
          />
          <Text>Welcome {user?.email}</Text>
          <Button
            title='Sign Out'
            style={{ marginTop: 10 }}
            onPress={() => signOut(auth)}
          />
          <Feather style={styles.feather} name='menu' size={30} color='black' />
        </View>
        {/* Titles */}
        <View style={styles.titlesContainer}>
          <Text style={styles.foodText}>Food</Text>
          <Text style={styles.deliveryfoodText}>Delivery</Text>
        </View>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Feather name='search' size={24} color='black' />
          <TextInput
            placeholder='Search'
            placeholderTextColor={colors.harsh}
            style={styles.searchInput}
          />
        </View>
        {/* Categories */}
        <View style={styles.categoriesWrapper}>
          <View style={styles.cateoriesTitleWrapper}>
            <Text style={styles.categoriesTitle}>Categories</Text>
          </View>
          <FlatList
            data={categoriesData}
            renderItem={renderCategoryData}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* Popular */}
        <View style={styles.popularWrapper}>
          <View style={styles.popularTitle}>
            <Text style={styles.popularTitleText}>Popular</Text>
          </View>
          {popularData.map((items) => {
            const addToOrders = () => {
              console.log('====================================')
              console.log(items.type + ' is added to cart')
              console.log('====================================')
            }
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Details', { items: items })
                }}
                key={items.id}
              >
                <View style={styles.popularOptions}>
                  <View style={styles.popularTop}>
                    <Image
                      style={styles.popularPizzaCrown}
                      source={items.image}
                    />
                    <Text style={styles.popularPizzaTitle}>{items.title}</Text>
                  </View>
                  <View style={styles.popularPizzaContainer}>
                    <View style={styles.popularSpecsContainer}>
                      <Text style={styles.popularPizzaType}>{items.type}</Text>
                      <Text style={styles.popularPizzaWeight}>
                        {items.weight}
                      </Text>

                      {/* Ratings */}
                      <View style={styles.RatingsDesignContainer}>
                        <TouchableOpacity onPress={addToOrders}>
                          <View style={styles.yellowCurveDesign}>
                            <Text style={styles.plusSign}>+</Text>
                          </View>
                        </TouchableOpacity>
                        <View style={styles.Ratings}>
                          <FontAwesome name='star' size={16} color='black' />
                          <Text style={styles.ratingText}>{items.Ratings}</Text>
                        </View>
                      </View>
                    </View>
                    <Image
                      style={styles.popularPizzaImage}
                      source={items.popularImage}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    flex: 1,
    marginTop: 30,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: colors.dark,
  },
  feather: {
    marginRight: 20,
  },
  titlesContainer: {
    marginTop: 30,
    marginLeft: 20,
  },
  foodText: {
    fontWeight: '400',
    fontSize: 20,
    // lineHeight: 16,
    marginTop: 10,
  },
  deliveryfoodText: {
    fontWeight: '700',
    fontSize: 32,
    marginTop: 10,
    lineHeight: 39,
  },
  searchContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 20,
  },
  searchInput: {
    borderBottomColor: colors.harsh,
    borderBottomWidth: 2,
    width: 250,
    fontSize: 20,
    marginLeft: 20,
  },
  categoriesWrapper: {
    marginTop: 40,
  },
  cateoriesTitleWrapper: {
    marginLeft: 20,
  },
  categoriesTitle: {
    fontWeight: '700',
    fontSize: 24,
  },
  categoriesOptions: {
    marginTop: 20,
    height: 197,
    width: 105,
    marginLeft: 25,
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    shadowColor: '#171717',
    elevation: 4,
  },
  categoryImage: {
    marginTop: 20,
  },
  categoryText: {
    fontWeight: '500',
    fontSize: 18,
    marginTop: 20,
  },
  popularWrapper: {
    marginTop: 30,
    marginLeft: 20,
  },
  popularTitle: { marginTop: 20 },
  popularTitleText: {
    fontWeight: '700',
    fontSize: 24,
  },
  popularOptions: {
    height: 161,
    width: 320,
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    elevation: 5,
    shadowColor: '#171717',
    marginTop: 20,
    // padding: 10,
  },
  popularTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  popularPizzaCrown: {
    marginLeft: 10,
  },
  popularPizzaTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 5,
    marginTop: 10,
  },
  popularPizzaContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popularSpecsContainer: {
    marginLeft: 10,
  },
  popularPizzaType: {
    color: colors.dark,
    fontWeight: '600',
    fontSize: 15,
    marginTop: 10,
  },
  popularPizzaWeight: {
    color: colors.harsh,
    fontWeight: '500',
    fontSize: 15,
  },
  popularPizzaImage: {
    height: 125,
    width: 210,
    marginLeft: 20,
  },
  RatingsDesignContainer: {
    flexDirection: 'row',
    marginTop: 28,
  },
  yellowCurveDesign: {
    height: 53,
    width: 80,
    backgroundColor: colors.green,
    borderBottomLeftRadius: 25,
    marginLeft: -11,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: ,
  },
  plusSign: {
    color: colors.dark,
    fontWeight: '800',
    fontSize: 20,
  },
  Ratings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
  },
  ratingText: {
    fontSize: 18,
    marginLeft: 5,
  },
})

export default Buypizza

import { StyleSheet, Text, View, FlatList, Image, Pressable, ActivityIndicator, useWindowDimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useGetProductsByCategoryQuery } from '../../store/services/shopApi'
import FlatCard from '../../components/FlatCard'
import Search from '../../components/Search'
import { colors } from '../../theme/colors'
import TextGravitasOne from '../../components/customText/TextGravitasOne'

const ProductsScreen = ({ route, navigation, subtitle }) => {
  const [productsFiltered, setProductsFiltered] = useState([])
  const [keyword, setKeyword] = useState("")
  const category = useSelector(state => state.shopReducer.categorySelected)
  const { data: productsFilteredByCategory, isLoading } = useGetProductsByCategoryQuery(category?.toLowerCase())

  useEffect(() => {
    if (keyword) {
      setProductsFiltered(
        productsFilteredByCategory?.filter(product =>
          product.title.toLowerCase().includes(keyword.toLowerCase())
        ) || []
      )
    } else {
      setProductsFiltered(productsFilteredByCategory || [])
    }
  }, [keyword, productsFilteredByCategory, category])

  const { width } = useWindowDimensions()
  const categorySelected = useSelector(state => state.shopReducer.categorySelected)

  // 🔹 Responsive 2-column layout
  const spacing = 1
  const columns = 2
  const itemWidth = (width - (spacing * (columns + 0.1))) / columns
  const itemHeight = itemWidth * 1

  const renderProductItem = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("Producto", { product: item })}>
      <View style={[styles.cardContainer, { width: itemWidth, height: itemHeight }]}>
        <FlatCard style={styles.card}>
          <Image
            source={{ uri: item.mainImage }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </FlatCard>
      </View>
    </Pressable>
  )

  return (
    <View style={styles.screen}>

      <TextGravitasOne style={styles.subtitle}>
        {categorySelected || subtitle}
      </TextGravitasOne>
      <Search style={styles.search} setKeyword={setKeyword} keyword={keyword} />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={productsFiltered}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          key={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={[styles.listContainer, { paddingHorizontal: spacing }]}
        />
      )}
    </View>
  )
}

export default ProductsScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lightTurquoise,
    alignItems: 'center',
  },
  listContainer: {
  },
  cardContainer: {
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.lightTurquoise,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '400',
    color: colors.white,
    marginVertical: 2,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '400',
    padding: 4,
    textTransform: 'capitalize',
    color: "white",
  },
})

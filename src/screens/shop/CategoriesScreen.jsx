import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  useWindowDimensions,
  ActivityIndicator
} from 'react-native'
import FlatCard from '../../components/FlatCard'
import TextGravitasOne from '../../components/customText/TextGravitasOne'
import { useDispatch } from 'react-redux'
import { selectCategory, filterProducts } from '../../store/slices/shopSlice'
import { useGetCategoriesQuery } from '../../store/services/shopApi'
import { colors } from '../../theme/colors'

const CategoriesScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { width } = useWindowDimensions()
  const { data: categories, isLoading } = useGetCategoriesQuery()

  const columns = 2
  const spacing = 1
  const itemWidth = (width - (spacing * (columns + 0.1))) / columns
  const itemHeight = itemWidth * 1

  const handleSelectCategory = (category) => {
    dispatch(selectCategory(category))
    dispatch(filterProducts())
    navigation.navigate("Productos")
  }

  const renderCategoryItem = ({ item }) => (
    <Pressable onPress={() => handleSelectCategory(item.title)}>
      <View style={[styles.cardContainer, { width: itemWidth, height: itemHeight }]}>
        <FlatCard style={styles.card}>
          <TextGravitasOne style={styles.title}>{item.title}</TextGravitasOne>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </FlatCard>
      </View>
    </Pressable>
  )

  if (isLoading) return <ActivityIndicator style={{ marginTop: 20 }} />

  return (
    <View style={styles.screen}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        key={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={[styles.listContainer, { paddingHorizontal: spacing }]}
      />
    </View>
  )
}

export default CategoriesScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lightTurquoise,
    alignItems: 'center',
  },

  cardContainer: {
    flex: 1,
    borderRadius: 16,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  title: {
    position: 'absolute',
    zIndex: 1,
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
  }
})

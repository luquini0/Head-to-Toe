import { FlatList, StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native'
import { colors } from '../../theme/colors'
import FlatCard from '../../components/FlatCard'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSelector, useDispatch } from 'react-redux'
import { removeItems, incrementQuantity, decrementQuantity, updateQuantity } from '../../store/slices/cartSlice'

const CartScreen = () => {
  const cartItems = useSelector(state => state.cartReducer.cartItems)
  const total = useSelector(state => state.cartReducer.total)
  const dispatch = useDispatch()

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: $ {total}</Text>
      <Pressable style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirmar</Text>
      </Pressable>
    </View>
  )

  const renderCartItem = ({ item }) => (
    <FlatCard style={styles.cartContainer}>
      <View>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.cartImage}
          resizeMode='cover'
        />
      </View>

      <View style={styles.cartDescription}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Precio unitario: $ {item.price}</Text>

        {/* 🔹 Controles de cantidad */}
        <View style={styles.quantityContainer}>
          <Pressable onPress={() => dispatch(decrementQuantity(item.id))} style={styles.qtyButton}>
            <Text style={styles.qtyText}>-</Text>
          </Pressable>

          <TextInput
            style={styles.qtyInput}
            value={String(item.quantity)}
            keyboardType="numeric"
            onChangeText={(text) => {
              const num = parseInt(text) || 1
              dispatch(updateQuantity({ id: item.id, quantity: num }))
            }}
          />

          <Pressable onPress={() => dispatch(incrementQuantity(item.id))} style={styles.qtyButton}>
            <Text style={styles.qtyText}>+</Text>
          </Pressable>
        </View>

        <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>

        <Pressable onPress={() => dispatch(removeItems(item.id))}>
          <Ionicons name="trash-outline" size={24} color="white" style={styles.trashIcon} />
        </Pressable>
      </View>
    </FlatCard>
  )

  return (
    <View style={styles.screen}>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={renderCartItem}
          ListHeaderComponent={<Text style={styles.cartScreenTitle}>Tu carrito:</Text>}
          ListFooterComponent={<FooterComponent />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyText}>Aún no hay productos en el carrito</Text>
      )}
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.lightTurquoise,
    paddingVertical: 8,
  },
  cartContainer: {
    backgroundColor: colors.lightTurquoise,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'flex-start',
    margin: 16,
    alignItems: 'center',
    gap: 10,
    borderRadius: 16,
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  cartImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  cartDescription: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  description: {
    color: 'white',
    marginBottom: 8,
  },
  price: {
    color: 'white',
    fontWeight: '500',
  },
  quantity: {
    color: 'white',
    marginTop: 4,
  },
  total: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  trashIcon: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  footerContainer: {
    backgroundColor: colors.lightTurquoise,
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  footerTotal: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 12,
  },
  confirmButton: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  confirmButtonText: {
    color: colors.lightTurquoise,
    fontSize: 16,
    fontWeight: '700',
  },
  cartScreenTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    marginTop: 40,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'flex-start'
  },
  qtyButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  qtyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  qtyInput: {
    width: 50,
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    paddingVertical: 4,
  },

})

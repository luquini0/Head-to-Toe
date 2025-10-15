import { StyleSheet, Text, View, Pressable, Image, ScrollView, Modal, TouchableOpacity, useWindowDimensions, Platform } from 'react-native'
import { colors } from '../../theme/colors'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addItems } from '../../store/slices/cartSlice'

const ProductScreen = ({ route }) => {
  const { product } = route.params
  const { width, height } = useWindowDimensions()
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showAddedModal, setShowAddedModal] = useState(false)


  return (
    <ScrollView style={styles.productContainer} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.textBrand}>{product.brand}</Text>

      <View style={styles.mainRow}>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Image
            source={{ uri: product.mainImage }}
            alt={product.title}
            style={[styles.image, { width: width * 0.45, height: width * 0.45 }]}
            resizeMode="contain"
          />
        </Pressable>
        <Modal
          visible={showAddedModal}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.popupOverlay}>
            <View style={styles.popupBox}>
              <Text style={styles.popupText}>Producto añadido al carrito</Text>
            </View>
          </View>
        </Modal>


        <View style={styles.infoContainer}>
          <Text style={styles.textTitle}>{product.title}</Text>

          {product.discount > 0 && (
            <View style={styles.discount}>
              <Text style={styles.discountText}>-{product.discount}%</Text>
            </View>
          )}

          {product.stock <= 0 && <Text style={styles.noStockText}>Sin Stock</Text>}

          <Text style={styles.price}>${product.price}</Text>

          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.9 : 1 },
              styles.addToCartButton,
            ]}
            onPress={() => {
              dispatch(addItems({ product: product, quantity: 1 }))
              setShowAddedModal(true)
              setTimeout(() => setShowAddedModal(false), 1000)
            }}
          >
            <Text style={styles.textAddToCart}>Agregar</Text>
          </Pressable>

        </View>
      </View>

      {product.tags?.length > 0 && (
        <View style={styles.tagsContainer}>
          <Text style={styles.tagLabel}>Tags:</Text>
          <View style={styles.tagsList}>
            {product.tags.map(tag => (
              <Text key={Math.random()} style={styles.tagText}>#{tag}</Text>
            ))}
          </View>
        </View>
      )}

      <Text style={styles.longDescription}>{product.longDescription}</Text>

      {/* 🔹 Modal Lightbox */}
      <Modal visible={isModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.modalCloseArea} onPress={() => setIsModalVisible(false)} />
          <Image
            source={{ uri: product.mainImage }}
            style={[styles.modalImage, { width: width * 0.9, height: height * 0.6 }]}
            resizeMode="contain"
          />
          <Pressable style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.closeButtonText}>✕</Text>
          </Pressable>
        </View>
      </Modal>
    </ScrollView>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    backgroundColor: colors.lightTurquoise,
  },
  scrollContent: {
    padding: 16,
  },
  textBrand: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  image: {
    borderRadius: 16,
    backgroundColor: colors.lightTurquoise,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 8,
    color: "white",
  },
  price: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.white,
    marginVertical: 6,
  },
  addToCartButton: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  textAddToCart: {
    color: colors.lightTurquoise,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  discount: {
    backgroundColor: colors.brightOrange,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 6,
  },
  discountText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  noStockText: {
    color: colors.red,
    fontWeight: '700',
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagLabel: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.white,
    marginRight: 5,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tagText: {
    fontSize: 13,
    color: colors.grisOscuro,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  longDescription: {
    fontSize: 15,
    textAlign: 'justify',
    paddingVertical: 8,
    color: colors.white,
    fontFamily: Platform.select({
      ios: 'System',
      android: 'sans-serif',
    }),
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    borderRadius: 10,
  },
  modalCloseArea: {
    ...StyleSheet.absoluteFillObject,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    padding: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },
  popupOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  popupBox: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  popupText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
})

import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../theme/colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { clearSession } from '../db';
import { clearUser } from '../store/slices/userSlice';

const Header = ({ subtitle }) => {
  //console.log("Header montado")
  const navigation = useNavigation()
  const user = useSelector(state => state.userReducer.user)

  const dispatch = useDispatch()

  const categorySelected = useSelector(state => state.shopReducer.categorySelected)

  const handleClearSession = async () => {
    try {
      await clearSession()
    } catch {
      console.log("Hubo un error al limpiar la sesión")
    }
    dispatch(clearUser())

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Head to toe</Text>
      <View style={styles.actionsRow}>
        {navigation.canGoBack() && (
          <Pressable onPress={() => navigation.goBack()} style={styles.goBackBtn}>
            <Ionicons name="chevron-back-outline" size={24} color={colors.white} />
          </Pressable>
        )}
        {user && (
          <Pressable onPress={handleClearSession} style={styles.logOutBtn}>
            <Ionicons name="log-out" size={24} color={colors.white} />
          </Pressable>
        )}
      </View>

    </View>
  )
}


export default Header

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    height: 180,
    backgroundColor: colors.lightTurquoise,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginTop: 20,
    fontSize: 38,
    color: colors.white,
    fontFamily: "BirthstoneBounce-Medium"
  },
  subtitle: {
    fontSize: 16,
    color: colors.white,
  },
  goBackBtn: {
    alignSelf: "flex-start",
    justifyContent: "flex-start",
    padding: 4,
  },
  logOutBtn: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    padding: 4,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space", // o "space-between" si querés que estén separados
    gap: 200,
    marginBottom: 10,
  },

  

})
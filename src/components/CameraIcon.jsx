import { StyleSheet, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme/colors';

const CameraIcon = () => {
  return (
    <View style={styles.iconContainer}>
      <Ionicons name="camera-outline" size={24} color={colors.white} />
    </View>
  )
}

export default CameraIcon

const styles = StyleSheet.create({
    iconContainer:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.darkGray,
        width:48,
        height:48,
        borderRadius:32
    }
})
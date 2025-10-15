import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../theme/colors';

const TextGravitasOne = ({ children }) => {
  return (
    <Text style={{ fontFamily: "GravitasOne", color: 'white' }}>{children}</Text>

  )
}

export default TextGravitasOne

const styles = StyleSheet.create({})
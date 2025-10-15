import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator } from 'react-native'
import { colors } from '../../theme/colors'
import CameraIcon from '../../components/CameraIcon'
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setProfilePicture } from '../../store/slices/userSlice';
import { usePutProfilePictureMutation } from '../../store/services/profileApi';
import { Alert } from 'react-native';


const ProfileScreen = () => {
  const user = useSelector(state => state.userReducer.user)
  const profilePicture = useSelector(state => state.userReducer.profilePicture)
  const localId = useSelector(state => state.userReducer.localId)

  const [location, setLocation] = useState(null)
  const [locationLoaded, setLocationLoaded] = useState(false)
  const [address, setAddress] = useState("")

  const [triggerPutProfilePicture, result] = usePutProfilePictureMutation()

  const dispatch = useDispatch()

  const pickImage = () => {
    Alert.alert(
      'Seleccionar imagen',
      '¿Qué deseas hacer?',
      [
        {
          text: 'Tomar foto',
          onPress: async () => {
            let result = await ImagePicker.launchCameraAsync({
              mediaTypes: ['images'],
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.6,
              base64: true
            });

            if (!result.canceled) {
              const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
              dispatch(setProfilePicture(imgBase64));
              triggerPutProfilePicture({ localId: localId, image: imgBase64 });
            }
          }
        },
        {
          text: 'Elegir de la galería',
          onPress: chooseImageFromLibrary
        },
        {
          text: 'Cancelar',
          style: 'cancel'
        }
      ]
    );
  };


  const chooseImageFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.6,
      base64: true
    });

    if (!result.canceled) {
      const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      dispatch(setProfilePicture(imgBase64));
      triggerPutProfilePicture({ localId: localId, image: imgBase64 });
    }
  };


  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageProfileContainer}>
        {
          profilePicture
            ?
            <Image source={{ uri: profilePicture }} resizeMode='cover' style={styles.profileImage} />
            :
            <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
        }
        <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
          <CameraIcon />
        </Pressable>
      </View>
      <Text style={styles.profileData}>Email: {user} </Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightTurquoise,
  },
  imageProfileContainer: {
    width: 128,
    height: 128,
    borderRadius: 128,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textProfilePlaceHolder: {
    color: colors.lightTurquoise,
    fontSize: 48,
  },
  profileData: {
    paddingVertical: 16,
    fontSize: 16,
    color: colors.white
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 128
  },
})

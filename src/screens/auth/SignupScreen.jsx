import { StyleSheet, Text, View, TextInput, Pressable, Dimensions, Alert } from 'react-native';
import { colors } from '../../theme/colors';
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../store/services/authApi';
import { useDispatch } from 'react-redux';
import { setUserEmail, setLocalId } from '../../store/slices/userSlice';
import { saveSession } from '../../db';

const textInputWidth = Dimensions.get('window').width * 0.7;

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [triggerSignup, result] = useSignupMutation();
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    triggerSignup({ email, password, returnSecureToken: true });
  };

  useEffect(() => {
    const handleSignupSuccess = async () => {
      if (result.status === 'fulfilled') {
        const { localId, email } = result.data;

        dispatch(setUserEmail(email));
        dispatch(setLocalId(localId));
        try {
          await saveSession(localId, email);
          Alert.alert('Cuenta creada', 'Tu cuenta ha sido registrada correctamente.');

          navigation.navigate('Login');
        } catch (err) {
          console.log('Error guardando sesión:', err);
        }
      } else if (result.error) {
        Alert.alert('Error', 'No se pudo crear la cuenta. Revisa los datos ingresados.');
      }
    };
    handleSignupSuccess();
  }, [result]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Head to Toe</Text>
      <Text style={styles.subTitle}>Crea tu cuenta</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor={colors.lightTurquoise}
          style={styles.textInput}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Contraseña"
          placeholderTextColor={colors.lightTurquoise}
          style={styles.textInput}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirmar contraseña"
          placeholderTextColor={colors.lightTurquoise}
          style={styles.textInput}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
      </View>
      <View style={styles.footTextContainer}>
        <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={[styles.whiteText, styles.underLineText]}>Inicia sesión</Text>
        </Pressable>
      </View>
      <Pressable style={styles.btn} onPress={onSubmit}>
        <Text style={styles.btnText}>Registrarme</Text>
      </Pressable>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightTurquoise,
  },
  title: {
    color: colors.white,
    fontFamily: 'BirthstoneBounce-Medium',
    fontSize: 80,
    fontWeight: '600',
    marginBottom: 100,
  },
  subTitle: {
    fontSize: 18,
    color: colors.white,
  },
  inputContainer: {
    gap: 16,
    margin: 16,
    marginTop: 48,
    alignItems: 'center',
  },
  textInput: {
    padding: 8,
    paddingLeft: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    width: textInputWidth,
    color: colors.lightTurquoise,
  },
  btn: {
    padding: 16,
    paddingHorizontal: 32,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginTop: 32,
  },
  btnText: {
    color: colors.lightTurquoise,
    fontSize: 16,
    fontWeight: '700',
  },
  footTextContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  whiteText: {
    color: colors.white,
  },
  underLineText: {
    textDecorationLine: 'underline',
  },
});

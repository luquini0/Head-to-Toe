import { StyleSheet, Text, View, TextInput, Pressable, Dimensions,Switch } from 'react-native'
import { colors } from '../../theme/colors';
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../../store/services/authApi';
import { useDispatch } from 'react-redux';
import { setUserEmail, setLocalId } from '../../store/slices/userSlice';
import { saveSession, clearSession } from '../../db';

const textInputWidth = Dimensions.get('window').width * 0.7

const LoginScreen = ({ navigation, route }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [persistSession, setPersistSession] = useState(false)

    const [triggerLogin, result] = useLoginMutation()
    const dispatch = useDispatch()

    //console.log(result)

    const onsubmit  = () => {
        triggerLogin({email,password})
        
    }

    useEffect(()=>{
        const saveLoginSession = async () => {
            if(result.status==="fulfilled"){
                try{

                    const {localId, email} = result.data

                    if(persistSession){
                        await saveSession(localId, email)
                    }else{
                        await clearSession(localId)
                    }
                    dispatch(setUserEmail(email))
                    dispatch(setLocalId(localId))
                }catch(error){
                    console.log("Error al guardar sesion:", error)
                }
            }
        }
        saveLoginSession()
    },[result])



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Head to Toe</Text>
            <Text style={styles.subTitle}>Inicia sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={colors.lightTurquoise}
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor={colors.lightTurquoise}
                    placeholder='Password'
                    style={styles.textInput}
                    secureTextEntry
                />
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>
            <View style={styles.rememberMe}>
                <Text style={{ color: colors.white }}>¿Mantener sesión iniciada?</Text>
                <Switch
                    onValueChange={() => setPersistSession(!persistSession)}
                    value={persistSession}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                />
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightTurquoise,
    },
    title: {
        color: colors.white,
        fontFamily: "BirthstoneBounce-Medium",
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
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.white,
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 16
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.white,
        borderRadius: 16,
        marginTop: 32
    },
    btnText: {
        color: colors.lightTurquoise,
        fontSize: 16,
        fontWeight: '700'
    },
    error: {
        padding:16,
        backgroundColor:colors.red,
        borderRadius:8,
        color: colors.white
    },
    rememberMe: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8
    }

})
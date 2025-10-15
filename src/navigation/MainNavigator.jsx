import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./TabsNavigator";
import AuthStackNavigator from "./AuthStackNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../store/services/profileApi";
import { useEffect } from "react";
import { setProfilePicture } from "../store/slices/userSlice";
import { initSessionsTable , getSession} from "../db";
import { setUserEmail, setLocalId } from "../store/slices/userSlice";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../theme/colors";
import { useState } from "react";

export default function MainNavigator() {
    const [checkingSession,setCheckingSession] = useState(true)
    const user = useSelector(state=>state.userReducer.user)
    const localId = useSelector(state=>state.userReducer.localId)

    const dispatch = useDispatch()
    const {data: profilePicture, isLoading, error} =  useGetProfilePictureQuery(localId)

    useEffect(() => {
        const bootstrap = async () => {
            await initSessionsTable();
            const session = await getSession(localId); //En SQLite
            if (session) {
                console.log("Session exitosa:", session)
                dispatch(setUserEmail(session.email))
                dispatch(setLocalId(session.localId))
            }
            setCheckingSession(false);
        };

        bootstrap();
    }, []);


    useEffect(()=>{
        if(profilePicture){
            dispatch(setProfilePicture(profilePicture.image))
        }
    },[profilePicture])

    if (checkingSession) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.cobaltBlue} />
            </View>
        );
    }


    return (
        <NavigationContainer>
            {
                user ? <TabsNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}
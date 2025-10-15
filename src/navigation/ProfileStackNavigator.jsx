import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName='Perfil'
        screenOptions={{
            header: ({route})=><Header subtitle={route.name} />
        }}
    >
      <Stack.Screen name="Perfil" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigator
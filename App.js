import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { headToToe } from './src/store';
import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'BirthstoneBounce-Medium': require('./assets/fonts/BirthstoneBounce-Medium.ttf'),
    'BirthstoneBounce-Medium': require('./assets/fonts/BirthstoneBounce-Regular.ttf'),
    'GravitasOne': require('./assets/fonts/GravitasOne-Regular.ttf'),
  });


  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        dispatch(setUserEmail(session.email));
        dispatch(setLocalId(session.localId));
        navigation.replace('TabNavigator');
      }
    };
    checkSession();
  }, []);


  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Provider store={headToToe}>
      <MainNavigator />
      <StatusBar style="light" />
    </Provider>
  );
}

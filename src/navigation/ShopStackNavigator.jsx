import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoriesScreen, ProductsScreen, ProductScreen } from '../screens';
import Header from '../components/Header';
import { StyleSheet } from 'react-native'

const Stack = createNativeStackNavigator();

const ShopStackNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName='Categorías'
        screenOptions={{
            header: ({route})=><Header subtitle={route.name} />
        }}
    >
      <Stack.Screen name="Categorías" component={CategoriesScreen} style={styles.categoriesScreen}/>
      <Stack.Screen name="Productos" component={ProductsScreen} />
      <Stack.Screen name="Producto" component={ProductScreen} />
    </Stack.Navigator>
  );
}

export default ShopStackNavigator

const styles = StyleSheet.create({
    categoriesScreen: {
        gap: 16,                     
        padding: 16,
        justifyContent: "center",
        alignItems: "center"
    }
})
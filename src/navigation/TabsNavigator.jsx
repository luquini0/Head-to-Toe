import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartStackNavigator from './CartStackNavigator';
import ShopStackNavigator from './ShopStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Shop'
      screenOptions={{
        headerShown:false,
        tabBarStyle:styles.tabBar,
        tabBarShowLabel:false
      }}
    >
      <Tab.Screen 
        name="Shop" 
        component={ShopStackNavigator}
        options={{
          tabBarIcon: ({focused})=>
            <Ionicons 
                name="storefront-outline" 
                size={24}
                color={focused?colors.darkGray:colors.mediumGray} 
            />
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={CartStackNavigator} 
        options={{
          tabBarIcon: ({focused})=>
            <Ionicons 
                name="cart-outline" 
                size={24}
                color={focused?colors.darkGray:colors.mediumGray} 
            />
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStackNavigator} 
        options={{
          tabBarIcon: ({focused})=>
            <Ionicons 
                name="person-outline" 
                size={24}
                color={focused?colors.darkGray:colors.mediumGray} 
            />
        }} 
      />
    </Tab.Navigator>
  )
}

export default TabsNavigator

const styles = StyleSheet.create({
  tabBar:{
    height:100,
    //backgroundColor:"red"
  }
})
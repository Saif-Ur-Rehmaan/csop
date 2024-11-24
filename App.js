import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from 'expo-status-bar';

//pages
import LandingPage from './components/BeforeLoginScreens/LandingPage';
import LoginComponent from './components/BeforeLoginScreens/loginComponent';
import RegisterComponent from './components/BeforeLoginScreens/RegisterComponent';
import ForgotPassComponent from './components/BeforeLoginScreens/ForgetPassComponent';
import DigitCodeComponent from './components/BeforeLoginScreens/DigitCodeComponent';
import ChangePasswordComponent from './components/BeforeLoginScreens/ChangePassword';
import BottomTabComponent from './components/BottomTabComponent';

//store
import { Provider, useSelector, } from 'react-redux'
import { store } from './context/store';
import SingleItemComponent from './components/SingleItemComponent';
import CartModalComponent from './components/CART/CartModalComponent';
import CheckoutModalComponent from './components/CheckoutModalComponent';
import OrderProgressComponent from './components/OrderProgressComponent';
const Stack = createStackNavigator();

export default function App() {


  return (
    <Provider store={store}>
      <StackComponent />
    </Provider>

  );
}

const StackComponent = () => {

  const { Data } = useSelector(state => state.auth); // Access state.auth 

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      <Stack.Navigator>
        {
          !Data ?

            <Stack.Group>
              <Stack.Screen name="Landing" options={{ headerShown: false }} component={LandingPage} />
              <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginComponent} />
              <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterComponent} />
              <Stack.Screen name="ForgotPass" options={{ headerShown: false }} component={ForgotPassComponent} />
              <Stack.Screen name="DigitCode" options={{ headerShown: false }} component={DigitCodeComponent} />
              <Stack.Screen name="ChangePassword" options={{ headerShown: false }} component={ChangePasswordComponent} />
            </Stack.Group>
            :
            <Stack.Group>
              <Stack.Screen name="Home" options={{ headerShown: false }} component={BottomTabComponent} />


              <Stack.Screen name="SingleProduct" options={{ headerShown: false, presentation: "modal" }} component={SingleItemComponent} />
              <Stack.Screen name="CartModal" options={{ headerShown: false, presentation: "modal" }} component={CartModalComponent} />
              <Stack.Screen name="CheckoutModal" options={{ headerShown: false, presentation: "modal" }} component={CheckoutModalComponent} />
              <Stack.Screen name="OrderProgressModal" options={{ headerShown: false, presentation: "modal" }} component={OrderProgressComponent} />




            </Stack.Group>
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}






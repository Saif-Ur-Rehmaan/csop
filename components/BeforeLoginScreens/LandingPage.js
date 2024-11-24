
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, TouchableOpacity, Text, View, Dimensions, Button, ActivityIndicator, Animated, ImageBackground } from 'react-native';

const { width, height } = Dimensions.get('window');







const st = StyleSheet.create({
  root: {
    height: "100%",
    padding: "10%",
    paddingVertical: height * 0.15,
    alignItems: "center",
    gap: height * 0.1,

  },
  BgImg: {
    width: width,
    height: "100%",
    resizeMode: 'cover',
    position: "absolute"
  },
  heading: {
    fontSize: width * 0.12,
    color: "white",
    textAlign: "center",
    fontWeight: "bold"
  },
  ButtonContainer: {
    gap: height * 0.02,
    justifyContent: 'center',
    alignItems: "center"
  },
  Button: {
    fontSize: width * 0.055,
    color: "white",
    fontWeight: "bold"
  }

})



const LandingPage = (props) => {

  return (

    <View >
      <StatusBar style='light' />
      <Image style={st.BgImg} source={require("../../assets/background_Login.jpg")} />
      <View style={st.root}>
        <Text style={st.heading}>Ready To Elevate Your Coffee</Text>
        <View style={st.ButtonContainer}>
          <TouchableOpacity onPress={() => props.navigation.navigate("Register")}>
            <Text style={st.Button}>Create An Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
            <Text style={st.Button}>Login</Text>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  );
}







export default LandingPage;
import { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Modal, } from 'react-native';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height,
    resizeMode: 'cover',
    position: 'absolute',
  },
  Container: {
    flex: 1,
    width: width,
    height: height,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  section1: {
    flex: 1,
    justifyContent: 'center'
  },
  Sec1_Container: {
    width: width,
    height: '70%',
    gap: 60
  },
  Textinp: { flex: 1, fontSize: 18, fontWeight: "bold", color: "white" },
  button: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white', // Color of the border
    paddingHorizontal: 45,
    paddingVertical: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white', // Text color
    fontSize: 20,
    fontWeight: '800',
  }
  ,
  section2: {
    paddingBottom: 20,
    justifyContent: "flex-end",
    textAlignVertical: "bottom"
  },
  Sec2_Text: { fontSize: 20, color: "white", textAlign: "center" },
  border: {
    height: 2,
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  orText: {
    marginHorizontal: 10,
    color: 'white',
  },
  IconContainer: {
    width: 50, // Adjust the size as needed
    height: 50, // Adjust the size as needed
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Half of width and height to make it a circle
    borderWidth: 1,
    borderColor: 'white',
  },
});
const ModelStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }, text: {
    color: 'white', // Text color
    fontSize: 20,
    fontWeight: '800',
  }
});
const st = StyleSheet.create({
  root: {
    height: "100%",
    // backgroundColor:"red",
    padding: "10%",
    paddingVertical: height * 0.15,
    alignItems: "center",
    gap: height * 0.07,

  },
  BgImg: {
    width: width,
    height: "100%",
    resizeMode: 'cover',
    position: "absolute"
  },
  heading: {
    fontSize: width * 0.1,
    color: "white",
    width: "100%",
    textAlign: "right",
    fontWeight: "bold"
  },
  Main: { alignItems: 'center', width: width }
  , SecStyle1: { marginBottom: 30, width: "80%", flexDirection: "row", borderColor: "white", borderBottomWidth: 1, justifyContent: "center", alignItems: "center", gap: 10 }
});


export default function ChangePassword(props) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Initially set to false
  const [ConfirmPass, setConfirmPass] = useState("");
  const [Password, setPassword] = useState("");
  const { Email } = props.route.params;
  const Continue = async () => {
    if (!ConfirmPass || !Password) {
      setError("All Fields Are Required");
      setLoading(false)
      return
    }
    if (Password !== ConfirmPass) {
      setError("Password and Confirm Password do not match.");
      setLoading(false); // Hide loader
      return;
    }
    const userData = {
      "User_Email": Email,
      "User_Password": Password
    };
    try {
      setLoading(true)
      const response = await fetch("http://assignment.optikl.ink/api/users/ChangePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();

      let status = data.status;
      setLoading(false)
      switch (status) {
        case '1':
          props.navigation.navigate("Login");
          setLoading(false);
          break;
        case '3':
          setError(`Failed: ${data.message}`);
          setLoading(false);
          break;
        case '0':
          setError(`Unexpected error From Server ${data.error}`);
          setLoading(false);
          break;
        default:
          setError(`Unexpected error ${data}`);
          setLoading(false);
          break;
      }

    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to register user. Please try again later.");
    }



  };

  return (

    <View style={{}}>
      <Image style={st.BgImg} source={require("../../assets/background_Login.jpg")} />
      <View style={st.root}>
        <Text style={st.heading}>Change Password</Text>
        <View style={st.Main}>

          <View style={st.SecStyle1}>
            <Image style={{ maxWidth: "20%", justifyContent: "center", alignItems: "center" }} source={require("../../assets/icons/Password.png")} />
            <TextInput
              onChangeText={setPassword}
              style={styles.Textinp}
              placeholder='Password'
              placeholderTextColor={"white"}


            />

          </View>
          <View style={st.SecStyle1}>
            <Image style={{ maxWidth: "20%", justifyContent: "center", alignItems: "center" }} source={require("../../assets/icons/Password.png")} />
            <TextInput
              onChangeText={setConfirmPass}
              style={styles.Textinp}
              placeholder='Confirm Password'
              placeholderTextColor={"white"}


            />

          </View>
          <View style={{ gap: 20, marginBottom: 10 }}>
            <TouchableOpacity style={[styles.button]} onPress={Continue}>
              <Text style={[styles.text]}>Continue</Text>
            </TouchableOpacity>

          </View>


        </View>
      </View>

      {
        loading && (
          <View style={ModelStyle.loaderContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )
      }

      {/* Modal for displaying error messages */}
      <Modal
        visible={error !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setError(null)}
      >
        <View style={ModelStyle.modalContainer}>
          <View style={ModelStyle.modalContent}>
            <Text style={ModelStyle.modalText}>{error}</Text>
            <TouchableOpacity onPress={() => setError(null)}>
              <Text style={[ModelStyle.text, { color: 'blue', marginTop: 10 }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
} 
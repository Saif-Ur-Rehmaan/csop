import { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Modal, } from 'react-native';
import { useDispatch } from 'react-redux';
import { Login } from '../../context/Features/User/AuthSlice';

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
    Textinp: { flex: 1, fontSize: 18, fontWeight: "400", color: "white" },
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

const LoginComponent = (props) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Initially set to false
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const dispatch = useDispatch();

    const LoginUser = async () => {
        setLoading(true)
        if (!Email || !Password) {
            setError("All Fields Are Required");
            setLoading(false)
            return
        }
        const userData = {
            "User_Email": Email,
            "User_Password": Password
        };
        try {
            dispatch(Login(userData));

            //loading setting too fast  thats why loading not showing
            setLoading(false)



        } catch (error) {
            setLoading(false)
            setError(error);//this line shows User Authenticated Successfully when login success
            console.error("🚀 ~ LoginUser ~ error:", error)

        }



    };
    const LoginUserWithGoogle = () => { console.warn("google Login") };
    const LoginUserWithFb = () => { console.warn("Facebook Login") };

    return (

        <View>
            <Image style={st.BgImg} source={require("../../assets/background_Login.jpg")} />
            <View style={st.root}>
                <Text style={st.heading}>Sign In</Text>
                <View style={st.Main}>
                    <View style={st.SecStyle1}>
                        <Image style={{ maxWidth: "20%" }} source={require("../../assets/icons/Email.png")} />
                        <TextInput
                            onChangeText={setEmail}
                            style={styles.Textinp}
                            placeholder='Email/Phone'
                            placeholderTextColor={"white"}

                        />

                    </View>
                    <View style={st.SecStyle1}>
                        <Image style={{ maxWidth: "20%", justifyContent: "center", alignItems: "center" }} source={require("../../assets/icons/Password.png")} />
                        <TextInput
                            onChangeText={setPassword}
                            style={styles.Textinp}
                            placeholder='Password'
                            placeholderTextColor={"white"}


                        />

                    </View>
                    <View style={{ gap: 20, marginBottom: 10 }}>
                        <TouchableOpacity style={[styles.button]} onPress={() => { setLoading(true); LoginUser() }}>
                            <Text style={[styles.text]}>Sign Up</Text>
                        </TouchableOpacity>
                        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", opacity: 0.7, textAlign: "center" }} onPress={() => props.navigation.navigate('ForgotPass')}>Forgot Password?
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '80%', alignItems: 'center' }}>
                        <View style={[styles.border, { flex: 1 }]} />
                        <Text style={styles.orText}>OR</Text>
                        <View style={[styles.border, { flex: 1 }]} />
                    </View>
                    <View style={{ width: "80%", flexDirection: "row", gap: 0, justifyContent: 'center', marginTop: 10 }}>
                        <TouchableOpacity onPress={LoginUserWithGoogle} style={[styles.IconContainer]}>

                            <Image source={require("../../assets/icons/Google.png")} />

                        </TouchableOpacity>

                        <TouchableOpacity onPress={LoginUserWithFb} style={[styles.IconContainer]}>
                            <Image source={require("../../assets/icons/Facebook.png")} />
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

export default LoginComponent;

import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ImageBackground, Modal, ActivityIndicator, KeyboardAvoidingView, Button, Platform, StatusBar } from 'react-native';


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    backgroundImage: {
        width: width,
        height: "100%",
        resizeMode: 'cover',
        position: 'absolute',
    },
    Textinp: { flex: 1, fontSize: 18, fontWeight: "bold", color: "white" },
    text: {
        color: 'white', // Text color
        fontSize: 20,
        fontWeight: '800',
    },
    button: {
        width: "80%",
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white', // Color of the border
        paddingHorizontal: 45,
        paddingVertical: 15,
        borderRadius: 100,
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
        height: height,
        padding: "10%",
        paddingVertical: height * 0.15,
        gap: height * 0.07,

    },
    BgImg: {
        width: width,
        height: "100%",
        resizeMode: 'cover',
        position: "absolute",
    },
    heading: {
        fontSize: width * 0.1,
        color: "white",
        width: "100%",
        textAlign: "right",
        fontWeight: "bold"
    },
    Main: {
        width: "100%",
        alignItems: "center",
        paddingVertical: "8%",

    },
    InpContainer: {
        flex: 1,
        gap: height * 0.03,


    },
    InnerInpContainer: {
        width: "100%",
        height: height * 0.065,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        padding: 8,
        borderBottomColor: "white",
        borderBottomWidth: 1,
        borderRadius: 10,
        // backgroundColor: "red",
        overflow: "hidden"
    },
    Inp: {
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        fontSize: 16,
        fontWeight: "400",
        color: "white",
    },
    SubmitBtnContainer: {
        width: "100%",
        minHeight: height * 0.07,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    BtnTxt: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        borderColor: "white",
        borderWidth: 1,
        width: "60%",
        textAlign: "center",
        textAlignVertical: "center",
        height: "100%",
        borderRadius: 50,
        marginTop: 35
    }
});
const InputField = ({ placeholder, imgSource, onChangeText }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginBottom: "5%", width: "80%", flexDirection: "row", borderColor: "white", borderBottomWidth: 1, justifyContent: "center", alignItems: "center", gap: 10 }}>
                <Image style={{ maxWidth: "20%" }} source={imgSource} />
                <TextInput
                    onChangeText={onChangeText}
                    style={styles.Textinp}
                    placeholder={placeholder}
                    placeholderTextColor="white"
                />
            </View>
        </View>
    );
}

const RegisterComponent = (props) => {
    const [FullName, setFullName] = useState("");
    const [UserName, setUserName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [DOB, setDOB] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPass, setConfirmPass] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Initially set to false


    const isValidDate = (dateString) => {
        const pattern = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;
        return pattern.test(dateString);
    };

    const validateEmail = (email) => {
        // Basic email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePhone = (phone) => {
        // Basic phone number validation regex pattern
        const phonePattern = /^\d{11}$/;
        return phonePattern.test(phone);
    };



    const registerUser = async () => {
        // Reset error state
        console.log('acau');
        
        setLoading(true);

        setError(null);

        // Validation checks
        // if (!FullName || !UserName || !Email || !Phone || !DOB || !Password || !ConfirmPass) {
        //     setError("All fields are required.");
        //     setLoading(false); // Hide loader
        //     return;
        // }

        // if (!isValidDate(DOB)) {
        //     setError("Date of Birth must be in the format mm-dd-yyyy.");
        //     setLoading(false); // Hide loader
        //     return;
        // }
        // if (!validateEmail(Email)) {
        //     setError("Invalid email address.");
        //     setLoading(false); // Hide loader
        //     return;
        // }
        // if (!validatePhone(Phone)) {
        //     setError("Invalid phone number format.");
        //     setLoading(false); // Hide loader
        //     return;
        // }
        // if (Password !== ConfirmPass) {
        //     setError("Password and Confirm Password do not match.");
        //     setLoading(false); // Hide loader
        //     return;
        // }
        const userData = {
            "User_FullName": FullName,
            "User_UserName": UserName,
            "User_Email": Email,
            "User_Phone": Phone,
            "User_DOB": DOB,
            "User_Password": Password
        };

       

        try {
            const response = await fetch("http://assignment.optikl.ink/api/users/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            let status = data.status;
            switch (status) {
                case '2':
                    setError("User Already Registered With That Email");
                    break;
                case '1':
                    props.navigation.navigate("Login");
                    break;
                case '0':
                case '3': // Assuming you meant to handle status 3 similar to status 0
                    setError(`Unexpected error From Server ${data.error}`);
                    break;
                default:
                    setError("Unexpected error");
                    break;
            }


        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to register user. Please try again later.");
        }

        setLoading(false); // Hide loader after request completes
    };

















    return (

        <View style={{ height: "100%" }}>

            <Image style={st.BgImg} source={require("../../assets/background_Login.jpg")} />
            <ScrollView style={st.root}>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : null} style={[st.Main, { gap: 20 }]}>
                    {/* inp */}
                    <View style={st.InnerInpContainer}>
                        <Image source={require("../../assets/icons/User.png")} />
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={[st.Inp]}
                                placeholder="Full Name"
                                onChangeText={setFullName}
                                placeholderTextColor="white"
                            />
                        </View>
                    </View>
                    {/* inp */}
                    <View style={st.InnerInpContainer}>
                        <Image source={require("../../assets/icons/User.png")} />
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={[st.Inp]}
                                placeholder="User Name"
                                onChangeText={setUserName}
                                placeholderTextColor="white"
                            />
                        </View>
                    </View>
                    {/* inp */}
                    <View style={st.InnerInpContainer}>
                        <Image source={require("../../assets/icons/Email.png")} />
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={[st.Inp]}
                                placeholder="example@gmail.com"
                                onChangeText={setEmail}
                                placeholderTextColor="white"
                            />
                        </View>
                    </View>
                    <View style={st.InnerInpContainer}>
                        <Image source={require("../../assets/icons/Email.png")} />
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={[st.Inp]}
                                placeholder="MM-DD-YYYY"
                                onChangeText={setDOB}
                                placeholderTextColor="white"
                            />
                        </View>
                    </View>
                    {/* inp */}
                    <View style={st.InnerInpContainer}>
                        <Image source={require("../../assets/icons/call.png")} />
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={[st.Inp]}
                                placeholder="03XXXXXXXXX"
                                onChangeText={setPhone}
                                placeholderTextColor="white"
                            />
                        </View>
                    </View>
                    {/* inp */}
                    <View style={st.InnerInpContainer}>
                        <Image source={require("../../assets/icons/Password.png")} />
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={[st.Inp]}
                                placeholder="Password"
                                onChangeText={setPassword}
                                placeholderTextColor="white"
                            />
                        </View>
                    </View>
                    {/* inp */}
                    <View style={st.InnerInpContainer}>
                        <Image source={require("../../assets/icons/Password.png")} />
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={[st.Inp]}
                                placeholder="Confirm Password"
                                onChangeText={setConfirmPass}
                                placeholderTextColor="white"
                            />
                        </View>
                    </View>


                    <TouchableOpacity
                        style={st.SubmitBtnContainer}
                        onPress={registerUser}
                    >
                        <Text style={st.BtnTxt}>Register
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>








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

export default RegisterComponent;

import { useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Button, VirtualizedList, TextInput, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    backgroundImage: {
        width: width,
        height: "100%",
        resizeMode: 'cover',
        position: 'absolute',
    },
    Textinp: {
        flex: 1,
        fontSize: 18,
        fontWeight: "400",
        color: "white"
    },
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
    Main: {
        flex: 1,
        paddingTop: "30%",
        justifyContent: "flex-start",
        alignItems: "center",

    },
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
    },

});

const ForgetPassComponent = (props) => {
    const [Email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Initially set to false
    const validateEmail = (email) => {
        // Basic email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };
    const ContinueToForgot = async () => {
        if (Email == "") {
            setError("Enter Email");
            setLoading(false);
            return;
        }
        if (!validateEmail(Email)) {
            setError("Invalid email address.");
            setLoading(false); // Hide loader
            return;
        }
        try {
            setLoading(true);
            const send = { 'User_Email': Email };
            const response = await fetch("http://assignment.optikl.ink/api/users/ForgotPass", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(send)
            });
            const data = await response.json();
            switch (data.status) {
                case '0':
                    setError(`Unexpected error From Server ${data.error}`)
                    setLoading(false)
                    break;
                case '1':
                    if (data.mail.success) {
                        props.navigation.navigate("DigitCode", { otp: data.otp, Email: data.data.User_Email })
                        setLoading(false)
                        return null;
                    } else {
                        setError("Not Able To Send Otp :( \n Try Again Later");
                        setLoading(false);
                    }

                    break;

                case '2':
                    setError(`Unexpected error From Server ${data.error}`)
                    setLoading(false)
                    break;
                case '3':
                    setError(`Failed ${data.error}`)
                    setLoading(false)
                    break;

                default:
                    setError(`Unexpected error :${data.error}`)
                    setLoading(false)
                    break;
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle error
        }
    }


    return (
        <View style={{ justifyContent: "flex-end", flex: 1 }}>
            <Image style={styles.backgroundImage} source={require("../../assets/background_Login.jpg")} />
            <View style={[styles.Main]}>
                <Text style={{ marginBottom: 80, fontSize: 30, fontWeight: "bold", textDecorationLine: "underline", color: "white" }}>Forgot Password</Text>
                <View style={{ width: "80%", flexDirection: "row", borderColor: "white", borderBottomWidth: 1, justifyContent: "center", alignItems: "center", gap: 10 }}>
                    <Image style={{ maxWidth: "20%" }} source={require("../../assets/icons/Email.png")} />
                    <TextInput
                        onChangeText={setEmail}
                        style={styles.Textinp}
                        placeholder='Email '
                        placeholderTextColor={"white"}
                    />
                </View>
                <View style={{ marginBottom: 10, marginTop: 50, justifyContent: "center", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => ContinueToForgot()} style={[styles.button]}>
                        <Text style={[styles.text]}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* Loader */}
            {loading && (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            )}

            {/* Modal for displaying error messages */}
            <Modal
                visible={error !== null}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setError(null)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>{error}</Text>
                        <TouchableOpacity onPress={() => setError(null)}>
                            <Text style={[styles.text, { color: 'blue', marginTop: 10 }]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
export default ForgetPassComponent;
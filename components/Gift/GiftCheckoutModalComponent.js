import { View, Text, StyleSheet, ImageBackground, Dimensions, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
const { width, height } = Dimensions.get('window');

const st = StyleSheet.create({
    inpDIv: {
        width: width,
        paddingHorizontal: width * 0.07,

    },
    input: {
        borderColor: "white",
        borderWidth: 1.5,
        paddingHorizontal: width * 0.05,
        borderRadius: 10,
        fontSize: width * 0.05,
        paddingVertical: 8,
        color: "white"
    }
})




const GiftCheckoutModalComponent = (props) => {
    const [giftAmount, setGiftAmount] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [recipientEmail, setRecipientEmail] = useState('');
    const [message, setMessage] = useState('');
    const [senderName, setSenderName] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const sendGift = () => {
        // Validate input fields
        if (!giftAmount || !recipientName || !recipientEmail || !senderName || !senderEmail) {
            alert('Error: Please fill in all required fields');
            return;
        }

        // Here, you can send the gift data to your backend or perform any necessary actions
        console.log('Sending gift with the following details:');
        console.log('Gift Amount:', giftAmount);
        console.log('Recipient Name:', recipientName);
        console.log('Recipient Email:', recipientEmail);
        console.log('Message:', message);
        console.log('Sender Name:', senderName);
        console.log('Sender Email:', senderEmail);

        // Optionally, you can reset the input fields after sending the gift
        setGiftAmount('');
        setRecipientName('');
        setRecipientEmail('');
        setMessage('');
        setSenderName('');
        setSenderEmail('');

        // Display a success message or navigate to another screen
        alert('Success', 'Gift sent successfully');
    };
    return (
        <View style={{}}>
            <ImageBackground
                style={{ width: "100%", height: height, transform: [{ translateY: -20 }], paddingTop: height * 0.06, alignItems: "center" }}
                source={require("../../assets/background_Login.jpg")}
            >
                <View style={{ gap: height * 0.03 }}>

                    <View style={st.inpDIv}>
                        <TextInput
                            placeholder='*Select gift amount'
                            placeholderTextColor='white'
                            style={st.input}
                            keyboardType='number-pad'
                            value={giftAmount}
                            onChangeText={setGiftAmount}
                        />
                    </View>
                    <View style={st.inpDIv}>
                        <TextInput
                            placeholder='*Recipient Name'
                            placeholderTextColor='white'
                            style={st.input}
                            value={recipientName}
                            onChangeText={setRecipientName}
                        />
                    </View>
                    <View style={st.inpDIv}>
                        <TextInput
                            placeholder='*Recipient Email'
                            placeholderTextColor='white'
                            style={st.input}
                            value={recipientEmail}
                            onChangeText={setRecipientEmail}
                        />
                    </View>
                    <View style={st.inpDIv}>
                        <TextInput
                            placeholder='*Message (OPTIONAL)'
                            placeholderTextColor='white'
                            style={st.input}
                            value={message}
                            onChangeText={setMessage}
                        />
                    </View>
                    <View style={st.inpDIv}>
                        <TextInput
                            placeholder='*Sender Name'
                            placeholderTextColor='white'
                            style={st.input}
                            value={senderName}
                            onChangeText={setSenderName}
                        />
                    </View>
                    <View style={st.inpDIv}>
                        <TextInput
                            placeholder='*Sender Email'
                            placeholderTextColor='white'
                            style={st.input}
                            value={senderEmail}
                            onChangeText={setSenderEmail}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => { sendGift() }} style={{ marginTop: height * 0.2, }}>
                    <Text style={{ color: "white", borderWidth: 1, borderColor: "white", paddingVertical: 20, paddingHorizontal: 70, borderRadius: 35 }}>$10 Checkout</Text>
                </TouchableOpacity>
            </ImageBackground>


        </View>
    )
}

export default GiftCheckoutModalComponent
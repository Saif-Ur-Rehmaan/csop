import React, { useState, useRef } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Modal } from 'react-native';
const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
  },
  button: {
    width: '80%',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 45,
    paddingVertical: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '30%',
    gap: 10
  },
  inputBox: {
    width: 38,
    height: 38,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 3,
    textAlign: 'center',
    color: 'white',
    marginHorizontal: 5,
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
const DigitCodeComponent = (props) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleInputChange = (value, index) => {
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const Continue = () => {
    setLoading(true);
    const otpEnter = digits.join('');
    const { otp, Email } = props.route.params;
    if (otp === undefined) {
      props.navigation.navigate("ForgotPass");
      setLoading(false);
      return;
    } else {
      if (otp === otpEnter) {
        props.navigation.navigate("ChangePassword", { Email: Email });
        setLoading(false);
        return;
      } else {
        setError("Invalid OTP");
        setLoading(false);
        return;
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.backgroundImage} source={require('../../assets/background_Login.jpg')} />
      <View style={styles.main}>
        <Text style={{ marginBottom: 30, fontSize: 30, fontWeight: 'bold', textDecorationLine: 'underline', color: 'white' }}>Enter 6 Digit Code</Text>
        <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center' }}>
          {digits.map((digit, index) => (
            <TextInput
              ref={(ref) => (inputRefs.current[index] = ref)}
              key={index}
              style={styles.inputBox}
              placeholder="__"
              placeholderTextColor="white"
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(value) => handleInputChange(value, index)}
            />
          ))}
        </View>
        <TouchableOpacity onPress={Continue} style={styles.button}>
          <Text style={styles.text}>Continue</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}

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
  );
};

export default DigitCodeComponent;

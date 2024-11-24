import { useSelector } from 'react-redux';
import { StatusBar, TouchableOpacity, View, Text, ScrollView, StyleSheet, Dimensions, Image, TextInput, } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
const { width, height } = Dimensions.get('window');
const st = StyleSheet.create({
    root: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    ScrollView: {
        width: "100%",
        height: "100%",

    },
    container: {
        backgroundColor: "#EAF0F5",
        width: "100%",
        height: "100vh",
        borderTopLeftRadius: width * 0.1,
        borderTopRightRadius: width * 0.1,
        paddingHorizontal: width * 0.08,
        paddingVertical: width * 0.04,
        alignItems: "center",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        // marginBottom: 20
    },
    S1: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: height * 0.0285
    },
    S2: {
        width: "98%",
        height: 8,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        // alignItems: "center"
    },
    ProgressBar: {
        backgroundColor: "black",
        height: "100%",
        width: "50%"
    },
    CheckPoint: {
        position: "absolute",
        width: 21,
        height: 21,
        backgroundColor: "black",
        borderRadius: width * 2,
        color: "white",
        textAlign: "center",
        textAlignVertical: "center"
    },
    CheckPointText: {
        position: "absolute",
        bottom: -22,
        borderRadius: width * 2,
        textAlign: "center",
        textAlignVertical: "center",
        fontWeight: "900",
        fontSize: width * 0.025,
        color: "black",
    },
    S3: {
        width: "70%",
        borderTopColor: "black",
        borderTopWidth: 1,
        borderBottomColor: "black",
        borderBottomWidth: .5,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        marginTop: height * 0.055,//35,
        marginBottom: 0
    },
    pickupTimeHeading: {
        fontSize: width * 0.04,
        fontWeight: "900"
    },
    EstimatedTime: {
        textAlign: "center",
        fontSize: width * 0.04,

    },
    Container2: {
        width: width,
        backgroundColor: "#EAF0F5",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10
    },
    card: {
        width: width * 0.9,
        height: height * 0.1, //70,
        backgroundColor: "white",
        flexDirection: "row",
        paddingHorizontal: width * 0.03,// 15,
        borderRadius: 10,
        elevation: 5,
        alignSelf: "center",
        marginBottom: 10

    },
    CardSectionImg: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center",
    },
    ItmImg: {
        width: width * 0.16,
        height: width * 0.16,
        borderRadius: 10,
        resizeMode: "contain"
    },
    CardSectionText: {
        flex: 4,
        justifyContent: "center",
        gap: height * 0.002//10
    },
    ItmTitle: {
        fontSize: width * 0.045,//17,
        fontWeight: "600",
    },
    ItmSubTitle: {
        paddingHorizontal: 10,

        fontSize: width * 0.02,//8,
        color: "gray",
        textDecorationLine: "underline"
    },
    SizeText: {
        fontSize: width * 0.032,
        // textDecorationLine: "underline"
    },
    AddMore: {
        paddingHorizontal: 10,
        fontSize: width * 0.032,
        textDecorationLine: "underline"
    },
    CardSectionPrice: {
        flex: 1.5,
        justifyContent: "center",
        alignItems: "center"
    },
    PriceText: {
        fontSize: width * 0.05//17,
        , fontWeight: "500"

    },
    Container3: {
        width: width,
        backgroundColor: "#EAF0F5",
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    options: {
        width: "90%",
        minHeight: height * 0.05, // 35,
        backgroundColor: "white",
        flexDirection: "row",
        borderRadius: 10,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        gap: width * 0.03
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        gap: 5,

    },
    radioLabel: {
        marginLeft: 8,
        fontSize: width * 0.05,
        fontWeight: "500"
    },
    popularText: {
        width: "100%",
        paddingHorizontal: 20,
        fontSize: width * 0.05,
        fontWeight: "700",
        alignSelf: "flex-start",

    },
    PopInnerText: {
        fontSize: width * 0.035
    },
    PopCardDiv: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: width * 0.04,
        paddingVertical: 10
    },
    CardPopular: {
        width: width * 0.2,//70,
        height: width * 0.25,//90,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        elevation: 10,
        borderRadius: 8
    },
    billTextContainer: {
        width: "100%",
        paddingHorizontal: 20,
        justifyContent: 'space-between',

        flexDirection: "row",
        paddingTop: 15
    },
    billText: {
        fontSize: width * 0.05,
        fontWeight: "500"
    },
    AddToCart: {
        position: "absolute",
        bottom: 20,
        right: 0,
        width: width,
        alignItems: "flex-end"

    },
    GoToCheckOut: {
        width: width * 0.9,
        alignSelf: "center",
        paddingHorizontal: 20,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#2B2B2A",
        margin: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    ViewCartText: {
        fontWeight: "500",
        fontSize: width * 0.05,
        color: "white",
        textAlign: "center",
        textAlignVertical: "center",
    },
})
const RadioButton = ({ label, checked, onPress }) => {
    return (
        <TouchableOpacity style={st.radioButton} onPress={onPress}>
            <Text style={st.radioLabel}>{label}</Text>
            <Icon
                name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color={checked ? 'blue' : 'gray'}
            />
        </TouchableOpacity>
    );
};




export default function CartModalComponent(props) {
    const ItemInCart = useSelector(s => s.auth.Cart);
    const [tip, setTip] = useState(0)
    const Tip = tip ? tip : 0;
    const [EstimatedTime, setEstimatedTime] = useState("(10 - 15 min)")
    const [selectedOption, setSelectedOption] = useState("Pickup");

    const Subtotal = ItemInCart.reduce((totalPrice, cartItem) => {
        // Extracting item price and extra price from cartItem
        const itemPrice = parseFloat(cartItem.Item.Item.Item_Price);
        const extraPrice = parseFloat(cartItem.Size.IS_ExtraPrice);
        const WhatsIncludedPrice = cartItem.WhatsIncluded.reduce((p, e) => {
            p += parseFloat(e.Price);
            return p;
        }, 0);
        // Adding item price and extra price to the total price
        return totalPrice + itemPrice + extraPrice + WhatsIncludedPrice;
    }, 0).toFixed(2);
    const Vattotal = ItemInCart.reduce((totalPrice, cartItem) => {
        const itemPrice = parseFloat(cartItem.Item.Item.Item_Vat);
        return totalPrice + itemPrice;
    }, 0).toFixed(2);


    const totalPrice = (parseFloat(Subtotal) + parseFloat(Vattotal) + parseFloat(Tip)).toFixed(2);
    const handleRadioPress = (option) => {
        setSelectedOption(option);
    };
    const RedirectToCheckoutModal = () => {
        const obj = {
            Type: selectedOption,
            EstimatedTime,
            Item: ItemInCart,
            Subtotal,
            Vattotal,
            Tip,
            totalPrice
        }

        props.navigation.navigate("CheckoutModal", obj);
    }

    return (

        <View style={[st.root, { marginTop: StatusBar.currentHeight }]}>
            <ScrollView style={st.ScrollView} >


                <StatusBar barStyle='light-content' backgroundColor={"black"} />
                <View style={{ backgroundColor: "black", }}>

                    <View style={st.container}>
                        <View style={st.S1}>
                            <Text style={{ fontSize: 30, fontWeight: "500" }}>CART</Text>
                            <Text onPress={() => props.navigation.goBack()} style={{ fontSize: 30, fontWeight: "500" }}>X</Text>
                        </View>
                        <View style={st.S2}>

                            <View style={[st.ProgressBar]}></View>

                            <Text style={[st.CheckPoint, { left: -10, }]}>1</Text>
                            <Text style={[st.CheckPointText, { left: -10, }]}>MENU</Text>

                            <Text style={[st.CheckPoint, { alignSelf: "center" }]}>2</Text>
                            <Text style={[st.CheckPointText, { alignSelf: "center" }]}>CART</Text>

                            <Text style={[st.CheckPoint, { right: -10 }]}>3</Text>
                            <Text style={[st.CheckPointText, { right: -25 }]}>CHECKOUT</Text>

                        </View>
                        <View style={st.S3}>
                            <Text style={st.pickupTimeHeading}>Estimated {selectedOption == "Pickup" ? "Pickup" : "Dine In"} Time</Text>
                            <TextInput
                                placeholder={EstimatedTime}
                                style={st.EstimatedTime}
                                onChangeText={setEstimatedTime}
                            />
                        </View>
                    </View>
                </View>
                <View style={st.Container2}>
                    <ScrollView style={{ width: "100%", maxHeight: height * 0.11 }} nestedScrollEnabled={true} >
                        {
                            ItemInCart.map((e, i) => (
                                <View key={i} style={st.card}>
                                    <View style={st.CardSectionImg}>
                                        <Image style={st.ItmImg} source={{ uri: e.Item.Item.Item_Image }} />
                                    </View>
                                    <View style={st.CardSectionText}>
                                        <View style={{ flexDirection: "row", paddingHorizontal: 10, alignItems: "center" }}>
                                            <Text style={st.ItmTitle}>{e.Item.Item.Item_Title}</Text>
                                            <Text style={st.SizeText}> ({e.Size.IS_Title}) </Text>

                                        </View>
                                        <Text style={st.ItmSubTitle}>{e.Item.Item.Item_SubTitle}</Text>
                                        <Text style={st.AddMore}>Add more items</Text>
                                    </View>
                                    <View style={st.CardSectionPrice}>
                                        <Text style={st.PriceText}>{
                                            (parseFloat(e.Item.Item.Item_Price) +
                                                parseFloat(e.Size.IS_ExtraPrice) +
                                                parseFloat(e.WhatsIncluded.reduce((p, e) => {
                                                    p += parseFloat(e.Price);
                                                    return p;
                                                }, 0))).toFixed(2)

                                        }$</Text>

                                    </View>
                                </View>
                            ))
                        }

                    </ScrollView>

                </View>
                <View style={st.Container3}>
                    <View style={st.options}>

                        <RadioButton
                            label="Pickup"
                            checked={selectedOption === "Pickup"}
                            onPress={() => handleRadioPress('Pickup')}
                        />
                        <RadioButton
                            label="Dine In"
                            checked={selectedOption === "Dine In"}
                            onPress={() => handleRadioPress('Dine In')}
                        />



                    </View>
                </View>
                <View style={st.Container3}>
                    <View style={{
                        width: "100%",
                        borderBottomWidth: 0.5,
                        borderBlockColor: "black",
                    }}>

                        <Text style={st.popularText}>Popular With Your Order</Text>
                    </View>
                    <View style={st.PopCardDiv}>

                        <View style={st.CardPopular}>
                            <Image style={{ width: "90%", borderRadius: 15, height: "80%", resizeMode: "stretch" }} source={{ uri: "https://picsum.photos/200" }} />

                            <View style={{ width: "100%", paddingHorizontal: 7, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={st.PopInnerText}>Latte</Text>
                                <Text style={st.PopInnerText}>3$</Text>

                            </View>
                        </View>
                        <View style={st.CardPopular}>
                            <Image style={{ width: "90%", borderRadius: 15, height: "80%", resizeMode: "stretch" }} source={{ uri: "https://picsum.photos/200" }} />

                            <View style={{ width: "100%", paddingHorizontal: 7, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={st.PopInnerText}>Latte</Text>
                                <Text style={st.PopInnerText}>3$</Text>

                            </View>
                        </View>
                        <View style={st.CardPopular}>
                            <Image style={{ width: "90%", borderRadius: 15, height: "80%", resizeMode: "stretch" }} source={{ uri: "https://picsum.photos/200" }} />

                            <View style={{ width: "100%", paddingHorizontal: 7, flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={st.PopInnerText}>Latte</Text>
                                <Text style={st.PopInnerText}>3$</Text>

                            </View>
                        </View>


                    </View>
                </View>
                <View style={[st.Container3, {
                    backgroundColor: "white", flex: 1, justifyContent: "start",
                    alignItems: "center",
                    paddingBottom: 100
                }]}>
                    <View style={st.billTextContainer}>
                        <Text style={st.billText}>Subtotal</Text>
                        <Text style={st.billText}>${Subtotal}</Text>
                    </View>
                    <View style={st.billTextContainer}>
                        <Text style={st.billText}>Vat</Text>
                        <Text style={st.billText}>${Vattotal}</Text>
                    </View>
                    <View style={[st.billTextContainer, {
                        borderBottomWidth: 0.5,
                        borderBottomColor: "black",
                    }]}>
                        <Text style={st.billText}>Tip</Text>
                        <View style={{ flexDirection: "row", gap: 2 }}>

                            <Text style={st.billText}>$</Text>
                            <TextInput
                                style={[st.billText, {
                                    borderColor: "black",
                                    borderWidth: 1,
                                    width: width * 0.08,
                                    borderRadius: 5,
                                    textAlign: "center", marginBottom: 3,
                                    backgroundColor: "white"
                                }]}
                                keyboardType='number-pad'
                                onChangeText={setTip}

                            />
                        </View>
                    </View>
                    <View style={st.billTextContainer}>
                        <Text style={st.billText}>Total</Text>
                        <Text style={st.billText}>${totalPrice}</Text>
                    </View>
                </View>


            </ScrollView>
            <TouchableOpacity style={[st.AddToCart,]} onPress={() => RedirectToCheckoutModal()}>
                <View style={st.GoToCheckOut}>
                    <Text style={[st.ViewCartText]}  >Confirm Payment & Store Location</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

}
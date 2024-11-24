import { useSelector, useDispatch } from 'react-redux';
import { StatusBar, TouchableOpacity, View, Text, ScrollView, StyleSheet, Dimensions, Image, TextInput, } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useState } from 'react';
import { CommonActions } from '@react-navigation/native';
import MapView, { MapMarker } from 'react-native-maps';
import { OrderNow, clearCart } from '../context/Features/User/AuthSlice';
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

        // backgroundColor: "#EAF0F5",
    },
    container: {
        backgroundColor: "#EAF0F5",
        width: "100%",
        height: height * 0.14,
        borderTopLeftRadius: width * 0.1,
        borderTopRightRadius: width * 0.1,
        paddingHorizontal: width * 0.08,
        paddingVertical: width * 0.04,
        alignItems: "center",
        paddingBottom: 25
    },
    S1: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: height * 0.02
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
        width: "100%"
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
    Container3: {
        width: width,
        backgroundColor: "white",
        paddingVertical: 10,
        paddingBottom: 100,
    },
    billTextContainer: {
        width: "100%",
        paddingHorizontal: 25,
        justifyContent: 'space-between',
        flexDirection: "row",
        paddingTop: 7,
        borderBottomWidth: 0.5,
        borderBottomColor: "black",
    },
    billText: {
        fontSize: width * 0.05,
        fontWeight: "500"
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
    ContainerShadow: {
        width: "92%",
        elevation: 8,
        borderRadius: 20,
        backgroundColor: "white",
        alignSelf: "center",
        alignItems: "center",
        marginVertical: height * 0.012,
    },
    Main: {
        width: "100%",
        paddingVertical: 10,
        backgroundColor: "#EAF0F5",

    },
    map: {
        width: "90%",
        height: height * 0.15,
        borderRadius: 20,
        overflow: "hidden"
    },
    PickupAt: {
        width: "100%",
        minHeight: 58,
        // backgroundColor: "#2B2B2A",
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row"
    },
    PickupText: {
        fontWeight: "bold",
        paddingHorizontal: 10
    },
    PaymentMethodHeading: {
        paddingHorizontal: 25,
        paddingBottom: 5,
        borderBottomColor: "black",
        borderBottomWidth: .5,
        width: "100%",
        fontSize: width * 0.055,
        fontWeight: "900"
    },
    PaymentMethodRow: {
        paddingHorizontal: 25,
        borderBottomColor: "black",
        borderBottomWidth: .5,
        width: "100%",
        fontSize: width * 0.055,
        fontWeight: "900",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 3
    },


})
const RadioButton = ({ label, checked, onPress }) => {
    return (
        <TouchableOpacity style={st.radioButton} onPress={onPress}>
            <Text style={st.radioLabel}>{label}</Text>
            <Icon
                name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color={checked ? 'black' : 'gray'}
            />
        </TouchableOpacity>
    );
};
const CheckoutModalComponent = (props) => {
    const ItemToCheckout = props.route.params;
    const [selectedOption, setSelectedOption] = useState("CIS");
    const [Loading, setLoading] = useState(false)

    const [PayStatus, setPayStatus] = useState("Not Paid")
    const { EstimatedTime, Item, Subtotal, Tip, Vattotal, Type, totalPrice } = ItemToCheckout;

    const UserId = useSelector(store => store.auth).Data.user.id;
    const dispatch = useDispatch();


    const Franchises = useSelector(store => store.AllFranchise);
    const SelectedStoreIndex = Franchises.SelectedStoreIndex;
    const SelectedStore = Franchises.Data[SelectedStoreIndex];
    const FrancAddress = SelectedStore.Address;
    const Francid = SelectedStore.id;
    const FrancRegion = {
        latitude: parseFloat(SelectedStore.Location.Latitude),
        latitudeDelta: parseFloat(SelectedStore.Location.LatitudeDelta),
        longitude: parseFloat(SelectedStore.Location.Longitude),
        longitudeDelta: parseFloat(SelectedStore.Location.LongitudeDelta)
    };
    const TypeHeading = Type == "Pickup" ? "Pickup At" : "Dine in At";

    //handle press event of order btn
    const RedirectToOrderProgressPage = (OrderNumber) => {
        setLoading(false);
        dispatch(clearCart());
        props.navigation.navigate("OrderProgressModal", { OrderNumber })
    }
    const PlaceOrder = async () => {
        if (selectedOption == "CIS") {
            setLoading(true)


            const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
            const OrderNumber = `${UserId}${randomDigits}`;
            const distributedTip = (parseFloat(Tip) / Item.length).toFixed(3)

            const ORDER_DATA = Item.map((itm, i) => {
                const ItemTotalPrice = (
                    parseFloat(itm.Item.Item.Item_Price) +
                    parseFloat(itm.Size.IS_ExtraPrice) +
                    parseFloat(itm.WhatsIncluded.reduce((p, e) => {
                        p += parseFloat(e.Price);
                        return p;
                    }, 0))
                ).toFixed(2);

                const response = {
                    UserId: UserId,
                    ItemId: itm.Item.Item.Item_Id,
                    SizeId: itm.Size.IS_Id,
                    FranchiseId: Francid,
                    PaymentType: selectedOption,
                    PaymentStatus: PayStatus,
                    quantity: itm.quantity,
                    ItmTotalPrice: ItemTotalPrice,
                    WhatsIncluded: { "data": itm.WhatsIncluded },
                    EstimatedTimeByUser: EstimatedTime,
                    Type,
                    Subtotal,
                    Tip: distributedTip,
                    Vattotal,
                    totalPrice,
                    OrderNumber
                }
                return response;
            })
            try {
                ORDER_DATA.forEach(async OrderItem => {
                    try {
                        const json = await fetch("http://assignment.optikl.ink/api/franchises/InsertOrder", {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(OrderItem)
                        });
                        const response = await json.json();
                        if (response.status != '1') {
                            console.error("🚀 ~ PlaceOrder ~ response:", response);
                        }
                    } catch (error) {
                        console.log("🚀 ~ PlaceOrder ~ error:", error)


                    }
                });
            } catch (error) {
                console.log("🚀 ~ PlaceOrder ~ error:", error);
            }
            RedirectToOrderProgressPage(OrderNumber);
            setLoading(false);



        } else if (selectedOption == "STP") {
            alert("Select payment type Cash In Store");
        } else if (selectedOption == "PWDACC") {
            alert("Select payment type Cash In Store");
        } else {
            alert("errrr...");
            console.log("🚀 ~ PlaceOrder ~ else:", "aaaaaaaaaaaaaaaaaaaaaaaaaaa")
        }


    }




    if (Loading) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
                <Text>Loading......</Text>
            </View>
        )
    }

    const handleRadioPress = (option) => {
        setSelectedOption(option);
    };
    return (

        <View style={[st.root, { marginTop: StatusBar.currentHeight }]}>
            <ScrollView style={st.ScrollView} >


                <StatusBar barStyle='light-content' backgroundColor={"black"} />
                <View style={{ backgroundColor: "black", }}>
                    <View style={st.container}>
                        <View style={st.S1}>
                            <Text style={{ fontSize: 30, fontWeight: "500" }}>CHECKOUT</Text>
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

                    </View>
                </View>
                <View style={st.Main}>
                    <View style={[st.ContainerShadow, { minHeight: height * 0.25, paddingVertical: 5, justifyContent: "center", overflow: "hidden" }]}>
                        <Text style={{ paddingHorizontal: 2, width: "88%", marginTop: 15, marginBottom: 8, fontSize: width * 0.055, fontWeight: "900" }}>Store Address</Text>
                        <View style={st.map}>
                            <MapView style={{ width: "100%", height: "100%" }} region={FrancRegion}>
                                <MapMarker
                                    coordinate={
                                        {
                                            latitude: parseFloat(FrancRegion.latitude),
                                            longitude: parseFloat(FrancRegion.longitude)
                                        }
                                    }

                                />
                            </MapView>
                        </View>
                        <View style={st.PickupAt}>
                            <View style={{ flex: 99 }}>
                                <Text style={[st.PickupText, { textTransform: "uppercase" }]}>{TypeHeading}</Text>
                                <Text style={st.PickupText} numberOfLines={1} ellipsizeMode='tail'>{FrancAddress}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={[st.ContainerShadow, { minHeight: height * 0.1, paddingVertical: 10, justifyContent: "center", overflow: "hidden" }]}>
                        <Text style={st.PaymentMethodHeading}>
                            Payment Methods
                        </Text>
                        <View style={st.PaymentMethodRow}>
                            <Text style={{ fontWeight: "bold" }}>Cash in Store</Text>
                            <RadioButton
                                label=""
                                checked={selectedOption === "CIS"}
                                onPress={() => handleRadioPress('CIS')}
                            />
                        </View>
                        <View style={st.PaymentMethodRow}>
                            <Text style={{ fontWeight: "bold" }}>Pay with Debit & Credit Card</Text>
                            <RadioButton
                                label=""
                                checked={selectedOption === "PWDACC"}
                                onPress={() => handleRadioPress('PWDACC')}
                            />
                        </View>
                        <View style={[st.PaymentMethodRow, { borderBottomWidth: 0 }]}>
                            <Text style={{ fontWeight: "bold" }}>Scan to Pay</Text>
                            <RadioButton
                                label=""
                                checked={selectedOption === "STP"}
                                onPress={() => handleRadioPress('STP')}
                            />

                        </View>
                    </View>

                </View>

                <View style={[st.Container3]}>
                    <Text style={[st.PaymentMethodHeading, { borderBottomWidth: 0 }]}>
                        Order Summery
                    </Text>
                    <View style={st.billTextContainer}>
                        <Text style={st.billText}>Subtotal</Text>
                        <Text style={st.billText}>${Subtotal}</Text>
                    </View>
                    <View style={st.billTextContainer}>
                        <Text style={st.billText}>Vat</Text>
                        <Text style={st.billText}>${Vattotal}</Text>
                    </View>
                    <View style={[st.billTextContainer,]}>
                        <Text style={st.billText}>Tip</Text>


                        <Text style={st.billText}>${Tip}</Text>

                    </View>
                    <View style={st.billTextContainer}>
                        <Text style={st.billText}>Total</Text>
                        <Text style={st.billText}>${totalPrice}</Text>
                    </View>
                </View>


            </ScrollView>
            <TouchableOpacity style={[st.AddToCart,]} onPress={() => PlaceOrder()}>
                <View style={st.GoToCheckOut}>
                    <Text style={[st.ViewCartText]}  >Place Order</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default CheckoutModalComponent
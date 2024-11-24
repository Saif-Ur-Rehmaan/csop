import { BackHandler, StatusBar, TouchableOpacity, View, Text, ScrollView, StyleSheet, Dimensions, Image, TextInput, } from 'react-native'

import React, { useEffect, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

const OrderProgressComponent = (props) => {
    const { OrderNumber } = props.route.params;
    const renderCount = useRef(0)
    // const OrderNumber = 29954;
    const [Data, setData] = useState(null)
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                props.navigation.navigate('HomeIndex');
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [props.navigation])
    );
    console.log();
    useEffect(() => {
        if (renderCount.current == 0) {

            const Initial = async () => {
                const json = await fetch("http://assignment.optikl.ink/api/franchises/GetOrderOfOrderNumber", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ OrderNumber })
                });
                const response = await json.json();
                setData(response);
                renderCount.current++;
            }
            Initial();
        } else {
            const interval = setInterval(async () => {
                console.log("abcd");
                const json = await fetch("http://assignment.optikl.ink/api/franchises/GetOrderOfOrderNumber", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ OrderNumber })
                });
                const response = await json.json();
                setData(response);

                // Check if progress is completed
                if (response.progress === "completed") {
                    clearInterval(interval); // Stop the interval if progress is completed
                }
                renderCount.current++;
            }, 5000); // Run every 1 minutes :1 * 60 * 1000

            return () => {
                console.log("clr");
                return clearInterval(interval)
            };
        }

    }, []);

    if (!Data) {
        return (
            <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                <Text>Loading....</Text>
            </View>
        )

    }

    const orderNumber = OrderNumber;

    const Orders = Data.data.Orders;
    const Franchise = Data.data.Franchise;

    const { Fran_Title } = Franchise;

    const Subtotal = Orders.reduce((total, order) => {
        total += parseFloat(order.Subtotal);
        return total;
    }, 0)
    const Vattotal = Orders.reduce((total, order) => {
        total += parseFloat(order.Vattotal);
        return total;
    }, 0)
    const TotalTip = Orders.reduce((total, order) => {
        total += parseFloat(order.DistributedTip);
        return total;
    }, 0);
    const EstimatedTime = Orders[0].EstimatedTimeByUser;

    const Total = parseFloat(Subtotal) + parseFloat(Vattotal) + parseFloat(TotalTip)
    const RedierctToHomePage = () => {
        props.navigation.navigate('HomeIndex');
    }
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
        innerContainer: {
            backgroundColor: "#EAF0F5",
            width: "100%",
            borderTopLeftRadius: width * 0.1,
            borderTopRightRadius: width * 0.1,
            paddingHorizontal: width * 0.06,
            paddingTop: width * 0.04,
            // paddingBottom: width * 0.03,
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
        },
        S1: {
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        S2: {
            width: "100%",
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
            paddingHorizontal: 20,
            paddingBottom: 0,
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
        Main: {
            width: "100%",
            paddingVertical: 10,
            // height: height * 0.4,
            paddingBottom: 20,
            backgroundColor: "#EAF0F5",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10

        },
        ProgressBar: {
            width: width * 0.2,
            backgroundColor: "#CDC7BA",
            height: 7,
            borderRadius: 20,
            overflow: "hidden"
        },
        progress: {
            height: "100%",
            backgroundColor: "#A28657",
            width: "50%"
        }


    })


    const counts = Orders.reduce((acc, order) => {
        acc[order.Status] = (acc[order.Status] || 0) + 1;
        return acc;
    }, {});

    // Extract the counts
    const numberOfOrders = Orders.length;
    const numberOfPending = (counts["pending"] / numberOfOrders) * 100 || 3;
    const numberOfCompleted = (counts["completed"] / numberOfOrders) * 100 || 0;
    const numberOfProcessing = (counts["processing"] / numberOfOrders) * 100 || 0;

    console.log(numberOfPending, numberOfProcessing, numberOfCompleted);


    // let progress = "pending";
    // let progress = "processing";
    let progress = "completed";

    if (numberOfPending >= 50) {
        progress = "pending";
    } else if (numberOfProcessing > 50) {
        progress = "processing";
    } else if (numberOfCompleted > 50) {
        progress = "completed";
    }
    console.log(progress);



    const renderProgressBars = (progress) => {
        switch (progress) {
            case "pending":
                return [80, 0, 0, 0];
            case "processing":
                return [100, 90, 0, 0];
            case "completed":
                return [100, 100, 100, 100];
            default:
                return [0, 0, 0, 0];
        }
    };
    const ProgressBarAnimation = ({ progress }) => {
        const progressValues = renderProgressBars(progress);

        return (
            <>
                {progressValues.map((width, index) => (
                    <View key={index} style={st.ProgressBar}>
                        <Text style={[st.progress, { width: `${width}%` }]}></Text>
                    </View>
                ))}
            </>
        );
    };
    return (
        <View style={[st.root, { marginTop: StatusBar.currentHeight }]}>
            <ScrollView style={st.ScrollView} >


                <StatusBar barStyle='light-content' backgroundColor={"black"} />
                <View style={{ backgroundColor: "black" }}>
                    <View style={st.innerContainer}>
                        <View style={st.S1}>
                            <Text style={{ fontSize: 30, fontWeight: "bold" }}>Your Order</Text>
                            <Text onPress={() => RedierctToHomePage()} style={{ fontSize: 30, fontWeight: "500" }}>X</Text>
                        </View>
                        <View style={st.S2}>
                            <Text style={{ fontWeight: "800" }}>Pickup At</Text>
                            <Text style={{ fontWeight: "800" }} numberOfLines={1} ellipsizeMode='tail'>
                                lorem
                                lorem
                                lorem
                                lorem
                                lorem
                                lorem
                                lorem
                                lorem
                                lorem
                                lorem
                                lorem
                                lorem
                                lorem
                                lorem
                            </Text>
                        </View>
                    </View>

                </View>
                <View style={st.Main}>
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",


                    }}>
                        <Text style={{ fontSize: 25, fontWeight: "900" }}>{EstimatedTime}</Text>
                    </View>
                    <View style={
                        {
                            width: width * 0.9,
                            height: width * 0.5,
                            // backgroundColor: "green",
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }>
                        <Image source={require("../assets/images/orderpng.png")} style={{ resizeMode: "contain", width: "100%", height: "100%" }} />
                    </View>
                    <View style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 5,

                    }}>
                        <ProgressBarAnimation progress={progress} />
                    </View>

                </View>

                <View style={[st.Container3]}>
                    <View style={{ width: "100%", paddingVertical: 20 }}>
                        <Text style={[st.PaymentMethodHeading, { borderBottomWidth: 0 }]}>
                            Order Details
                        </Text>
                        <View style={st.billTextContainer}>
                            <Text style={st.billText}>Your Order Number</Text>
                            <Text style={st.billText}>#{orderNumber}</Text>
                        </View>
                        <View style={st.billTextContainer}>
                            <Text style={st.billText}>Your Store</Text>
                            <Text style={st.billText}>{Fran_Title}</Text>
                        </View>

                    </View>
                    <View style={{ width: "100%", }}>
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
                            <Text style={st.billText}>${TotalTip}</Text>

                        </View>
                        <View style={st.billTextContainer}>
                            <Text style={st.billText}>Total</Text>
                            <Text style={st.billText}>${Total}</Text>
                        </View>
                    </View>
                </View>


            </ScrollView>
            <TouchableOpacity style={[st.AddToCart,]} onPress={() => RedierctToHomePage()}>
                <View style={st.GoToCheckOut}>
                    <Text style={[st.ViewCartText]}  >Finish</Text>
                </View>
            </TouchableOpacity>
        </View>
    )



}

export default OrderProgressComponent
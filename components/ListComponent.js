import { View, Text, ScrollView, StyleSheet, Dimensions, Image, Touchable, Button } from 'react-native'
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { FetchItemsOfCatId } from '../context/Features/Franchise/itemSlice';

export default function ListComponent(props) {
    const { width, height } = Dimensions.get('window');
    const st = StyleSheet.create({
        cardDiv: {
            width: "auto",
            marginBottom: 10,
            // shadowColor: "#000",
            // shadowOffset: {
            //     width: 0,
            //     height: 6,
            // },
            // shadowOpacity: 0.39,
            // shadowRadius: 8.30,
            // elevation: 10,
        },
        cardContent: {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: width * 0.03,
            paddingHorizontal: width * 0.05,
            backgroundColor: "white", // Add this to ensure the content doesn't extend outside the shadow
            borderRadius: 10, // Optional: add border radius for the card
        },
        TextContainer: {
            flex: 2,
            height: "100%",
            justifyContent: "center",
        },
        ImageContainer: {
            width: width * 0.18,
            height: width * 0.18,
            borderRadius: 20,
            position: "relative"
        },
        ProdImg: {
            borderRadius: 20,
            width: "100%",
            height: "100%",
            resizeMode: "contain",
        },
        PlusSign: {
            width: 12,
            height: 12,
            position: "absolute",
            top: 0,
            left: 0
        }
    })
    const { ListOf } = props.route.params
    const dispatch = useDispatch();
    const itemSlice = useSelector(s => s.Items);

    const isLoading = itemSlice.isLoading;


    useEffect(() => {
        dispatch(FetchItemsOfCatId(ListOf));
    }, [])

    if (isLoading) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Text>Loading...</Text>
            </View>
        )
    } else {
        const Items = itemSlice.Data.data;
        if (Items.length == 0) {
            return (
                <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                    <Text>No Products Available... </Text>
                    <Button title='Back' onPress={() => props.navigation.goBack()} />
                </View>
            )
        } else {
            return (
                <View style={{ height: "95%", margin: 15, }}>
                    <ScrollView  >
                        {
                            Items.map((e, i) => (
                                <View key={i} style={[st.cardDiv, { elevation: 20 }]}>
                                    <TouchableOpacity style={st.cardContent} onPress={() => props.navigation.navigate("SingleProduct", { Item: e })}>
                                        <View style={st.TextContainer}>
                                            <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>{e.Item_Title} {ListOf} </Text>
                                            <Text style={{ fontSize: width * 0.02 }}>{e.Item_SubTitle}</Text>
                                            <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>{e.Item_Price}$</Text>
                                        </View>
                                        <View style={st.ImageContainer}>
                                            <Image style={st.ProdImg} source={{ uri: e.Item_Image }} />
                                            <Image style={st.PlusSign} source={require("../assets/icons/plus.png")} />
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            ))

                        }


                    </ScrollView>
                </View>

            )
        }


    }

}
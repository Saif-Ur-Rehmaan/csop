import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');
const GiftCardListComponent = (props) => {
    const { GiftCards, DBPushInfo } = props.route.params.obj;

    const st = StyleSheet.create({
        Card: { width: (width / 2) - 20, minHeight: 80, backgroundColor: "red" },
    })
    const redirectToGiftCheckout = (Card) => {
        console.log(DBPushInfo);
        DBPushInfo.GiftCard = Card;

        props.navigation.navigate("GiftCheckoutModal", { DBPushInfo });
    }
    return (
        <View >
            <ScrollView>
                <View style={{ paddingVertical: 30, flexDirection: "row", flexWrap: "wrap", justifyContent: "center", rowGap: 13, columnGap: 12 }}>

                    {
                        GiftCards.map((card, i) => (
                            <TouchableOpacity key={i} onPress={() => { redirectToGiftCheckout(card) }} style={st.Card}>
                                <Image source={{ uri: card.GC_Image }} style={{ flex: 1, resizeMode: "stretch" }} />
                            </TouchableOpacity>


                        ))
                    }


                </View>
            </ScrollView>



        </View>
    )
}

export default GiftCardListComponent
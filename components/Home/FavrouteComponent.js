import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

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
export default function FavrouteComponent() {
  const UserFranc = useSelector(s => s.Franchise.FranchiseObj);
  // const fav = UserFranc.FranchiseFavItems;
  const fav = [
    { "Item_Id": 1, "Item_Image": "https://picsum.photos/100", "Item_IsAvailable": "Available", "Item_Price": "5", "Item_SubTitle": "abcd", "Item_Title": "it1", "SizeOptionsIdArray": "[1,2]", "_CategoryId": "1" }
  ];
  if (!fav) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Text>No Products Available</Text>
      </View>
    )
  } else {
    return (
      <View>
        <View style={{ height: "95%", margin: 15, }}>
          <ScrollView  >


            <View style={[st.cardDiv, { elevation: 20 }]}>
              <TouchableOpacity style={st.cardContent}>
                <View style={st.TextContainer}>
                  <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>Spanish Ice Latte  </Text>
                  <Text style={{ fontSize: width * 0.02 }}>Coffe Shop Coffe Shop</Text>
                  <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>4$</Text>
                </View>
                <View style={st.ImageContainer}>
                  <Image style={st.ProdImg} source={{ uri: "https://picsum.photos/100" }} />
                  <Image style={st.PlusSign} source={require("../../assets/icons/plus.png")} />
                </View>
              </TouchableOpacity>
            </View>


          </ScrollView>
        </View >
      </View >
    )
  }
}
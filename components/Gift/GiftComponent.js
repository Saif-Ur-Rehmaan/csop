import { View, Text, StyleSheet, ScrollView, StatusBar, Image, Dimensions, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const { width, height } = Dimensions.get('window');

export default function GiftComponent(props) {
  const style = StyleSheet.create({

    sectionA: {
      width: "100%",
      minHeight: height * 0.35,
      backgroundColor: "pink",
      position: "relative",
      justifyContent: "center",
      alignItems: "center"
    },
    SecAImg: {
      width: "100%",
      height: "100%",
      position: "absolute",
      resizeMode: "cover",
    },
    Container: {
      width: width * 0.8,
      borderRadius: 20,
      height: width * 0.25,
      backgroundColor: "#FFFFFF80",
      justifyContent: "center",
      alignItems: "center"
    },

    sectionB: {
      width: "100%",
      minHeight: 50,
      backgroundColor: "#EAF0F5",
      transform: [{ translateY: -height * 0.05 }],
      borderTopRightRadius: 25,
      borderTopLeftRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 15,
      paddingBottom: height * 0.05,
      gap: 20

    },
    GiftCardContainer: {
      width: width * 0.88,
      minHeight: 50,
      borderRadius: width * 0.05,
      backgroundColor: "red",
      paddingHorizontal: 15,
      paddingVertical: 20,
      overflow: "hidden",
      backgroundColor: "white",
      gap: 10
    },
    gc1: {
      flex: 1,
      gap: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    gc1_1: {
      flex: 3,
      minHeight: 50,
      gap: 5
    },
    CardHeading1: {
      fontSize: width * 0.04,
      fontWeight: "bold",
      color: "gray"
    },
    CardHeading2: {
      fontSize: width * 0.048,
      fontWeight: "bold",
    },

    gc2: {

      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    gc2_1: { flex: 1 },
    gc2_2: { flex: 1, flexDirection: "row", justifyContent: "flex-end" },
    StartButton: {
      // width: width * 0.2,
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 10,
      backgroundColor: "black",
      color: "white",
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: width * 0.05,
      fontWeight: "600"
    }
  });
  const auth = useSelector(s => s.auth.Data);
  const { id, User_Points } = auth.user;

  const [Gifts, setGifts] = useState(null)
  useEffect(() => {
    const fetchGifts = async () => {
      const obj = { UserId: id }
      const res = await fetch("http://assignment.optikl.ink/api/users/GetAvailableGifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
      const gifts = await res.json();
      setGifts(gifts)
    }
    fetchGifts()
  }, [])

  if (!Gifts) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Text>Loading...</Text>
      </View>
    )
  }
  const navigateToGiftCardsComponent = (gift) => {
    const obj = {
      GiftCards: Gifts.data.GiftCards,
      DBPushInfo: {
        Gift: gift,
        GiftCard: null,
        SenderInfo: auth.user,
        RecieverInfo: null
      }
    };
    props.navigation.navigate("GiftCardList", { obj })
  }


  return (
    <View style={{ width: "100%", height: "100%", }}>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <View style={style.sectionA}>
          <Image source={{ uri: "https://picsum.photos/100" }} style={style.SecAImg} />
          <View style={style.Container}>
            <Text style={{ fontSize: width * 0.07, fontWeight: "900" }}>Points: {User_Points}</Text>
            <Text style={{ opacity: 0.3, fontSize: width * 0.045 }}>How to earn points</Text>
          </View>
        </View>
        <View style={style.sectionB}>
          <Text style={{ fontWeight: "700" }}>Complete stamp cards to win</Text>
          {
            Gifts.data.Gifts.length == 0 ?

              <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Text>No Gifts Available For You...</Text>
              </View>

              : null
          }

          {
            Gifts.data.Gifts.map((gif, i) => (
              <View key={i} style={style.GiftCardContainer}>

                <View style={style.gc1}>
                  <View style={style.gc1_1}>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={style.CardHeading1}>{gif.Gift_Task}</Text>
                    <Text ellipsizeMode='tail' numberOfLines={2} style={style.CardHeading2}>{gif.Gift_GiftInfo}</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "pink" }}>
                    <Image source={{ uri: gif.Gift_Image }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
                  </View>
                </View>

                <View style={style.gc2}>
                  <View style={style.gc2_1}>
                    <Text style={{ fontSize: width * 0.03, color: "gray", fontWeight: "900", opacity: 0.5 }}>To order</Text>
                    <Text style={{ fontSize: width * 0.04, fontWeight: "bold" }}>{gif.Gift_NoOfOrders} order</Text>
                  </View>
                  <View style={style.gc2_2}>
                    <TouchableOpacity onPress={() => { navigateToGiftCardsComponent(gif) }}>
                      <Text style={style.StartButton}>Start</Text>
                    </TouchableOpacity>
                  </View>
                </View>

              </View>

            ))
          }



          {/* <View style={style.GiftCardContainer}>

            <View style={style.gc1}>
              <View style={style.gc1_1}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={style.CardHeading1}>Breakfast Delivery Order (1x)</Text>
                <Text ellipsizeMode='tail' numberOfLines={2} style={style.CardHeading2}>Earn a $20 Voucher Upon Completions</Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "pink" }}>
                <Image source={{ uri: "https://picsum.photos/100" }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
              </View>
            </View>

            <View style={style.gc2}>
              <View style={style.gc2_1}>
                <Text style={{ fontSize: width * 0.03, color: "gray", fontWeight: "900", opacity: 0.5 }}>To order</Text>
                <Text style={{ fontSize: width * 0.04, fontWeight: "bold" }}>1 order</Text>
              </View>
              <View style={style.gc2_2}>
                <TouchableOpacity>
                  <Text style={style.StartButton}>Start</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <View style={style.GiftCardContainer}>

            <View style={style.gc1}>
              <View style={style.gc1_1}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={style.CardHeading1}>Breakfast Delivery Order (1x)</Text>
                <Text ellipsizeMode='tail' numberOfLines={2} style={style.CardHeading2}>Earn a $20 Voucher Upon Completions</Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "pink" }}>
                <Image source={{ uri: "https://picsum.photos/100" }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
              </View>
            </View>

            <View style={style.gc2}>
              <View style={style.gc2_1}>
                <Text style={{ fontSize: width * 0.03, color: "gray", fontWeight: "900", opacity: 0.5 }}>To order</Text>
                <Text style={{ fontSize: width * 0.04, fontWeight: "bold" }}>1 order</Text>
              </View>
              <View style={style.gc2_2}>
                <TouchableOpacity>
                  <Text style={style.StartButton}>Start</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <View style={style.GiftCardContainer}>

            <View style={style.gc1}>
              <View style={style.gc1_1}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={style.CardHeading1}>Breakfast Delivery Order (1x)</Text>
                <Text ellipsizeMode='tail' numberOfLines={2} style={style.CardHeading2}>Earn a $20 Voucher Upon Completions</Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "pink" }}>
                <Image source={{ uri: "https://picsum.photos/100" }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
              </View>
            </View>

            <View style={style.gc2}>
              <View style={style.gc2_1}>
                <Text style={{ fontSize: width * 0.03, color: "gray", fontWeight: "900", opacity: 0.5 }}>To order</Text>
                <Text style={{ fontSize: width * 0.04, fontWeight: "bold" }}>1 order</Text>
              </View>
              <View style={style.gc2_2}>
                <TouchableOpacity>
                  <Text style={style.StartButton}>Start</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
          <View style={style.GiftCardContainer}>

            <View style={style.gc1}>
              <View style={style.gc1_1}>
                <Text ellipsizeMode='tail' numberOfLines={1} style={style.CardHeading1}>Breakfast Delivery Order (1x)</Text>
                <Text ellipsizeMode='tail' numberOfLines={2} style={style.CardHeading2}>Earn a $20 Voucher Upon Completions</Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "pink" }}>
                <Image source={{ uri: "https://picsum.photos/100" }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
              </View>
            </View>

            <View style={style.gc2}>
              <View style={style.gc2_1}>
                <Text style={{ fontSize: width * 0.03, color: "gray", fontWeight: "900", opacity: 0.5 }}>To order</Text>
                <Text style={{ fontSize: width * 0.04, fontWeight: "bold" }}>1 order</Text>
              </View>
              <View style={style.gc2_2}>
                <TouchableOpacity>
                  <Text style={style.StartButton}>Start</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View> */}
        </View>

      </ScrollView>
    </View>
  )
}
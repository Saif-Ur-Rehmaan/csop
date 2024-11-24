import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import { View, ScrollView, Image, Button, StatusBar, StyleSheet, Dimensions, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FetchItemsOfCatId, FetchItemsOfCatIdasync, setIsLoading } from '../../context/Features/Franchise/itemSlice';
import { useEffect, useState } from 'react';






const Seasonal_IndexComponent = (props) => {

  const { width, height } = Dimensions.get('window');

  const [Loading, setLoading] = useState(false)

  const st = StyleSheet.create({
    Main: {
      width: "100%",
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
      gap: 10
    },
    Box: {
      borderRadius: 15,
      borderWidth: 2,
      borderColor: "black",
      justifyContent: "center",
      alignItems: "center"
    },
    Box1: {
      width: width * 0.4,
      height: width * 0.38,
    },
    Box2: {
      width: width * 0.4,
      height: width * 0.2,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 6
    }
    ,
    Box3: {
      width: width * 0.83,
      height: width * 0.4,
      paddingVertical: 10
    }
  })
  const UserFranc = useSelector(s => s.Franchise.FranchiseObj);
  const Seasonal = UserFranc.FranchiseSeasonal;

  const itemSlice = useSelector(s => s.Items);


  const RedirectToList = async (catId) => {
    setLoading(true)
    const items = await FetchItemsOfCatIdasync(catId);

    await props.navigation.navigate('SeasonalList', { ListOf: items.data })
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }
  if (Loading) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Text>Loading...</Text>
      </View>
    )
  }



  const RenderCats = () => {
    const copyOfSeasonal = [...Seasonal];
    const lengthOfCopyOfSeasonal = copyOfSeasonal.length;



    if (lengthOfCopyOfSeasonal <= 4) {
      return copyOfSeasonal.map((cat, index) => (
        <View key={index} style={{ gap: 15, paddingVertical: 5 }}>
          <View key={index} style={st.Main}>
            <TouchableOpacity onPress={() => { RedirectToList(cat.Cat_Id) }}>
              <View style={[st.Box3, st.Box]}>
                <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>{cat.Cat_Name}</Text>
                <Text style={{ fontSize: width * 0.025, opacity: 1, textDecorationLine: "underline" }} numberOfLines={1} ellipsizeMode="tail">{cat.Cat_SubTitle} </Text>
                <Image source={{ uri: cat.Cat_Img }} style={{ resizeMode: "contain", flex: 1, width: "25%" }} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ));

    } else {
      const specialCatIndex = Seasonal.findIndex((e) => e.IsSpecial == 1);
      const specialCat = specialCatIndex != -1 ? copyOfSeasonal.splice(specialCatIndex, 1)[0] : null;

      const fst2Cats = [copyOfSeasonal.shift(), copyOfSeasonal.shift()] //if null show special ones ui

      const lastCats = (copyOfSeasonal.length % 2 != 0) ? copyOfSeasonal.pop() : null;

      const remaining = copyOfSeasonal;

      const PrintRemaining = () => {
        const remainingCountIsEven = remaining.length % 2 == 0;

        const jsxElements = []; // Array to accumulate JSX elements
        if (remainingCountIsEven) {
          for (let index = 0; index < remaining.length; index += 2) {
            const f = remaining[index];
            const s = remaining[index + 1]; // Use index + 1 to get the second element

            jsxElements.push(
              <View style={st.Main} key={index}>
                <TouchableOpacity onPress={() => RedirectToList(f.Cat_Id)}>
                  <View style={[st.Box2, st.Box, { gap: width * 0.05 }]}>
                    <View>
                      <Text style={{ fontSize: width * 0.036, fontWeight: "500" }}>{f.Cat_Name}</Text>
                      <Text style={{ fontSize: width * 0.02, opacity: 1, textDecorationLine: "underline" }}>{f.Cat_SubTitle} </Text>
                    </View>
                    <Image source={{ uri: f.Cat_Img }} style={{ resizeMode: "contain", width: width * 0.12, height: height * 0.1 }} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => RedirectToList(s.Cat_Id)}>
                  <View style={[st.Box2, st.Box, { gap: width * 0.05 }]}>
                    <View>
                      <Text style={{ fontSize: width * 0.036, fontWeight: "500" }}>{s.Cat_Name}</Text>
                      <Text style={{ fontSize: width * 0.02, opacity: 1, textDecorationLine: "underline" }}>{s.Cat_SubTitle}</Text>
                    </View>
                    <Image source={{ uri: s.Cat_Img }} style={{ resizeMode: "contain", width: width * 0.12, height: height * 0.1 }} />
                  </View>
                </TouchableOpacity>

              </View>
            );
          }

        } else {
          const lastelem = remaining.pop();
          for (let index = 0; index < remaining.length; index += 2) {
            const f = remaining[index];
            const s = remaining[index + 1]; // Use index + 1 to get the second element

            jsxElements.push(
              <View style={st.Main} key={index}>
                <TouchableOpacity onPress={() => RedirectToList(f.Cat_Id)}>
                  <View style={[st.Box2, st.Box]}>
                    <View>
                      <Text style={{ fontSize: width * 0.036, fontWeight: "500" }}>{f.Cat_Name}</Text>
                      <Text style={{ fontSize: width * 0.02, opacity: 1, textDecorationLine: "underline" }}>{f.Cat_SubTitle} </Text>
                    </View>
                    <Image source={{ uri: f.Cat_Img }} style={{ resizeMode: "contain", width: width * 0.12, height: height * 0.1 }} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => RedirectToList(s.Cat_Id)}>
                  <View style={[st.Box2, st.Box]}>
                    <View>
                      <Text style={{ fontSize: width * 0.036, fontWeight: "500" }}>{s.Cat_Name}</Text>
                      <Text style={{ fontSize: width * 0.02, opacity: 1, textDecorationLine: "underline" }}>{s.Cat_SubTitle}</Text>
                    </View>
                    <Image source={{ uri: s.Cat_Img }} style={{ resizeMode: "contain", width: width * 0.12, height: height * 0.1 }} />
                  </View>
                </TouchableOpacity>

              </View>
            );
          }

          jsxElements.push(
            <View style={st.Main}>
              <TouchableOpacity onPress={() => RedirectToList(lastelem.Cat_Id)}>
                <View style={[st.Box3, st.Box]}>
                  <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>{lastelem.Cat_Name}</Text>
                  <Text style={{ fontSize: width * 0.025, opacity: 1, textDecorationLine: "underline" }}>{lastelem.Cat_SubTitle} </Text>
                  <Image source={{ uri: lastelem.Cat_Img }} style={{ resizeMode: "contain", flex: 1, width: "25%" }} />
                </View>
              </TouchableOpacity>
            </View>
          )
        }

        return jsxElements; // Return the accumulated JSX elements after the loop
      }



      return (
        <View style={{ gap: 15, paddingVertical: 15 }}>
          <View style={st.Main}>
            {/* fst2cat[0] */}
            <TouchableOpacity onPress={() => RedirectToList(fst2Cats[0].Cat_Id)}>
              <View style={[st.Box1, st.Box]}>
                <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>{fst2Cats[0].Cat_Name}</Text>
                <Text style={{ fontSize: width * 0.025, opacity: 1, textDecorationLine: "underline" }}>{fst2Cats[0].Cat_SubTitle} </Text>
                <Image source={{ uri: fst2Cats[0].Cat_Img }} style={{ resizeMode: "contain", width: width * 0.2, height: height * 0.1 }} />

              </View>
            </TouchableOpacity>
            {/* fst2cat[1] */}
            <TouchableOpacity onPress={() => RedirectToList(fst2Cats[1].Cat_Id)}>
              <View style={[st.Box1, st.Box]}>
                <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>{fst2Cats[1].Cat_Name}</Text>
                <Text style={{ fontSize: width * 0.025, opacity: 1, textDecorationLine: "underline" }}>{fst2Cats[1].Cat_SubTitle} </Text>
                <Image source={{ uri: fst2Cats[1].Cat_Img }} style={{ resizeMode: "contain", width: width * 0.2, height: height * 0.1 }} />
              </View>
            </TouchableOpacity>
          </View>

          <PrintRemaining />






          {
            lastCats ?
              <View style={st.Main}>
                <TouchableOpacity onPress={() => RedirectToList(lastCats.Cat_Id)}>
                  <View style={[st.Box3, st.Box]}>
                    <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>{lastCats.Cat_Name}</Text>
                    <Text style={{ fontSize: width * 0.025, opacity: 1, textDecorationLine: "underline" }}>{lastCats.Cat_SubTitle} </Text>
                    <Image source={{ uri: lastCats.Cat_Img }} style={{ resizeMode: "contain", flex: 1, width: "25%" }} />
                  </View>
                </TouchableOpacity>
              </View>
              : null
          }



          {
            specialCat ?
              <View style={st.Main}>
                <TouchableOpacity onPress={() => RedirectToList(specialCat.Cat_Id)}>
                  <View style={[st.Box3, st.Box]}>
                    <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>{specialCat.Cat_Name}</Text>
                    <Text style={{ fontSize: width * 0.025, opacity: 1, textDecorationLine: "underline" }}>{specialCat.Cat_SubTitle} </Text>
                    <Image source={{ uri: specialCat.Cat_Img }} style={{ resizeMode: "contain", flex: 1, width: "25%" }} />
                  </View>
                </TouchableOpacity>
              </View>
              : null
          }
        </View>
      )
    }

  }



  return (
    <View style={{ height: "100%", width: "100%" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView  >

        <RenderCats />



      </ScrollView>
    </View>
  );


}

const Seasonal_ListComponent = (props) => {
  const { width } = Dimensions.get('window');
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
  const Items = ListOf;
  const redirecttosingleproductpage = (e) => {
    props.navigation.navigate("SingleProduct", { Item: e })
  }

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
                <TouchableOpacity style={st.cardContent} onPress={() => redirecttosingleproductpage(e)}>
                  <View style={st.TextContainer}>
                    <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>{e.Item_Title}</Text>
                    <Text style={{ fontSize: width * 0.02 }}>{e.Item_SubTitle}</Text>
                    <Text style={{ fontSize: width * 0.04, fontWeight: "500" }}>{e.Item_Price}$</Text>
                  </View>
                  <View style={st.ImageContainer}>
                    <Image style={st.ProdImg} source={{ uri: e.Item_Image }} />
                    <Image style={st.PlusSign} source={require("../../assets/icons/plus.png")} />
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

export default SeasonalComponent = (props) => {

  const Stack = createStackNavigator()
  const UserFranc = useSelector(s => s.Franchise.FranchiseObj);
  const Seasonal = UserFranc.FranchiseSeasonal;


  if (!Seasonal) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Text>Loading...</Text>
      </View>
    )
  } else {
    if ((Seasonal.length == 0)) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
          <Text>No Products Available</Text>
        </View>
      )
    }
    return (
      <Stack.Navigator>
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name='SeasonalIndex' component={Seasonal_IndexComponent} />
          <Stack.Screen name='SeasonalList' component={Seasonal_ListComponent} />
        </Stack.Group>
      </Stack.Navigator>

    );
  }
} 
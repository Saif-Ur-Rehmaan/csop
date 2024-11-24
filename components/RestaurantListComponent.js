import { View, Text, Image, Linking, StatusBar, ScrollView, ActivityIndicator, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { AntDesign, FontAwesome5, EvilIcons, } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { FetchFranchises, fetchFranchises, setAllFranchises, setRegion, setSelectedStoreIndex, setisSelectedHeart } from '../context/Features/Franchise/FranchiseSlice';
import { setFranchise } from '../context/Features/Franchise/UserFranchiseSlice';
const { height, width } = Dimensions.get('window');
const style = StyleSheet.create({
  Main: {
    backgroundColor: "white",
    width: "100%",
    padding: 35,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden"

  },
  container: {
    width: "100%",
    position: "relative",
    gap: 20
  },
  Sec1: {
    width: "100%",
    flexDirection: "row",
    gap: width * 0.04,
    alignItems: "center",
  },
  Icon: {
    fontSize: width * 0.07
  },
  SecMap: {
    width: "100%",
    height: width * 0.5,
    backgroundColor: "green",
  },
  SecFranchiseList: {
    width: "100%",
    minHeight: 50,
  },
  FranchiseCard: {
    width: "100%",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBlockColor: "black",


  },
  Fr_title: {
    fontSize: width * 0.05,
    fontWeight: "500",
    marginBottom: 3
  },
  Fr_Address: {
    fontSize: width * 0.038,
    opacity: 0.5,
    fontWeight: "400"
  },
  BottomMenu: {
    width: "100%",
    bottom: 0,
    marginBottom: 50,
    borderBottomWidth: 1,
    borderBlockColor: "black",
    gap: 15,
    paddingBottom: 10
  },
  Selected: {
    backgroundColor: "gray", // Light gray background color
    shadowColor: "#000", // Shadow color
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Elevation for Android shadow effect
  }

})
// const LoadingIndicator = () => {
//   return (
//     <View style={style.container}>
//       <ActivityIndicator size="large" color="red" />
//       <Text>Loading...</Text>
//     </View>
//   );
// };



export default function RestaurantListComponent() {
  const dispatch = useDispatch();
  const Franc = useSelector(s => s.AllFranchise);
  const UserFranc = useSelector(s => s.Franchise.FranchiseObj);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(FetchFranchises());
    };
    fetchData();
  }, [dispatch]);
  const [showmap, setShowMap] = useState(false)
  if (Franc.Data == null || Franc.region == null) {

    return (
      <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Text>Loading...</Text>
      </View>
    )

  }
  const Franchises = Franc.Data;
  if (Franchises.length == 0) {

    return (
      <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Text>No Franchises Available</Text>
      </View>
    )
  }


  const isSelectedHeart = Franc.isSelected;
  const SelectedStoreIndex = Franc.SelectedStoreIndex;
  const region = {
    latitude: parseFloat(Franc.region.Latitude),
    longitude: parseFloat(Franc.region.Longitude),
    latitudeDelta: parseFloat(Franc.region.LatitudeDelta),
    longitudeDelta: parseFloat(Franc.region.LongitudeDelta)
  };




  const _setRegion = (location) => {
    dispatch(setRegion(location));
  }


  const _SelectStore = (index) => {
    dispatch(setSelectedStoreIndex(index))
    const loc = {
      "Latitude": parseFloat(Franchises[index].Location.Latitude),
      "LatitudeDelta": parseFloat(Franchises[index].Location.LatitudeDelta),
      "Longitude": parseFloat(Franchises[index].Location.Longitude),
      "LongitudeDelta": parseFloat(Franchises[index].Location.LongitudeDelta)
    }
    dispatch(setRegion(loc))


  };



  const Fav = () => {
    console.warn("fav");
    dispatch(setisSelectedHeart(!Franc.isSelectedHeart))
  }
  const Share = () => {
    console.warn("Share")
  }
  const CallAction = () => {
    if (SelectedStoreIndex != -1) {
      const phone = Franchises[SelectedStoreIndex].Phone;
      Linking.openURL(`tel: ${phone}`)
    } else {
      Alert.alert("No store selected");
    }
  }
  const ShowDirectionsOnGoogleMap = () => {
    if (SelectedStoreIndex !== -1) {
      const { Latitude, Longitude, LatitudeDelta, LongitudeDelta } = Franchises[SelectedStoreIndex].Location;
      const url = `https://www.google.com/maps/search/?api=1&query=${Latitude},${Longitude}&zoom=14`;
      Linking.openURL(url);
    } else {
      Alert.alert("No store selected");
    }
  }

  const MakeItMyStore = async () => {


    if (SelectedStoreIndex !== -1) {
      const SF = await Franchises[SelectedStoreIndex];
      const obj = {
        FranchiseId: SF.id,
        FranchiseName: SF.Name,
        FranchiseAddress: SF.Address,
        FranchiseMenu: null,
        FranchiseSeasonal: null,
        FranchiseUsersFavItems: null,
        FranchiseUsersPrevious: null,
      }
      dispatch(setFranchise(obj));
      return;
    } else {
      Alert.alert("No store selected");
    }
  }




  const locations = Franchises.map(store => {
    return ({
      Title: store.Name,
      Location: { latitude: parseFloat(store.Location.Latitude), longitude: parseFloat(store.Location.Longitude) },
      Description: store.Address
    })
  })
  //COMPONENTS
  const ShowLocations = () => {
    return locations.map((item, i) => (
      <Marker
        key={i}
        coordinate={item.Location}
        title={item.title}
        description={item.description}
        pinColor={SelectedStoreIndex == i ? 'red' : 'blue'}
        onPress={() => _SelectStore(i)} // Add onPress handler here 
      />
    ));
  }
  const ShowMap = () => {
    return (
      <View style={style.SecMap}>
        <MapView style={{ width: "100%", height: "100%" }} region={region} >
          <ShowLocations />
        </MapView>
      </View>
    )
  }
  const ShowFranchises = () => {
    return (
      <View style={style.SecFranchiseList}>
        {Franchises.map((store, index) => (
          <TouchableOpacity key={index} onPress={() => _SelectStore(index)}>
            <View style={[style.FranchiseCard, SelectedStoreIndex == index ? style.Selected : null]}>
              <Text style={style.Fr_title}>{store.Name}</Text>
              <Text style={style.Fr_Address} numberOfLines={1} ellipsizeMode="tail">{store.Address}</Text>
              <Text style={style.Fr_Address} numberOfLines={1} ellipsizeMode="tail">{store.Timing}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

    )
  }













  return (
    <View style={{ height: "100%", backgroundColor: '#EDEEEA', paddingTop: StatusBar.currentHeight }}>
      <StatusBar barStyle='light-content' />
      <ScrollView style={[style.Main]}>
        <View style={[style.container]}>
          <View style={[style.Sec1]}>
            <TouchableOpacity onPress={Fav}>
              <AntDesign name={Franc.isSelectedHeart ? "heart" : "hearto"} style={style.Icon} color="#C69C6C" />
            </TouchableOpacity>
            <TouchableOpacity onPress={Share}>
              <FontAwesome5 name="share" style={style.Icon} color="#C69C6C" />
            </TouchableOpacity>
          </View>


          <ShowMap />
          <ShowFranchises />


          <View style={style.BottomMenu}>

            <View style={{ flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center", width: "100%" }}>
              <View style={{ flexDirection: "row", gap: 5, justifyContent: "center", alignItems: "center", width: "50%" }} >
                <Image source={require("../assets/icons/RS4.png")} />
                <Text onPress={MakeItMyStore} style={{ fontSize: width * 0.032, fontWeight: "bold" }}>MAKE IT MY STORE</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5, justifyContent: "center", alignItems: "center", width: "50%" }}>
                <Image source={require("../assets/icons/RS2.png")} />
                <Text onPress={ShowDirectionsOnGoogleMap} style={{ fontSize: width * 0.032, fontWeight: "bold" }}>DIRECTIONS</Text>
              </View>

            </View>
            <View style={{ flexDirection: "row", gap: 8, justifyContent: "center", alignItems: "center", width: "100%" }}>
              <View style={{ flexDirection: "row", gap: 5, justifyContent: "center", alignItems: "center", width: "50%" }}>
                <Image source={require("../assets/icons/RS1.png")} />
                <Text style={{ fontSize: width * 0.032, fontWeight: "bold" }}>ORDER FROM HERE</Text>
              </View>
              <View style={{ flexDirection: "row", gap: 5, justifyContent: "center", alignItems: "center", width: "50%" }}>
                <Image source={require("../assets/icons/RS3.png")} />
                <Text onPress={CallAction} style={{ fontSize: width * 0.032, fontWeight: "bold" }}>CALL STORE</Text>
              </View>

            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  )

}


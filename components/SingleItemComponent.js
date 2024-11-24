import { Dimensions, View, Text, StyleSheet, Image, ScrollView, StatusBar, TextInput, KeyboardAvoidingViewComponent, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { FetchItemSizes, addToCart, removeFromCart, updateCartItem, updateCartItemQuantity } from '../context/Features/User/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
const { width, height } = Dimensions.get('window');

const st = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100%",

  },
  CloseBtnDiv: {
    backgroundColor: "#EAF0F5",
    width: "100%",
    borderTopLeftRadius: width * 0.1,
    borderTopRightRadius: width * 0.1,
    paddingHorizontal: width * 0.06,
    paddingTop: width * 0.04,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  SecImg: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    padding: 8
  },
  ItemImg: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: width * 0.6 / 2,
    borderColor: "black",
    borderWidth: 3,
    marginBottom: height * 0.01,
    resizeMode: "cover"
  },
  Title: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    textDecorationLine: "underline",

  },
  Subtitle: {
    width: width * 0.6,
    opacity: 0.5,
    fontSize: width * 0.04,
    textAlign: "center",

  },
  Sec: {
    width: "100%",
    paddingHorizontal: width * 0.06,
    flex: 1,
    gap: 10
    // backgroundColor: "green"
  },
  Heading: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: width * 0.06,
    paddingBottom: 5,
    fontWeight: "500"
  },
  SizeDiv: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20
  },
  SizeCard: {
    flex: 1,
    justifyContent: "center",
    alignItems: "baseline",
  },
  SizeCardImage: {
    width: "100%",
    height: height * 0.12,
    resizeMode: "contain"
  },
  SizeCardText: {
    textAlign: "center",
    width: "100%",
    textTransform: "uppercase",
    fontSize: 12
  },
  TextInpDiv: {
    width: "100%",
    height: height * 0.1,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "black",
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 20
  },
  AddToCart: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: width,
    alignItems: "flex-end"

  },
  Btn: {
    width: width * 0.45,
    paddingHorizontal: 20,
    height: 50,
    borderRadius: 25,
    fontWeight: "500",
    fontSize: width * 0.05,
    backgroundColor: "#2B2B2A",
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    margin: 10
  },
  PickupAt: {
    width: "100%",
    minHeight: 58,
    backgroundColor: "#2B2B2A",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row"
  },
  GoToCartBtn: {
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
  CountText: {
    width: 25,
    height: 25,
    fontWeight: "400",
    fontSize: width * 0.04,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    position: "absolute",
    left: 25,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50,
  },
  ViewCartText: {
    fontWeight: "500",
    fontSize: width * 0.05,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
  PriceText: {
    fontWeight: "400",
    fontSize: width * 0.04,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
    position: "absolute",
    right: 25,
  }
})
export default function SingleItemComponent(props) {
  const dispatch = useDispatch();
  const { Item } = props.route.params;//Item

  const [selectedSizeId, setSelectedSizeId] = useState(Item.Sizes[0].IS_Id);//used for toggling size selection of Size
  const [selectedOptions, setSelectedOptions] = useState([]);//used for toggling Whats Included selection of Size

  const ItemInCart = useSelector(s => s.auth.Cart);
  const IsItemPresentInCart = ItemInCart.findIndex(item => item.Item.Item_Id == Item.Item_Id && item.Size.IS_Id == selectedSizeId) != -1;
  const Sizes = Item.Sizes;
  const ItemId = Item.Item.Item_Id;
  const IdsOfItemsInCart = ItemInCart.map((itm) => [itm.Item.Item.Item_Id, itm.Size.IS_Id]);
  // const dropdownOptions = JSON.parse(Item.Item.Item_WhatsIncluded);
  const dropdownOptions = {
    "Milk": [
      {
        "name": "Creamy Delight Dairy",
        "Price": "5.99"
      },
      {
        "name": "Milky Way Farms",
        "Price": "4.99"
      },
      {
        "name": "Pure Cow Dairy Cow",
        "Price": "3.99"
      },
    ],
    "Coffee": [
      {
        "name": "Morning Buzz Coffee",
        "Price": "7.99"
      },
      {
        "name": "Roast & Grind Coffee",
        "Price": "6.99"
      },
      {
        "name": "Brew Haven Coffee Co",
        "Price": "8.99"
      },
    ]
  };
  //WhatsIncluded
  const keysArray = Object.keys(dropdownOptions);
  const valuesArray = Object.values(dropdownOptions).map(options => options.map(option => option.name));
  const PriceArray = Object.values(dropdownOptions).map(options => options.map(option => option.Price));
  //WhatsIncluded end

  //Effects
  useEffect(() => {
    if (IsItemPresentInCart) {
      const SelectedItem = ItemInCart.find(item => item.Item.Item_Id === Item.Item_Id && item.Size.IS_Id === selectedSizeId);
      setSelectedOptions(SelectedItem.WhatsIncluded.map((e) => e.name));
    } else {
      setSelectedOptions([])
    }
  }, [selectedSizeId])
  useEffect(() => {
    if (IsItemPresentInCart) {
      // Update the cart with the new selected options
      const sizes = Sizes;

      const WhatsIncluded = selectedOptions.map(option => {
        for (const key in dropdownOptions) {
          const foundItem = dropdownOptions[key].find(item => item.name === option);
          if (foundItem) {
            return foundItem;
          }
        }
        return null; // If the option is not found in any array
      });
      const obj = {
        findData: [ItemId, selectedSizeId],
        UpdatedItem: {
          Item: Item,
          Size: sizes.find(e => e.IS_Id == selectedSizeId),
          quantity: 1,
          WhatsIncluded: WhatsIncluded
        }
      }
      // console.log(obj.UpdatedItem.WhatsIncluded);
      dispatch(updateCartItem(obj))
    }
  }, [selectedOptions]);
  //Effects End


  const onSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    // update cart..
  };
  //Component
  const MultiSelectDropdown = ({ options, Price }) => {
    return (
      <View>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            // onPress={() => toggleOption(option)}
            onPress={() => onSelect(option)}
            style={{
              padding: 10,
              backgroundColor: selectedOptions.includes(option) ? 'lightblue' : 'white',
              flexDirection: "row",
              justifyContent: "space-between"
            }}>
            <Text>{option} </Text>
            <Text>${Price[index]}</Text>

          </TouchableOpacity>
        ))}
      </View>
    );

  };
  //Component end



  //functions
  const AddToCartFunction = () => {

    const { Item_Id, Item_Title, Item_Price } = Item;
    const sizes = Sizes;

    if (!selectedSizeId) {
      alert("Select Size First")
      return;
    } else {
      const WhatsIncluded = selectedOptions.map(option => {
        for (const key in dropdownOptions) {
          const foundItem = dropdownOptions[key].find(item => item.name === option);
          if (foundItem) {
            return foundItem;
          }
        }
        return null; // If the option is not found in any array
      });
      const obj = {
        Item: Item,
        Size: sizes.find(e => e.IS_Id == selectedSizeId),
        quantity: 1,
        WhatsIncluded: WhatsIncluded
      }
      // console.log(obj.WhatsIncluded);
      dispatch(addToCart(obj));
    }

  };
  const RemoveItemFromCart = ([ItmId, SizeId]) => {
    console.log("remove from cart", ItmId, SizeId, IdsOfItemsInCart);
    dispatch(removeFromCart([ItmId, SizeId]));
    setSelectedOptions([]);
  }
  const handleSizeSelection = (sizeId) => {

    setSelectedSizeId(sizeId);
    // You can perform any additional actions here based on the selected size ID
  };
  //functions end

  const totalPrice = ItemInCart.reduce((totalPrice, cartItem) => {
    // Extracting item price and extra price from cartItem
    const itemPrice = parseFloat(cartItem.Item.Item.Item_Price);
    const extraPrice = parseFloat(cartItem.Size.IS_ExtraPrice);
    const WhatsIncludedPrice = cartItem.WhatsIncluded.reduce((p, e) => {
      p += parseFloat(e.Price);
      return p;
    }, 0);

    // Adding item price, extra price, and WhatsIncludedPrice to the total price
    return totalPrice + itemPrice + extraPrice + WhatsIncludedPrice;
  }, 0).toFixed(2);


  return (
    <View style={{ width: "100%", height: "100%", }}>
      <StatusBar barStyle='light-content' backgroundColor={"black"} />
      <ScrollView>
        <View style={[st.root, { gap: 0, backgroundColor: "#EAF0F5", paddingBottom: 58 + 4, marginTop: StatusBar.currentHeight }]}>
          <View style={{ backgroundColor: "black", width: "100%" }}>
            <View style={[st.CloseBtnDiv,]}>
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Text style={{ fontSize: 25 }}>X</Text>
              </TouchableOpacity>
            </View>

          </View>
          <View style={st.SecImg}>
            <Image style={st.ItemImg} source={{ uri: Item.Item.Item_Image }} />
            <Text style={st.Title}>{Item.Item.Item_Title}</Text>
            <Text style={st.Subtitle}>{Item.Item.Item_SubTitle}</Text>
          </View>
          {
            Sizes.length != 0 ?
              <View style={st.Sec}>
                <Text style={[st.Heading]}>
                  Size Options
                </Text>
                <View style={st.SizeDiv}>
                  {Sizes.map((e, i) => (
                    <TouchableOpacity onPress={() => handleSizeSelection(e.IS_Id)} key={i}
                      style={[
                        st.SizeCard,
                        IdsOfItemsInCart.some(cartItem => cartItem[0] === ItemId && cartItem[1] === e.IS_Id) ? { borderWidth: 1, borderColor: "blue" } : null,
                        selectedSizeId == e.IS_Id ? { borderWidth: 1, borderColor: "red" } : null,
                      ]}>
                      <Image style={st.SizeCardImage} source={{ uri: e.IS_Icon }} />

                      <Text style={st.SizeCardText}>{e.IS_Title}</Text>
                      <Text style={st.SizeCardText}>${parseFloat(e.IS_ExtraPrice) + parseFloat(Item.Item.Item_Price)}</Text>
                    </TouchableOpacity>
                  ))}

                </View>
              </View>
              : null
          }

          <View style={st.Sec}>
            <Text style={st.Heading}>
              Whats Included/Extras
            </Text>
            {
              keysArray.map((key, index) => (
                <View key={index} >
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>{key}</Text>
                  <MultiSelectDropdown options={valuesArray[index]} Price={PriceArray[index]} />
                </View>
              ))
            }




          </View>
        </View>

      </ScrollView >

      {
        !IsItemPresentInCart ?
          <View style={st.AddToCart}>
            <Text style={st.Btn} onPress={AddToCartFunction}>Add To Order</Text>
            <View style={st.PickupAt}>
              <View style={{ flex: 99 }}>
                <Text style={{ color: "white" }}>PICKUP AT</Text>
                <Text style={{ color: "white" }}>lorem ipsm dipsm pipsm lipsm</Text>
              </View>
              <View >
                <Image source={require("../assets/icons/CartDone.png")} />
              </View>
            </View>
          </View>
          :
          <>
            <TouchableOpacity style={[st.AddToCart, { bottom: 70 }]} onPress={() => RemoveItemFromCart([ItemId, selectedSizeId])}>
              <View style={st.GoToCartBtn}>
                <Text style={[st.ViewCartText]}  >Remove From Cart</Text>

              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[st.AddToCart,]} onPress={() => props.navigation.navigate("CartModal")}>
              <View style={st.GoToCartBtn}>
                <Text style={[st.CountText]}>{ItemInCart.length}</Text>
                <Text style={[st.ViewCartText]}  >View Your Cart</Text>
                <Text style={[st.PriceText]} >${totalPrice}</Text>
              </View>
            </TouchableOpacity>
          </>
      }

    </View >
  )






}
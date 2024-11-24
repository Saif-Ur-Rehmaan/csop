
import { StyleSheet, Image, View, Text, Dimensions, Touchable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Tabs_HomeComponent from './Home/Tabs_HomeComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRComponent from './Payment/QRComponent';
import CartComponent from './CART/CartComponent';
import GiftComponent from './Gift/GiftComponent';
import OfferComponent from './Offer/OfferComponent';
import RestaurantListComponent from './RestaurantListComponent';
import { useSelector } from 'react-redux';
import GiftCardListComponent from './Gift/GiftCardListComponent';
import GiftCheckoutModalComponent from './Gift/GiftCheckoutModalComponent';
import NotificationListComponent from './NotificationListComponent';

const { height, width } = Dimensions.get('window');
const BottomTab = createBottomTabNavigator();

const styles = StyleSheet.create({
    TabBar: {
        height: "11%",
        minHeight: 80,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2B2B2A",
        paddingVertical: "5%",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    Label: {
        transform: [{ translateY: -height * 0.01 }],
        fontSize: width * 0.04,
        textAlign: "center"
    },
    Icon: {
        width: 24, // Specify the width you desire
        height: 24, // Specify the height you desire
        marginBottom: 10,
        opacity: 0.5,
    },

    ActiveIcon: {
        width: 28, // Specify the width you desire
        height: 28, // Specify the height you desire
        marginBottom: 10,
    },
    HomeHeader: {
        height: height * 0.15,
        backgroundColor: "#252729",

    },
    HeaderRightContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        gap: 15
    },
    HeaderText: {
        fontSize: width * 0.05,
        fontWeight: "500",
        color: 'white',
        marginLeft: 10,
    },
    headerIcon: {
        fontSize: 25,
        color: "white",
        opacity: 0.8
    },
    headerGift: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,


    },
    GiftSec: {
        flexDirection: "row",
        gap: 7,
        justifyContent: "center",
        alignItems: "center"
    }

});

const BottomTabComponent = (props) => {
    const f = useSelector(state => state.Franchise.FranchiseObj)
    const { Data } = useSelector(state => state.auth); // Access state.auth

    const { FranchiseId, FranchiseName, FranchiseAddress } = f;
    const UserName = Data.user.User_UserName;


    const OpenNotification = () => {
        props.navigation.navigate("NotificationList");
        console.log("Going to Notification list ")
    }
    const OpenMail = () => { console.warn("mail") }
    const OpenSearch = () => { console.warn("search") }
    const OpenLocation = () => { console.warn("location") }
    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.TabBar,
                tabBarActiveTintColor: "white",
                tabBarLabelStyle: styles.Label,
            }}>
            {
                FranchiseId ?
                    <BottomTab.Screen
                        name="index"
                        component={Tabs_HomeComponent}
                        options={{
                            headerShown: true,
                            headerStyle: styles.HomeHeader,
                            headerTitleAlign: 'left',
                            headerTitle: () => (
                                <View style={{ gap: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.95 }}>

                                        <Text style={styles.HeaderText}>{FranchiseName}</Text>
                                    </View>
                                    <Text style={{ color: "white", opacity: 0.7, fontSize: 11, width: width * 0.3, paddingLeft: 12 }} numberOfLines={1} ellipsizeMode="tail">
                                        {FranchiseAddress}
                                    </Text>

                                </View>
                            ),
                            headerRight: () => (
                                <View style={styles.HeaderRightContainer}>
                                    <TouchableOpacity onPress={OpenLocation}>
                                        <Image source={require("../images/icons/Location.png")} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={OpenMail}>
                                        <Image source={require("../images/icons/mail.png")} />
                                    </TouchableOpacity>
                                    <View>
                                        <Text style={{ color: "white", position: "absolute", backgroundColor: "red", zIndex: 1, right: 2, top: 3, width: 10, height: 10, textAlign: "center", textAlignVertical: "center", borderRadius: 7 }}></Text>
                                        <TouchableOpacity onPress={OpenNotification}>
                                            <Image source={require("../images/icons/bell.png")} />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            ),
                            tabBarIcon: ({ color, size, focused }) => (
                                <Image style={!focused ? styles.Icon : styles.ActiveIcon} source={require("../assets/icons/Home.png")} />

                            ),
                        }}
                    />
                    :
                    <BottomTab.Screen
                        name="index"
                        component={RestaurantListComponent}
                        options={{
                            title: "Home",

                            headerShown: false,
                            tabBarIcon: ({ color, size, focused }) => (
                                <Image style={!focused ? styles.Icon : styles.ActiveIcon} source={require("../assets/icons/Home.png")} />

                            ),
                        }}
                    />
            }
            <BottomTab.Screen
                name="QrCode"
                component={QRComponent}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Image style={!focused ? styles.Icon : styles.ActiveIcon} source={require("../assets/icons/QR.png")} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Cart"
                component={CartComponent}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Image style={!focused ? styles.Icon : styles.ActiveIcon} source={require("../assets/icons/Cart.png")} />),
                }}
            />
            <BottomTab.Screen
                name="Gift"
                component={GiftComponent}
                options={{
                    headerShown: true,
                    headerStyle: { ...styles.HomeHeader, ...styles.headerGift, },
                    headerTitleAlign: 'left',
                    headerTitle: () => (
                        <View style={{ gap: 15, flexDirection: "row", bottom: 0 }}>

                            <View style={styles.GiftSec}>
                                <Image style={{ resizeMode: "contain", width: 20 }} source={require("../images/icons/mail.png")} />
                                <Text style={{ color: "white" }}>Inbox</Text>

                            </View>
                            <View style={styles.GiftSec}>
                                <Image style={{ resizeMode: "contain", width: 12 }} source={require("../images/icons/Location.png")} />
                                <Text style={{ color: "white" }}>Stores</Text>

                            </View>

                        </View>
                    ),
                    headerRight: () => (
                        <View style={styles.HeaderRightContainer}>
                            <TouchableOpacity onPress={OpenSearch}>
                                <Image style={{ resizeMode: "contain", }} source={require("../images/icons/magnifyer.png")} />
                            </TouchableOpacity>
                            <View>
                                <Text style={{ color: "white", position: "absolute", backgroundColor: "red", zIndex: 1, right: 2, top: 3, width: 10, height: 10, textAlign: "center", textAlignVertical: "center", borderRadius: 7 }}></Text>
                                <TouchableOpacity onPress={OpenNotification}>
                                    <Image source={require("../images/icons/bell.png")} />
                                </TouchableOpacity>

                            </View>
                        </View>
                    ),
                    tabBarIcon: ({ color, size, focused }) => (
                        <Image style={!focused ? styles.Icon : styles.ActiveIcon} source={require("../assets/icons/Gift.png")} />
                    ),
                }}
            />
            {/* display none */}
            <BottomTab.Screen
                name="GiftCardList"
                component={GiftCardListComponent}
                options={{
                    headerShown: true,
                    title: 'Select your Gift Card',
                    headerTitleStyle: { transform: [{ translateY: 10 }], color: "white", marginLeft: width * 0.12, fontSize: width * 0.075 },
                    headerStyle: {
                        height: height * 0.15,
                        backgroundColor: "#2B2B2A",

                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20
                    },
                    tabBarButton: (props) => <View style={{ display: "none" }} />,
                }}
            />
            <BottomTab.Screen
                name="GiftCheckoutModal"
                component={GiftCheckoutModalComponent}
                options={{
                    headerShown: true,
                    tabBarStyle: { display: "none" },
                    title: 'Create eGift',
                    headerTitleStyle: { transform: [{ translateY: 10 }], color: "white", marginLeft: width * 0.25, fontSize: width * 0.075 },
                    headerStyle: {
                        height: height * 0.15,
                        backgroundColor: "#2B2B2A",
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 15
                    },
                    tabBarButton: (props) => <View style={{ display: "none" }} />,
                }}
            />
            <BottomTab.Screen
                name="NotificationList"
                component={NotificationListComponent}
                options={{
                    headerShown: true,
                    headerStyle: { ...styles.HomeHeader, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: height * 0.17, },
                    headerTitleAlign: 'left',
                    headerTitle: () => (
                        <View style={{ gap: 5, marginLeft: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.95 }}>
                                <Text style={[styles.HeaderText, { marginLeft: 0, fontSize: width * 0.08 }]} numberOfLines={1} ellipsizeMode='tail'>WELCOME {UserName}!!</Text>
                            </View>
                            <View style={{ gap: 15, flexDirection: "row", bottom: 0 }}>

                                <View style={styles.GiftSec}>
                                    <Image style={{ resizeMode: "contain", width: 20 }} source={require("../images/icons/mail.png")} />
                                    <Text style={{ color: "white" }}>Inbox</Text>

                                </View>
                                <View style={styles.GiftSec}>
                                    <Image style={{ resizeMode: "contain", width: 12 }} source={require("../images/icons/Location.png")} />
                                    <Text style={{ color: "white" }}>Stores</Text>

                                </View>

                            </View>

                        </View>
                    ),
                    headerRight: () => (
                        <View style={[styles.HeaderRightContainer, { flexDirection: "column", marginRight: 18 }]}>


                            <View>
                                <Text style={{ color: "white", position: "absolute", backgroundColor: "red", zIndex: 1, right: 2, top: 3, width: 10, height: 10, textAlign: "center", textAlignVertical: "center", borderRadius: 7 }}></Text>
                                <TouchableOpacity onPress={OpenNotification}>
                                    <Image source={require("../images/icons/bell.png")} />
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity onPress={OpenSearch}>
                                <Image source={require("../images/icons/magnifyer.png")} />
                            </TouchableOpacity>
                        </View>
                    ),
                    tabBarButton: (props) => <View style={{ display: "none" }} />
                }}
            />
            {/* display none end */}


            <BottomTab.Screen
                name="Offer"
                component={OfferComponent}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <Image style={!focused ? styles.Icon : styles.ActiveIcon} source={require("../assets/icons/Offer.png")} />),
                }}
            />

        </BottomTab.Navigator>
    );
}

export default BottomTabComponent;

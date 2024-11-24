import 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Dimensions } from 'react-native';

import HomeComponent from './HomeComponent';
import SeasonalComponent from './SeasonalComponent';
import PreviousComponent from './previousComponent';
import FavrouteComponent from './FavrouteComponent';

import { FetchMenuAndSeasonalCats } from '../../context/Features/Franchise/UserFranchiseSlice';
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import ListComponent from '../ListComponent';



const { width, height } = Dimensions.get('window');

const Styles = StyleSheet.create({
    Topbar: {
        backgroundColor: "#252729",

        paddingBottom: 5,
        width: "100%",
        justifyContent: "flex-end",

        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: "hidden",

        borderTopWidth: 0

    },
    Tab: {
        flex: 1,
        borderColor: "red",

    },
    label: {
        fontSize: width * 0.03
    }
})


const TopTab = createMaterialTopTabNavigator();




const Tabs_HomeComponent = (props) => {

    //fetch menu and seasonal and assign in UserFr..
    const UserFranc = useSelector(s => s.Franchise.FranchiseObj);
    const FrancId = UserFranc.FranchiseId;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(FetchMenuAndSeasonalCats(FrancId))
        //similarly set previous and favourts By dispatch(...)
    }, [])
    return (
        <TopTab.Navigator screenOptions={{
            tabBarStyle: Styles.Topbar,
            tabBarScrollEnabled: false,
            tabBarIndicatorStyle: { backgroundColor: 'white' },
            tabBarItemStyle: Styles.Tab,
            tabBarLabelStyle: Styles.label,
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "gray",
            // tabBarContentContainerStyle: { elevation: 0 }

        }} >

            <TopTab.Screen name='Menu' component={HomeComponent} />
            <TopTab.Screen name='Seasonal' component={SeasonalComponent} />
            <TopTab.Screen name='Previous' component={PreviousComponent} />
            <TopTab.Screen name='Favorits' component={FavrouteComponent} />

        </TopTab.Navigator>
    );
}
export default Tabs_HomeComponent;
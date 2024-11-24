import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

export default function PreviousComponent() {

  const UserFranc = useSelector(s => s.Franchise.FranchiseObj);
  const Previous = UserFranc.FranchisePrevious;
  if (!Previous) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Text>No Products Available</Text>
      </View>
    )
  } else {
    return (
      <View>
        <Text>PreviousComponent</Text>
      </View>
    )
  }
}
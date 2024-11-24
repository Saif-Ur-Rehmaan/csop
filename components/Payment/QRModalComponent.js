import { View, Text, Button } from 'react-native'
import React from 'react'

export default function QRModalComponent(props) {
    const [PaymetStatus, setPaymetStatus] = useState(false)
    const [Data, setData] = useState("payment success")
    const GotoCheckout = () => {
        props.navigation.goBack({ PaymetStatus, Data })
    }
    return (
        <View>
            <Text>QRComponent</Text>
            <Button onPress={() => GotoCheckout()} />
        </View>
    )
}
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux';

const NotificationListComponent = (props) => {
    const { width, height } = Dimensions.get('window');
    const st = StyleSheet.create({


        NotificationCard: {
            backgroundColor: "white",
            minHeight: 20,
            width: "90%",
            alignSelf: "center",
            paddingVertical: 15,
            paddingHorizontal: 10,
            elevation: 10,
            borderRadius: width * 0.01,
            // gap: 3
        },
        Heading: { fontSize: width * 0.04, fontWeight: "bold" },
        message: { opacity: 0.5, fontSize: width * 0.0335 }
    })
    const [messages, setMessages] = useState(null)
    const auth = useSelector(s => s.auth.Data);
    const { id } = auth.user;

    const obj = { UserId: id };
    const renderCount = useRef(0);


    useEffect(() => {
        const Initial = async () => {
            try {
                const response = await fetch("http://assignment.optikl.ink/api/users/GetNotifications", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj)
                });
                const data = await response.json();
                setMessages(data);
                renderCount.current++;
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        Initial();
        const interval = setInterval(async () => {
            console.log("🚀 ~ interval ~ Fetching messages ~ interval Id:", interval)
            try {
                const response = await fetch("http://assignment.optikl.ink/api/users/GetNotifications", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj)
                });
                const data = await response.json();
                setMessages(data);
                renderCount.current++;
            } catch (error) {
                console.error("Error fetching data at interval:", error);
            }
        }, 5000); // Run every 5 seconds (for testing)

        return () => {
            console.log("clearing");
            return clearInterval(interval);
        };
    }, []);



    if (!messages) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Text>Loading...</Text>
            </View>
        )
    }
    if (messages.data.length == 0) {
        return (
            <View style={{ justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Text>No messages...</Text>
            </View>
        )
    }

    // console.log(messages);
    const OpenMessage = (msg) => {
        console.log("going to single notification ");
    }
    return (
        <View style={{ height: "100%" }}>
            <ScrollView style={{ height: "100%", backgroundColor: "#EAF0F5" }}>
                <View style={{ width: width, gap: 20, justifyContent: "center", paddingVertical: 20 }}>
                    {
                        messages.data.map((msg, i) => (
                            <TouchableOpacity key={i} onPress={() => { OpenMessage(msg) }} style={st.NotificationCard}>
                                <Text style={st.Heading}>{msg.Notification_Heading}</Text>
                                <Text numberOfLines={2} ellipsizeMode='tail' style={st.message}>
                                    {msg.Notification_Message}
                                </Text>
                            </TouchableOpacity>

                        ))
                    }


                </View>
            </ScrollView>
        </View>
    )
}

export default NotificationListComponent
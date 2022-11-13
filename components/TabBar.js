import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"


const TabBar = () => {
    return (
        <View>
            <View className="flex-row items-center">
                <Image
                    source={{ uri: "https://motobus.app/wp-content/uploads/2021/08/Varlik-1-1.png" }}
                    className="w-10 h-10 p-6 mx-2 rounded-full"
                />

                <View className="flex-1">
                    <Text className="text-xs font-bold text-gray-500">Hemen Sipariş Ver!</Text>
                    <Text className="text-xl font-bold">
                        Mevcut Konumun <AntDesign name="down" style={{ color: "#53B2B8", fontSize: 18 }} />
                    </Text>
                </View>

                <AntDesign name='user' style={{ color: "#53B2B8", fontSize: 35, marginHorizontal: 4 }} />
            </View>

            <View className="flex-row items-center">
                <View className="bg-gray-200 m-2  p-2 flex-1 flex-row">
                    <AntDesign name='search1' style={{ color: "gray", fontSize: 25 }} />
                    <TextInput placeholder='Ne Yemek İstersiniz ?' className="mx-2"></TextInput>
                </View>

                <AntDesign name='menuunfold' style={{ color: "gray", fontSize: 25, marginHorizontal: 10 }} />
            </View>
        </View>
    )
}

export default TabBar
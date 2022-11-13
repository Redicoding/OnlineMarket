import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"

import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

const RestaurantCard = ({
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat
}) => {
    const navigation = useNavigation();
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Restaurants", {
                        id,
                        imgUrl,
                        title,
                        rating,
                        genre,
                        address,
                        short_description,
                        dishes,
                        long,
                        lat
                    })
                }}
                className="mr-3 shadow"
            >
                <Image source={{ uri: urlFor(imgUrl).url() }} className="w-56 h-36 rounded-sm" />

                <View className="px-2 pt-2 bg-white pb-5">
                    <Text className="font-bold text-lg">{title}</Text>

                    <View className="flex-row items-center space-x-2">
                        <AntDesign name='star' style={{ color: "green" }} />
                        <Text className="text-gray-500">{rating} - {genre}</Text>
                    </View>

                    <View className="flex-row items-center space-x-2 mt-1">
                        <AntDesign name='enviromento' />
                        <Text className="text-gray-500">{address}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        </View>
    )
}

export default RestaurantCard
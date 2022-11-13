import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { urlFor } from '../sanity';
import AntDesign from "react-native-vector-icons/AntDesign"
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';

const RestaurantsScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { params: {
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
    } } = useRoute();

    useEffect(() => {
        dispatch(setRestaurant({
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
        }))
    }, [dispatch])

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    })

    return (
        <>
            <BasketIcon />

            <ScrollView>
                <View>
                    <Image
                        source={{ uri: urlFor(imgUrl).url() }}
                        className="w-full h-52"
                    />
                    <TouchableOpacity onPress={navigation.goBack} className="absolute top-14 left-4 bg-gray-100 rounded-full p-1">
                        <AntDesign name='arrowleft' style={{ color: "#53B2B8", fontSize: 25 }} />
                    </TouchableOpacity>

                    <View className="bg-white pb-6">
                        <Text className="text-3xl font-bold m-3">{title}</Text>
                        <View className="opacity-50 flex-row items-center space-x-2 mx-3">
                            <AntDesign name='star' style={{ color: "green" }} />
                            <Text>{rating} - {genre}</Text>
                            <AntDesign name='enviromento' style={{ fontSize: 15 }} />
                            <Text>{address}</Text>
                        </View>
                        <Text className="mx-3 mt-4 ">{short_description}</Text>
                    </View>

                    <View>
                        <Text className="m-4 text-2xl font-bold">Menü</Text>

                        {/* DishRows */}
                        {dishes.map((dish) => (
                            <DishRow
                                key={dish._id}
                                id={dish._id}
                                name={dish.name}
                                description={dish.short_description}
                                price={dish.price}
                                image={dish.image}
                            />

                        ))}
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default RestaurantsScreen
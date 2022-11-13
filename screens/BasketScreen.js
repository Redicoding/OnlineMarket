import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurantItems } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import AntDesign from "react-native-vector-icons/AntDesign"
import { urlFor } from "../sanity"
import Currency from "react-currency-formatter"

const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurantItems);
    const basket = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const [groupItemsBasket, setGroupItemsBasket] = useState([]);
    const dispatch = useDispatch();
    const getirmeUcreti = 10;

    useEffect(() => {
        const groupItems = basket.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});

        setGroupItemsBasket(groupItems);
    }, [basket]);


    return (
        <SafeAreaView className="flex-1">
            <View className="bg-white pt-10 pb-5">
                <Text className="font-bold text-2xl text-center">Sepet</Text>
                <Text className="font-bold text-gray-300 text-center text-base">{restaurant.title}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-12 right-6">
                    <AntDesign name='closecircle' style={{ color: "#53B2B8", fontSize: 35 }} />
                </TouchableOpacity>
            </View>
            <View className="my-6 p-3 bg-white flex-row items-center">
                <Image
                    source={{ uri: "https://motobus.app/wp-content/uploads/2021/08/Varlik-1-1.png" }}
                    className="w-10 h-10 p-6 mx-2 rounded-full"
                />
                <Text className="font-bold flex-1">Getirme Süresi 30-40 dk.</Text>
                <TouchableOpacity>
                    <Text className="text-[#53B2B8]">Değiştir</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                {Object.entries(groupItemsBasket).map(([key, items]) => (
                    <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-3 border border-gray-200">
                        <Text className="text-[#53B2B8]">{items.length} x</Text>
                        <Image
                            source={{ uri: urlFor(items[0]?.image).url() }}
                            className="h-12 w-12 rounded-full"
                        />
                        <Text className="flex-1 ">{items[0]?.name}</Text>
                        <Text className="text-gray-500">
                            <Currency quantity={items[0].price} currency="TRY" />
                        </Text>
                        <TouchableOpacity onPress={() => dispatch(removeFromBasket({ id: key }))}>
                            <Text className="text-[#53B2B8]">
                                Kaldır
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <View className="p-4 space-y-2 bg-white">
                <View className="flex-row">
                    <Text className="flex-1 text-gray-400">Toplam</Text>
                    <Text className="text-gray-400"><Currency quantity={basketTotal} currency="TRY" /></Text>
                </View>
                <View className="flex-row">
                    <Text className="flex-1 text-gray-400">Getirme Ücreti</Text>
                    <Text className="text-gray-400"><Currency quantity={getirmeUcreti} currency="TRY" /></Text>
                </View>
                <View className="flex-row">
                    <Text className="flex-1 font-bold">Toplam Tutar</Text>
                    <Text className="font-extrabold"><Currency quantity={basketTotal + getirmeUcreti} currency="TRY" /></Text>
                </View>
                <TouchableOpacity className="items-center bg-[#53B2B8] p-3 rounded-lg ">
                    <Text className="text-white font-bold text-lg">Sipariş Ver</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default BasketScreen
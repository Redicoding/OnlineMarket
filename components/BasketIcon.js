import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import Currency from "react-currency-formatter"
import BasketScreen from '../screens/BasketScreen'

const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const navigation = useNavigation();

    if (items.length == 0) return null;
    return (
        <View className="z-50 absolute bottom-10 w-full">
            <TouchableOpacity onPress={() => navigation.navigate("Basket")} className="flex-row bg-[#53B2B8] p-4 rounded-xl items-center m-4">
                <Text className="text-lg text-white font-extrabold bg-[#3f929891] py-1 px-2 rounded-xl">{items.length}</Text>
                <Text className="flex-1 text-center text-white font-bold text-lg">Sepeti Görüntüle</Text>
                <Text className="text-white font-extrabold text-l"><Currency quantity={basketTotal} currency="TRY" /></Text>
            </TouchableOpacity>
        </View>
    )
}

export default BasketIcon
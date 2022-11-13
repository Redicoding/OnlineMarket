import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Currency from 'react-currency-formatter';
import { urlFor } from '../sanity';
import AntDesign from "react-native-vector-icons/AntDesign"
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector(state => selectBasketItemsWithId(state, id))

    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }))
    }

    const removeItemToBasket = () => {
        if (!items.length > 0) return;

        dispatch(removeFromBasket({ id }))
    }

    return (
        <>
            <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
                <View className={`flex-row justify-between bg-white py-2 pb-5 border border-gray-200 items-center 
                    ${isPressed && "border-b-0"}`
                }>
                    <View className="m-2 space-y-2">
                        <Text className="text-lg">{name}</Text>
                        <Text className="text-gray-400">{description}</Text>
                        <Text className="text-gray-500"><Currency quantity={price} currency="TRY" /></Text>
                    </View>
                    <View className="pr-3">
                        <Image
                            source={{ uri: urlFor(image).url() }}
                            className="w-20 h-20"
                        />
                    </View>
                </View>
            </TouchableOpacity>
            {isPressed && (
                <View className="flex-row space-x-2 items-center bg-white border-b border-gray-200 pb-2 pl-1">
                    <TouchableOpacity onPress={removeItemToBasket} disabled={!items.length}>
                        <AntDesign name='minuscircle' style={{ color: items.length > 0 ? "#53B2B8" : "gray", fontSize: 32 }} />
                    </TouchableOpacity>

                    <Text>{items.length}</Text>

                    <TouchableOpacity onPress={addItemToBasket}>
                        <AntDesign name='pluscircle' style={{ color: "#53B2B8", fontSize: 32 }} />
                    </TouchableOpacity>
                </View>
            )}
        </>
    )
}

export default DishRow
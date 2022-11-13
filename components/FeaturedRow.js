import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from "react-native-vector-icons/AntDesign"
import RestaurantCard from './RestaurantCard'

import sanityClient from "../sanity"

const FeaturedRow = ({ id, title, description }) => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "featured" && _id == $id]{
                ...,
                restaurants[]->{
                ...,
                dishes[]->,
                type->{
                  name
                }
              },
              }[0]`, { id }
        ).then((data) => { setRestaurants(data?.restaurants) })
    }, [id])


    return (
        <View>
            <View className="flex-row justify-between mt-4 mx-2">
                <Text className="text-lg font-bold">{title}</Text>
                <AntDesign name='arrowright' style={{ color: "#53B2B8", fontSize: 25 }} />
            </View>
            <Text className="text-gray-400 font-bold text-xs mx-2">{description}</Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-3 py-3"
            >
                {/* Restaurant Cards */}

                {restaurants?.map(restaurants => (
                    <RestaurantCard
                        key={restaurants._id}
                        id={restaurants._id}
                        imgUrl={restaurants.image}
                        title={restaurants.name}
                        rating={restaurants.rating}
                        genre={restaurants.type?.name}
                        address={restaurants.address}
                        short_description={restaurants.short_description}
                        dishes={restaurants.dishes}
                        long={restaurants.long}
                        lat={restaurants.lat}
                    />
                ))}


            </ScrollView>
        </View>
    )
}

export default FeaturedRow
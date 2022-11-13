import { SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import Categories from '../components/Categories'
import TabBar from '../components/TabBar'
import FeaturedRow from '../components/FeaturedRow'

import sanityClient from "../sanity"


const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, [])

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == "featured"]{
                ...,
                restaurants[]->{
                ...,
                dishes[]->
              }
              }`
        ).then(data => setFeaturedCategories(data))
    }, [])

    return (
        <SafeAreaView className="pt-10 bg-white mb-28">
            <TabBar />

            <ScrollView className="bg-gray-200 ">
                {/* Categories */}
                <Categories />

                {/* Featured Rows */}
                {featuredCategories?.map(category => (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}
            </ScrollView>

        </SafeAreaView>
    )
}

export default HomeScreen;
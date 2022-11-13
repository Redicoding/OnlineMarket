import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import { urlFor } from '../sanity'

const CategoryCard = ({ imgUrl, title }) => {
    return (
        <TouchableOpacity>
            <Image source={{ uri: urlFor(imgUrl).url() }} className="h-24 w-32 rounded-2xl mx-2" />
            <Text className="absolute bottom-1 left-4 text-white font-bold">{title}</Text>
        </TouchableOpacity>
    )
}

export default CategoryCard
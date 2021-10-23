import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native'

const News = () => {
    const [news, setNews] = useState([])

    const getNews = async () => {
        try {
            const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Flenta.ru%2Frss%2Flast24')
            const json = await response.json()
            setNews(json.items)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getNews()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Новости</Text>
            {
                news.map((object, index) => {
                    return (
                        <TouchableOpacity
                            onPress={() => Linking.openURL(object.link)}
                            style={styles.card}
                            key={index}
                        >
                            <Image
                                source={{ uri: object.enclosure.link }}
                                style={{ height: 200, borderRadius: 20, marginHorizontal: 20 }}
                            />
                            <Text style={styles.newsTitle}>{object.title}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 20
    },
    title: {
        fontSize: 19,
        fontWeight: '600',
        marginBottom: 15,
        marginHorizontal: 20
    },
    newsTitle: {
        marginTop: 10,
        marginBottom: 15,
        marginHorizontal: 20
    },
    card: {
        borderBottomColor: '#d8d8e4',
        borderBottomWidth: 0.8,
        marginTop: 15
    }
})

export default News
import chineseWords from '@/assets/data/chineseWords';
import frenchWords from '@/assets/data/frenchWords';
import germanWords from '@/assets/data/germanWords';
import italianWords from '@/assets/data/italianWords';
import japanseWords from '@/assets/data/japaneseWords';
import spanishWords from '@/assets/data/spanishWords';
import { Colors } from '@/constants/Colors';
import { useFavoriteStore } from '@/store/useWordStore';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    FlatList,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function WordlistScreen() {
    const { language }: { language: string } = useLocalSearchParams();
    const [words, setWords] = useState<{ id: string; word: string; pinyin?: string; romaji?: string; meaning: string }[]>([]);
    const { toggleFavorite, isFavorite } = useFavoriteStore();

    useEffect(() => {
        if (language === "Chinese") setWords(chineseWords);
        else if (language === "Japanese") setWords(japanseWords);
        else if (language === "German") setWords(germanWords);
        else if (language === "Italian") setWords(italianWords);
        else if (language === "French") setWords(frenchWords);
        else if (language === "Spanish") setWords(spanishWords);
        else {
            setWords([]);
        }
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
            <View style={{ flex: 1, width: '100%', backgroundColor: Colors.dark.background, padding: 15 }}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text style={styles.headerTitle}>{language}</Text>
                    <View style={{ width: 24 }} />
                </View>

                <FlatList
                    data={words}
                    keyExtractor={(item) => `${item.id}-${item.word}${Math.random() * 10000}`}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.row}>
                                <View>
                                    <Text style={styles.word}>{item.word} {item.romaji && `(${item.romaji})`} {item.pinyin && `(${item.pinyin})`} </Text>
                                    <Text style={styles.meaning}>{item.meaning}</Text>
                                </View>
                                <Pressable onPress={() => {
                                    toggleFavorite(item)
                                }}>
                                    <Ionicons
                                        name={isFavorite(item.word) ? 'star' : 'star-outline'}
                                        size={24}
                                        color={isFavorite(item.word) ? '#ffd700' : '#a2abb3'}
                                    />
                                </Pressable>
                            </View>
                        )
                    }
                    }
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111418',
        paddingHorizontal: 16,
        paddingVertical: 12,
        justifyContent: 'space-between',
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1c2127',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    word: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    meaning: {
        color: '#a2abb3',
        fontSize: 14,
        marginTop: 4,
    },
    separator: {
        height: 12,
    },
});

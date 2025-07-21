import { Flashcard } from '@/components/ui/Flashcard';
import { Colors } from '@/constants/Colors';
import { useFavoriteStore } from '@/store/useWordStore';
import { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';


const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export default function FlashcardsScreen() {
    const { favorites } = useFavoriteStore();

    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const goToIndex = (index: number) => {
        if (index >= 0 && index < favorites.length) {
            setCurrentIndex(index);
            flatListRef.current?.scrollToIndex({ index, animated: true });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>
                    Flashcards for favourites
                </Text>
                <View style={{ width: 24 }} />
            </View>

            {favorites.length > 0 ? <FlatList
                getItemLayout={(_, index) => ({
                    length: width,
                    offset: width * index,
                    index,
                })}
                initialScrollIndex={currentIndex}
                data={favorites}
                ref={flatListRef}
                horizontal
                pagingEnabled
                keyExtractor={(item) => item.word}
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(newIndex);
                }}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <Flashcard front={item.word} back={item.meaning} frontHalf={
                            item.romaji ? item.romaji : item.pinyin ? item.pinyin : ''
                        } />
                    </View>
                )}
            />
                : (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>No flashcards available</Text>
                    </View>
                )
            }

            {/* Navigation Buttons */}
            <View style={styles.buttonRow}>
                <Pressable
                    onPress={() => goToIndex(currentIndex - 1)}
                    disabled={currentIndex === 0}
                    style={[
                        styles.navButton,
                        currentIndex === 0 && styles.navButtonDisabled,
                    ]}
                >
                    <Text style={styles.navButtonText}>Previous</Text>
                </Pressable>
                <Text style={styles.progressText}>
                    {currentIndex + 1} / {favorites.length}
                </Text>
                <Pressable
                    onPress={() => goToIndex(currentIndex + 1)}
                    disabled={currentIndex === favorites.length - 1}
                    style={[
                        styles.navButton,
                        currentIndex === favorites.length - 1 && styles.navButtonDisabled,
                    ]}
                >
                    <Text style={styles.navButtonText}>Next</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111418',
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
    cardWrapper: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        alignItems: 'center',
        position: 'absolute',
        bottom: height * .20,
        width,

    },
    navButton: {
        backgroundColor: '#2c3035',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    navButtonDisabled: {
        opacity: 0.4,
    },
    navButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    progressText: {
        color: 'white',
        fontSize: 16,
    },
});

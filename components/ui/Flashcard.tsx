import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

export function Flashcard({ front, frontHalf, back }: { front: string; frontHalf?: string; back: string }) {
    const [flipped, setFlipped] = useState(false);
    const rotation = useSharedValue(0);

    const flip = () => {
        const next = flipped ? 0 : 180;
        setFlipped(!flipped);
        rotation.value = withTiming(next, { duration: 300 });
    };

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const rotateY = `${interpolate(rotation.value, [0, 180], [0, 180])}deg`;
        return {
            transform: [{ rotateY }],
            opacity: rotation.value < 90 ? 1 : 0,
            backfaceVisibility: 'hidden',
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        const rotateY = `${interpolate(rotation.value, [0, 180], [180, 360])}deg`;
        return {
            transform: [{ rotateY }],
            opacity: rotation.value > 90 ? 1 : 0,
            backfaceVisibility: 'hidden',
        };
    });

    return (
        <Pressable onPress={flip}>
            <View style={styles.cardContainer}>
                <Animated.View style={[styles.card, styles.front, frontAnimatedStyle]}>
                    <Text style={styles.text}>{front} {frontHalf && `(${frontHalf})`}</Text>
                </Animated.View>
                <Animated.View style={[styles.card, styles.back, backAnimatedStyle]}>
                    <Text style={styles.text}>{back}</Text>
                </Animated.View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: 300,
        height: 200,
        marginVertical: 20,
        alignSelf: 'center',
    },
    card: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    front: {
        backgroundColor: '#2c3035',
    },
    back: {
        backgroundColor: '#39424e',
    },
    text: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
    },
});

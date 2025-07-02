import { StyleSheet, Text, View } from "react-native";

export default function FlashcardsScreen() {
    return (
        <View style={styles.container}>

            <Text>
                This screen will allow you to create, review, and manage your flashcards effectively.
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});

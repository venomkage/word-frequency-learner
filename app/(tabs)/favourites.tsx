import { Colors } from '@/constants/Colors';
import { useFavoriteStore } from '@/store/useWordStore';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function FavouritesScreen() {
  const favouriteWords = useFavoriteStore((state) => state.favorites);
  const { toggleFavorite } = useFavoriteStore();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark.background }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      <View style={{ flex: 1, width: '100%', backgroundColor: Colors.dark.background, padding: 15 }}>

        <Text style={styles.headerTitle}>Saved Words</Text>

        <FlatList
          data={favouriteWords}
          keyExtractor={(item) => item.word}
          contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.word}>{item.word}</Text>
                <Text style={styles.meaning}>{item.meaning}</Text>
              </View>
              <Pressable onPress={() => toggleFavorite(item)}>
                <Ionicons name="trash-outline" size={22} color="#a2abb3" />
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  item: {
    backgroundColor: '#1c2127',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { Dimensions, FlatList, ImageBackground, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

const TILE_DATA = [
  { id: '1', title: 'Chinese', image: require('@/assets/images/chinese.png'), slug: 'chinese' },
  { id: '2', title: 'Japanese', image: require('@/assets/images/japanese.png'), slug: 'japanese' },
  { id: '3', title: 'German', image: require('@/assets/images/german.png'), slug: 'german' },
  { id: '4', title: 'Italian', image: require('@/assets/images/italian.png'), slug: 'italian' },
  { id: '5', title: 'French', image: require('@/assets/images/french.png'), slug: 'french' },
  { id: '6', title: 'Spanish', image: require('@/assets/images/spanish.png'), slug: 'spanish' },

];

const TILE_SIZE = (Dimensions.get('window').width - 45) / 2;

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark.background }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark.background} />
      <View style={{ flex: 1, width: '100%', backgroundColor: Colors.dark.background, padding: 15 }}>


        <Text style={styles.headerTitle}>Choose a language</Text>


        {/* Tiles 2 columns and so on rows */}
        <FlatList
          data={TILE_DATA}
          keyExtractor={(item) => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => router.push(`/(home)/${item.title}`)} style={styles.tileWrapper}>
              <ImageBackground
                source={item.image}
                style={styles.tile}
                imageStyle={{ borderRadius: 12 }}
                resizeMode="cover"
              >
                <View style={styles.overlay} />
                <Text style={styles.tileText}>{item.title}</Text>
              </ImageBackground>
            </Pressable>
          )}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tileWrapper: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 12,
  },
  tileText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },

});

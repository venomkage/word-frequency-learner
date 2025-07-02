import { StyleSheet, Text, View } from 'react-native';


export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text>
        Here, there will be a list of your favourite words, phrases, or sentences that you have saved for quick access.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

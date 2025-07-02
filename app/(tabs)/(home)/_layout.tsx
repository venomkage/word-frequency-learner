import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',

        }}
      />
      <Stack.Screen
        name="explore"
        options={{
          title: 'Explore',

        }}
      />
    </Stack>
  );
}

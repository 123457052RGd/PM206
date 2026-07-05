import React from 'react';
import { StatusBar } from 'expo-status-bar';
import LibrosScreen from './screens/LibrosScreen';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <LibrosScreen />
    </>
  );
}
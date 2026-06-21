import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import TarjetasScreen from './TarjetasScreen';
import SafeAreaScreen from './SafeAreaScreen';
import PressableScreen from './PressableScreen';
import TextInputScreen from './TextInputScreen';
import FlatListScreen from './FlatList';
import ImageBackgroundScreen from './ImageBackGroungScreen';


export default function MenuScreen() {
    const [screen,setScreen] =  useState('menu');

    switch(screen){ 
        case 'tarjetas':
            return <TarjetasScreen/>
        case 'safeArea':
            return <SafeAreaScreen/>
        case 'pressable':
            return <PressableScreen/>
        case 'textInput':
            return <TextInputScreen/>
        case 'flatList':
            return <FlatList/>
        case 'imageBack':
            return <ImageBackGroungScreen/>
        case 'activity':
            return <ActivityIndicadorScreen/>
        case 'modal':
            return <ModalScreen/>

        case 'menu':
            default:
            return (
                <View style={styles.container}>

                    <Text> Menu de Practicas </Text>

                    <Button onPress={()=>setScreen('tarjetas')} title='Tarjetas'/>

                    <Button onPress={()=>setScreen('safeArea')} title='SafeAreaView'/>

                    <Button onPress={()=>setScreen('pressable')} title='Pressable'/>

                    <Button onPress={()=>setScreen('textInput')} title='TextInput'/>

                    <Button onPress={()=>setScreen('flatList')} title='FlatList'/>

                    <Button onPress={()=>setScreen('imageBack')} title='ImageBackGroung'/>

                    <Button onPress={()=>setScreen('activity')} title='ActivityIndicator'/>

                    <Button onPress={()=>setScreen('modal')} title='Modal'/>

                    <StatusBar style="auto" />

                </View>
            );
    }
}

/*Zona3: Estilos y posicionamientos*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
});
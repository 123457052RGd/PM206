/*Zona1: Importaciones de componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import MenuScreen from './screens/MenuScreen';




/*Zona2: Main - */
export default function App() {
  return (
    <View style={styles.container}>
      <MenuScreen/>

      <StatusBar style="auto" />

    </View>
  );
}


/*Zona3: Estilos y posicionamientos*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'center'
  },
  
  tarjetaRoja: {
    backgroundColor: '#adadb6'
  },
  tarjetaVerde: {
    backgroundColor: '#6BCB77'
  },
});





/*Zona1: Importaciones de componentes y archivos*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import { Perfil } from '../components/Perfil';

/*Zona2: Main - */
export default function TarjetasScreen() {
return (

    <View style={styles.container}>
        <Perfil style={styles.tarjetaRoja} nombre="Diego Rubio Guerrero" carrera=" ingeneria en Sistemas" materia="Programacion Movil" cuatri="9"></Perfil>

  <Perfil 
      style={styles.tarjetaVerde}
      nombre="Rubio" 
      carrera=" ing en Sistemas" 
      materia="desarrollo movil avanzado" 
      cuatri="egresado ya casi">
      </Perfil>

      <Perfil style={styles.tarjetaRoja} nombre="tovar" carrera="Sistemas" materia="Programacion Movil" cuatri="9"></Perfil>


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


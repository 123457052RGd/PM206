import React, { useState } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';


export default function ActualizarUsuario() {

  const { usuario } = useLocalSearchParams();
  const router = useRouter();

  // Validación para evitar error si no llega el usuario
  if (!usuario) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}>
          No se encontró información del usuario
        </Text>
      </SafeAreaView>
    );
  }


  const datosUsuario = JSON.parse(usuario);


  const [nombre, setNombre] = useState(datosUsuario.nombre);
  const [edad, setEdad] = useState(String(datosUsuario.edad));
  const [cargando, setCargando] = useState(false);


  const mostrarMensaje = (titulo, mensaje) => {

    if (Platform.OS === 'web') {

      window.alert(`${titulo}\n${mensaje}`);

    } else {

      Alert.alert(titulo, mensaje);

    }

  };


  const actualizarUsuario = async () => {


    if (nombre.trim() === '' || edad.trim() === '') {

      mostrarMensaje(
        'Campos vacíos',
        'Por favor completa todos los campos'
      );

      return;

    }


    try {

      setCargando(true);


      const respuesta = await fetch(
        `http://10.117.254.172:5000/v1/usuarios/${datosUsuario.id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('admin:1234'),
          },

          body: JSON.stringify({
            nombre: nombre,
            edad: Number(edad),
          }),

        }
      );


      const datos = await respuesta.json();


      console.log('Respuesta UPDATE:', datos);



      if (respuesta.ok) {


        mostrarMensaje(
          'Actualización exitosa',
          'El usuario se actualizó correctamente'
        );


        router.replace('/(tabs)/consulta');


      } else {


        mostrarMensaje(
          'Error',
          datos.detail || datos.message || 'No se pudo actualizar el usuario'
        );


      }



    } catch (error) {


      console.log('Error UPDATE:', error);


      mostrarMensaje(
        'Error',
        'No se pudo conectar con la API'
      );


    } finally {


      setCargando(false);


    }

  };



  return (

    <SafeAreaView style={styles.container}>


      <Text style={styles.titulo}>
        Actualizar Usuario
      </Text>



      <View style={styles.card}>


        <Text style={styles.label}>
          Nombre
        </Text>


        <TextInput

          style={styles.input}

          value={nombre}

          onChangeText={setNombre}

          placeholder="Nombre"

        />



        <Text style={styles.label}>
          Edad
        </Text>



        <TextInput

          style={styles.input}

          value={edad}

          onChangeText={setEdad}

          placeholder="Edad"

          keyboardType="numeric"

        />



        <TouchableOpacity

          style={styles.boton}

          onPress={actualizarUsuario}

          disabled={cargando}

        >

          <Text style={styles.textoBoton}>

            {cargando ? 'Guardando...' : 'Guardar cambios'}

          </Text>


        </TouchableOpacity>


      </View>


    </SafeAreaView>

  );

}



const styles = StyleSheet.create({


  container: {

    flex: 1,

    backgroundColor: '#F5F6FA',

    padding: 15,

  },


  titulo: {

    fontSize: 22,

    fontWeight: 'bold',

    textAlign: 'center',

    color: '#1F2937',

    marginBottom: 15,

  },


  card: {

    backgroundColor: '#FFFFFF',

    borderRadius: 10,

    padding: 18,

    elevation: 4,

  },


  label: {

    fontSize: 13,

    color: '#6B7280',

    marginBottom: 5,

    marginTop: 8,

  },


  input: {

    borderWidth: 1,

    borderColor: '#D1D5DB',

    borderRadius: 8,

    paddingHorizontal: 12,

    height: 45,

    fontSize: 16,

    color: '#1F2937',

    backgroundColor: '#FFFFFF',

  },


  boton: {

    backgroundColor: '#FACC15',

    height: 42,

    borderRadius: 8,

    alignItems: 'center',

    justifyContent: 'center',

    marginTop: 20,

  },


  textoBoton: {

    color: '#FFFFFF',

    fontSize: 15,

    fontWeight: 'bold',

  },


});
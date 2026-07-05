import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Alert,
  ActivityIndicator,
  ImageBackground,
  Image
} from 'react-native';

import * as SplashScreen from 'expo-splash-screen';

import fondo from '../assets/fondo.png';
import logo from '../assets/logo.png';

export default function LibrosScreen() {

  // Splash
  const [mostrarSplash, setMostrarSplash] = useState(true);

  // Estados del formulario
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');

  // Lista de libros
  const [libros, setLibros] = useState([]);

  // Loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    setTimeout(() => {
      setMostrarSplash(false);
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

  const agregarLibro = () => {

    if (!titulo || !autor || !genero) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    setLoading(true);

    setTimeout(() => {

      const nuevoLibro = {
        id: Date.now().toString(),
        titulo,
        autor,
        genero,
      };

      setLibros([...libros, nuevoLibro]);

      setTitulo('');
      setAutor('');
      setGenero('');

      setLoading(false);

      Alert.alert('Correcto', 'Libro agregado correctamente');

    }, 4000);

  };

  if (mostrarSplash) {
    return (
      <View style={styles.splash}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.splashTexto}>
          Registro de Libros
        </Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={fondo}
      resizeMode="cover"
      style={styles.background}
    >

      <View style={styles.contenedor}>

        <Text style={styles.titulo}>
          Registro de Libros Leídos
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Título del libro"
          value={titulo}
          onChangeText={setTitulo}
        />

        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={autor}
          onChangeText={setAutor}
        />

        <TextInput
          style={styles.input}
          placeholder="Género"
          value={genero}
          onChangeText={setGenero}
        />

        <Pressable
          style={styles.boton}
          onPress={agregarLibro}
        >
          <Text style={styles.textoBoton}>
            Agregar Libro
          </Text>
        </Pressable>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ marginTop: 15 }}
          />
        )}

        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <Text style={styles.nombreLibro}>
                {item.titulo}
              </Text>

              <Text>
                Autor: {item.autor}
              </Text>

              <Text>
                Género: {item.genero}
              </Text>
            </View>
          )}
        />

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 25,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },

  boton: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  tarjeta: {
    backgroundColor: '#ffffffdd',
    padding: 15,
    marginTop: 10,
    borderRadius: 10,
  },

  nombreLibro: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  logo: {
    width: 180,
    height: 180,
    marginBottom: 20,
    resizeMode: 'contain',
  },

  splashTexto: {
    fontSize: 28,
    fontWeight: 'bold',
  },

});
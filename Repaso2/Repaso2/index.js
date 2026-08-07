import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

// Dirección con el prefijo /v1/usuarios según Swagger
const API_URL =
  Platform.OS === 'web'
    ? 'http://localhost:5000/v1/usuarios'
    : 'http://192.168.100.99:5000/v1/usuarios';

export default function HomeScreen() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [cargando, setCargando] = useState(false);

  // Obtener lista de usuarios
  const obtenerUsuarios = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch(`${API_URL}/`);
      const data = await respuesta.json();
      // Swagger muestra que los datos vienen dentro de data.usuarios
      setUsuarios(data.usuarios || []);
    } catch (error) {
      console.log('Error al obtener usuarios:', error);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  // Crear usuario
  const handleCrear = async () => {
    if (!nombre || !edad) {
      Alert.alert('Atención', 'Ingresa nombre y edad.');
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, edad: Number(edad) }),
      });

      if (respuesta.ok) {
        setNombre('');
        setEdad('');
        obtenerUsuarios(); // Recargar lista
      } else {
        Alert.alert('Error', 'No se pudo crear el usuario.');
      }
    } catch (error) {
      Alert.alert('Error', 'Error de conexión al crear usuario.');
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Registro de Usuarios</Text>

      {/* Formulario de Registro */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />
        <TouchableOpacity style={styles.btnGuardar} onPress={handleCrear}>
          <Text style={styles.btnTexto}>Agregar Usuario</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Usuarios */}
      {cargando ? (
        <ActivityIndicator size="large" color="#2563EB" />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: '/detalle',
                  params: { usuario: JSON.stringify(item) },
                })
              }
            >
              <Text style={styles.cardNombre}>{item.nombre}</Text>
              <Text style={styles.cardEdad}>Edad: {item.edad}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.vacio}>No hay usuarios registrados</Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F3F4F6' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  form: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 10, marginBottom: 10 },
  btnGuardar: { backgroundColor: '#2563EB', padding: 12, borderRadius: 8, alignItems: 'center' },
  btnTexto: { color: '#FFF', fontWeight: 'bold' },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 8, marginBottom: 10 },
  cardNombre: { fontSize: 18, fontWeight: 'bold' },
  cardEdad: { color: '#4B5563' },
  vacio: { textAlign: 'center', color: '#6B7280', marginTop: 20 },
});

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
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const API_URL =
  Platform.OS === 'web'
    ? 'http://localhost:5000'
    : 'http://192.168.100.99:5000';

export default function DetalleScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Obtener los datos pasados por parámetro
  const usuarioData = params.usuario ? JSON.parse(params.usuario) : {};

  const [id] = useState(usuarioData.id);
  const [nombre, setNombre] = useState(usuarioData.nombre || '');
  const [edad, setEdad] = useState(String(usuarioData.edad || ''));
  const [cargando, setCargando] = useState(false);

  // Petición para actualizar usuario
  const handleActualizar = async () => {
    if (!nombre || !edad) {
      Alert.alert('Campos requeridos', 'Por favor llena todos los campos.');
      return;
    }

    setCargando(true);
    try {
      const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, edad: Number(edad) }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar');
      }

      Alert.alert('Éxito', 'Usuario actualizado correctamente', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.log('Error al actualizar:', error);
      if (Platform.OS === 'web') {
        window.alert('Error de conexión al intentar actualizar');
      } else {
        Alert.alert('Error', 'Error de conexión con el servidor');
      }
    } finally {
      setCargando(false);
    }
  };

  // Petición para eliminar usuario
  const handleEliminar = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar');
      }

      Alert.alert('Éxito', 'Usuario eliminado correctamente', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.log('Error al eliminar:', error);
      if (Platform.OS === 'web') {
        window.alert('Error de conexión al intentar eliminar');
      } else {
        Alert.alert('Error', 'Error de conexión al intentar eliminar');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Detalles del Usuario</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Nombre del usuario"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Edad</Text>
        <TextInput
          style={styles.input}
          value={edad}
          onChangeText={setEdad}
          keyboardType="numeric"
          placeholder="Edad del usuario"
        />
      </View>

      {cargando ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 20 }} />
      ) : (
        <View style={styles.botonera}>
          <TouchableOpacity style={styles.btnEditar} onPress={handleActualizar}>
            <Text style={styles.btnTexto}>Actualizar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnEliminar} onPress={handleEliminar}>
            <Text style={styles.btnTexto}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#1F2937',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  botonera: {
    marginTop: 20,
    gap: 10,
  },
  btnEditar: {
    backgroundColor: '#EAB308',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnEliminar: {
    backgroundColor: '#EF4444',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
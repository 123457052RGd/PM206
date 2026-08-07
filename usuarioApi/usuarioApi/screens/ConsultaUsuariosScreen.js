import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

// Dirección IP de tu red local
const API_URL =
  Platform.OS === 'web'
    ? 'http://localhost:5000'
    : 'http://192.168.100.99:5000';

export default function ConsultaUsuariosScreen() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarUsuarios = async () => {
    setCargando(true);
    try {
      const respuesta = await fetch(`${API_URL}/usuarios`);
      const datos = await respuesta.json();

      console.log('RESPUESTA USUARIOS:', datos);

      if (!respuesta.ok) {
        throw new Error('Error al consultar usuarios');
      }

      // Validar formato de respuesta
      if (Array.isArray(datos)) {
        setUsuarios(datos);
      } else if (Array.isArray(datos.usuarios)) {
        setUsuarios(datos.usuarios);
      } else if (Array.isArray(datos.data)) {
        setUsuarios(datos.data);
      } else {
        console.log('Formato desconocido:', datos);
        setUsuarios([]);
      }
    } catch (error) {
      console.log('ERROR CONSULTA:', error);

      if (Platform.OS === 'web') {
        window.alert('Error\nNo se pudieron cargar los usuarios');
      } else {
        Alert.alert('Error', 'No se pudieron cargar los usuarios');
      }
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const abrirDetalle = (usuario) => {
    router.push({
      pathname: '/detalle',
      params: {
        usuario: JSON.stringify(usuario),
      },
    });
  };

  const renderUsuario = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => abrirDetalle(item)}
      >
        <Text style={styles.nombre}>{item.nombre}</Text>
        <Text style={styles.edad}>Edad: {item.edad}</Text>
        <Text style={styles.ver}>Ver detalles</Text>
      </TouchableOpacity>
    );
  };

  if (cargando) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.cargando}>Cargando usuarios...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Lista de Usuarios</Text>

      {usuarios.length === 0 ? (
        <View style={styles.vacio}>
          <Text style={styles.vacioTexto}>No hay usuarios registrados</Text>
          <TouchableOpacity style={styles.boton} onPress={cargarUsuarios}>
            <Text style={styles.botonTexto}>Recargar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item, index) => String(item.id ?? index)}
          renderItem={renderUsuario}
          contentContainerStyle={styles.lista}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginVertical: 15,
  },
  lista: {
    padding: 10,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  edad: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 5,
  },
  ver: {
    fontSize: 13,
    color: '#2563EB',
    marginTop: 10,
    fontWeight: 'bold',
  },
  cargando: {
    textAlign: 'center',
    marginTop: 10,
    color: '#6B7280',
  },
  vacio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vacioTexto: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 20,
  },
  boton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
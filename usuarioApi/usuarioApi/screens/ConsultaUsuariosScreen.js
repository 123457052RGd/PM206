import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

const API_URL = 'http://localhost:5000/v1/usuarios';

export default function ConsultaUsuariosScreen() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  const router = useRouter();

  const obtenerUsuarios = async () => {
    try {
      setCargando(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error('Error al consultar usuarios');
      }

      const data = await response.json();

      // Soporta tanto [] como { usuarios: [] }
      if (Array.isArray(data)) {
        setUsuarios(data);
      } else if (data.usuarios) {
        setUsuarios(data.usuarios);
      } else {
        setUsuarios([]);
      }

    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setUsuarios([]);
    } finally {
      setCargando(false);
    }
  };

  // Carga al abrir
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Recarga automáticamente cuando regreses desde actualizar
  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [])
  );

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.divider} />

      <Text style={styles.edad}>
        Edad: {item.edad} años
      </Text>

      <TouchableOpacity
        style={styles.btnDetalles}
        onPress={() =>
          router.push({
            pathname: '/actualizar',
            params: {
              usuario: JSON.stringify(item),
            },
          })
        }
      >
        <Text style={styles.btnDetallesText}>
          Ver detalles →
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {cargando ? (
        <ActivityIndicator
          size="large"
          color="#0056b3"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCard}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a56db',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 6,
  },
  edad: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
  },
  btnDetalles: {
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  btnDetallesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a56db',
  },
});
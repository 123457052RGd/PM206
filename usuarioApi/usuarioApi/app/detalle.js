import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

// Reemplazamos localhost por la IP local y definimos la URL base de FastAPI
const API_URL = 'http://localhost:5000/v1/usuarios';

export default function DetalleUsuarioScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    const handleEliminar = async () => {
        // Validación preventiva para asegurar que el ID exista
        if (!params.id || params.id === 'undefined') {
            Alert.alert('Error', 'No se pudo obtener el ID del usuario.');
            return;
        }

        try {
            // Nota: Se agrega la diagonal '/' al final para evitar el error 401/307
            const response = await fetch(`${API_URL}/${params.id}/`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setModalVisible(false);
                Alert.alert('Éxito', 'Usuario eliminado correctamente', [
                    {
                        text: 'OK',
                        onPress: () => router.replace('/(tabs)/consulta')
                    }
                ]);
            } else {
                Alert.alert('Error', `No se pudo eliminar (Código: ${response.status})`);
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            Alert.alert('Error', 'Error de conexión al intentar conectar con la API');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles del Usuario</Text>

            <View style={styles.card}>
                <Text style={styles.label}>ID</Text>
                <Text style={styles.value}>{params.id || 'N/A'}</Text>

                <Text style={styles.label}>Nombre</Text>
                <Text style={styles.value}>{params.nombre || 'Sin nombre'}</Text>

                <Text style={styles.label}>Edad</Text>
                <Text style={styles.value}>{params.edad ? `${params.edad} años` : 'N/A'}</Text>

                {/* BOTÓN PARA REDIRECCIONAR AL FORMULARIO CON DATOS PRECARGADOS */}
                <TouchableOpacity
                    style={styles.btnActualizar}
                    onPress={() => {
                        router.push({
                            pathname: '/actualizar',
                            params: {
                                id: params.id,
                                nombre: params.nombre,
                                edad: params.edad
                            }
                        });
                    }}
                >
                    <Text style={styles.btnTextBlack}>Actualizar</Text>
                </TouchableOpacity>

                {/* BOTÓN PARA ABRIR MODAL DE ELIMINACIÓN */}
                <TouchableOpacity
                    style={styles.btnEliminar}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.btnTextWhite}>Eliminar</Text>
                </TouchableOpacity>
            </View>

            {/* MODAL DE CONFIRMACIÓN */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Confirmar eliminación</Text>
                        <Text style={styles.modalText}>
                            ¿Deseas eliminar a{' '}
                            <Text style={{ fontWeight: 'bold' }}>{params.nombre}</Text>?
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.btnCancelar}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.btnTextBlack}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.btnConfirmarEliminar}
                                onPress={handleEliminar}
                            >
                                <Text style={styles.btnTextWhite}>Sí, eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
    card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 3 },
    label: { fontSize: 12, color: '#6c757d', marginTop: 10 },
    value: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#1a1a1a' },
    btnActualizar: { backgroundColor: '#FFC107', padding: 12, borderRadius: 8, marginTop: 20, alignItems: 'center' },
    btnEliminar: { backgroundColor: '#DC3545', padding: 12, borderRadius: 8, marginTop: 10, alignItems: 'center' },
    btnTextBlack: { color: '#000', fontWeight: 'bold' },
    btnTextWhite: { color: '#fff', fontWeight: 'bold' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalCard: { width: '85%', backgroundColor: '#fff', padding: 20, borderRadius: 12, alignItems: 'center' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#DC3545', marginBottom: 10 },
    modalText: { textAlign: 'center', color: '#495057', marginBottom: 20 },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
    btnCancelar: { backgroundColor: '#E9ECEF', padding: 10, borderRadius: 8, flex: 1, marginRight: 5, alignItems: 'center' },
    btnConfirmarEliminar: { backgroundColor: '#DC3545', padding: 10, borderRadius: 8, flex: 1, marginLeft: 5, alignItems: 'center' }
});
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const API_URL = 'http://localhost:5000/v1/usuarios';

export default function ActualizarUsuarioScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();

    // Parsear el objeto usuario pasado por parámetros
    const usuario = params.usuario ? JSON.parse(params.usuario) : {};

    const [nombre, setNombre] = useState(usuario.nombre || '');
    const [edad, setEdad] = useState(usuario.edad ? String(usuario.edad) : '');

    // FUNCIÓN PARA ACTUALIZAR (PUT)
    const handleGuardarCambios = async () => {
        if (!nombre.trim() || !edad.trim()) {
            Alert.alert('Error', 'Por favor llena todos los campos');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${usuario.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,
                    edad: parseInt(edad, 10),
                }),
            });

            if (response.ok) {
                Alert.alert('Éxito', 'Usuario actualizado correctamente', [
                    { text: 'OK', onPress: () => router.replace('/consulta') }
                ]);
            } else {
                Alert.alert('Error', `No se pudo actualizar (Estatus: ${response.status})`);
            }
        } catch (error) {
            console.error('Error al actualizar:', error);
            Alert.alert('Error', 'Error de conexión con el servidor');
        }
    };

    // FUNCIÓN PARA ELIMINAR (DELETE)
    const handleEliminar = () => {
        Alert.alert(
            'Confirmar eliminación',
            `¿Estás seguro de que deseas eliminar a ${usuario.nombre}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const response = await fetch(`${API_URL}/${usuario.id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                            });

                            if (response.ok) {
                                Alert.alert('Éxito', 'Usuario eliminado correctamente', [
                                    { text: 'OK', onPress: () => router.replace('/consulta') }
                                ]);
                            } else {
                                Alert.alert('Error', `No se pudo eliminar (Estatus: ${response.status})`);
                            }
                        } catch (error) {
                            console.error('Error al eliminar:', error);
                            Alert.alert('Error', 'Error de conexión al intentar eliminar');
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalles del Usuario</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Nombre</Text>
                <TextInput
                    style={styles.input}
                    value={nombre}
                    onChangeText={setNombre}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Edad</Text>
                <TextInput
                    style={styles.input}
                    value={edad}
                    onChangeText={setEdad}
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={styles.btnGuardar} onPress={handleGuardarCambios}>
                <Text style={styles.btnTextGuardar}>Guardar cambios</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnEliminar} onPress={handleEliminar}>
                <Text style={styles.btnTextEliminar}>Eliminar usuario</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: '#1a1a1a' },
    formGroup: { marginBottom: 15 },
    label: { fontSize: 13, color: '#6c757d', marginBottom: 5, fontWeight: '600' },
    input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ced4da', borderRadius: 8, padding: 12, fontSize: 16 },
    btnGuardar: { backgroundColor: '#FFC107', padding: 14, borderRadius: 8, marginTop: 15, alignItems: 'center' },
    btnTextGuardar: { color: '#000', fontWeight: 'bold', fontSize: 16 },
    btnEliminar: { backgroundColor: '#dc3545', padding: 14, borderRadius: 8, marginTop: 12, alignItems: 'center' },
    btnTextEliminar: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});
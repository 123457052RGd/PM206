import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#1a56db',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            {/* Pantalla principal de consulta */}
            <Stack.Screen
                name="index"
                options={{ title: 'Lista de Usuarios' }}
            />

            {/* Pantalla para actualizar / eliminar */}
            <Stack.Screen
                name="actualizar"
                options={{ title: 'Detalles del Usuario' }}
            />
        </Stack>
    );
}
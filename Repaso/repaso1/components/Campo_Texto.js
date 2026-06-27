import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function CampoTexto({
  etiqueta,
  valor,
  cambiarTexto,
  teclado = 'default'
}) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>{etiqueta}</Text>

      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={cambiarTexto}
        keyboardType={teclado}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    marginBottom: 15
  },

  texto: {
    fontSize: 16,
    marginBottom: 5
  },

  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    padding: 10
  }
});
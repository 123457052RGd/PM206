import { View, Text, Switch, StyleSheet } from 'react-native';



export default function PreguntaSwitch({
pregunta,
valor,
cambiarValor
}) {
return (
    <View style={styles.fila}>

    <Text>{pregunta}</Text>

    <Switch
        value={valor}
        onValueChange={cambiarValor}
    />

    </View>
);
}

const styles = StyleSheet.create({

fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
}

});
import React, { useState } from 'react';
import CampoTexto from '../components/Campo_Texto';
import PreguntaSwitch from '../components/PreguntaSwitch';


import {
ScrollView,
Text,
Button,
Alert,
StyleSheet
} from 'react-native';


export default function RegistroEventoScreen() {

const [nombre, setNombre] = useState('');
const [carrera, setCarrera] = useState('');
const [semestre, setSemestre] = useState('');

const [taller, setTaller] = useState(false);
const [constancia, setConstancia] = useState(false);
const [deportes, setDeportes] = useState(false);

const enviarRegistro = () => {

    if (
    nombre.trim() === '' ||
    carrera.trim() === '' ||
    semestre.trim() === ''
    ) {

    Alert.alert(
        'Error',
        'No se permiten campos vacíos'
    );

    return;
    }

    if (isNaN(semestre)) {

    Alert.alert(
        'Error',
        'El semestre debe ser numérico'
    );

    return;
    }

    Alert.alert(
    'Registro Enviado',

    `Nombre: ${nombre}
Carrera: ${carrera}
Semestre: ${semestre}
Taller: ${taller ? 'Sí' : 'No'}
Constancia: ${constancia ? 'Sí' : 'No'}
Deportes: ${deportes ? 'Sí' : 'No'}`
    );
};

return (

    <ScrollView contentContainerStyle={styles.container}>

    <Text style={styles.titulo}>
        Registro de Evento Universitario
    </Text>

    <CampoTexto
        etiqueta="Nombre Completo"
        valor={nombre}
        cambiarTexto={setNombre}
    />

    <CampoTexto
        etiqueta="Carrera"
        valor={carrera}
        cambiarTexto={setCarrera}
    />

    <CampoTexto
        etiqueta="Semestre"
        valor={semestre}
        cambiarTexto={setSemestre}
        teclado="numeric"
    />

    <PreguntaSwitch
        pregunta="¿Asistirá al taller?"
        valor={taller}
        cambiarValor={setTaller}
    />

    <PreguntaSwitch
        pregunta="¿Requiere constancia?"
        valor={constancia}
        cambiarValor={setConstancia}
    />

    <PreguntaSwitch
        pregunta="¿Participará en actividades deportivas?"
        valor={deportes}
        cambiarValor={setDeportes}
    />

    <Button
        title="Enviar Registro"
        onPress={enviarRegistro}
    />

    </ScrollView>
);
}

const styles = StyleSheet.create({

container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center'
},

titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30
}

});
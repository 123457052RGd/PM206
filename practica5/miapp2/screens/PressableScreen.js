//Zona 1 importaciones de componentes y archivos
import { StatusBar } from 'expo-status-bar';
import { Pressable, View, StyleSheet, Text, Switch } from "react-native";
import { useState } from "react";

//Zona 2 Main - Hogar de los componentes
export default function PressableScreen() {
    const [buttonText, setButtonText] = useState('Dame Clic');
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: isDarkMode ? "#000000" : "#ffffff" }
            ]}
        >

            <StatusBar style={isDarkMode ? "light" : "dark"} />

            <Pressable
                style={styles.button}

                onPress={() => {
                    console.log("Se presionó el botón");
                    setButtonText("Botón presionado");
                }}

                onPressIn={() => {
                    console.log("Se acaba de presionar el botón");
                }}

                onPressOut={() => {
                    console.log("Se acaba de soltar el botón");
                }}

                onLongPress={() => {
                    console.log("Presión prolongada");
                    setButtonText("Presión prolongada detectada");
                }}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </Pressable>

            <Text
                style={[
                    styles.text,
                    { color: isDarkMode ? "#ffffff" : "#000000" }
                ]}
            >
                Dark Mode:
            </Text>

            <Switch
                value={isDarkMode}
                onValueChange={() => setIsDarkMode((previousState) => !previousState)}
                trackColor={{ false: "#767577", true: "lightblue" }}
                thumbColor={"#f4f3f4"}
            />

        </View>
    );
}

//Zona 3 Estilos - Personalización de los componentes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 10,
        marginBottom: 50
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        textAlign: "center"
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
        paddingHorizontal: 10
    },
    text: {
        fontSize: 18,
        fontWeight: "bold"
    }
});
import { Button, Text, Image, View } from "react-native";


export const Saludo2= () => {
    return(
        <View>

        <Text> Soy un componente Propio </Text>
        <Image source={require('../assets/image.png')}/>
        <Button title="Hola 206"></Button>

        </View>
    )
}
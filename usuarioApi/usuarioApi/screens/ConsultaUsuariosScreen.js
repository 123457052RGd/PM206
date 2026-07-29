import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet
} from 'react-native';


export default function ConsultaUsuariosScreen(){

  const [usuarios,setUsuarios] = useState([]);


  const obtenerUsuarios = async()=>{

    try{

      const respuesta = await fetch('http://192.168.100.99:5000/v1/usuarios');

      const datos = await respuesta.json();

      console.log("Respuesta API:",datos);

      setUsuarios(datos.usuarios);


    }catch(error){

      console.log("Error API:",error);

    }

  };


  useEffect(()=>{

    obtenerUsuarios();

  },[]);



  return(

    <SafeAreaView style={styles.container}>


      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>


      <FlatList

        data={usuarios}

        keyExtractor={(item)=>item.id.toString()}


        renderItem={({item})=>(

          <View style={styles.card}>

            <Text>
              ID: {item.id}
            </Text>

            <Text>
              Nombre: {item.nombre}
            </Text>

            <Text>
              Edad: {item.edad}
            </Text>


          </View>

        )}

      />


    </SafeAreaView>

  );

}



const styles=StyleSheet.create({

container:{
flex:1,
padding:20
},

titulo:{
fontSize:25,
fontWeight:'bold',
marginBottom:20
},

card:{
backgroundColor:'#eee',
padding:15,
marginBottom:10,
borderRadius:10
}


});
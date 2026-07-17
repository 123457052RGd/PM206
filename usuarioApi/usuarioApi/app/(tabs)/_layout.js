import {Tabs} from "expo-router";

export default function TabsLayout(){

    return(

        <Tabs>
            <Tabs.Screen name="index" options={{title:"inicio", href:null}} />
            <Tabs.Screen name="alta" options={{title:"Formulario"}} />
            <Tabs.Screen name="consulta" options={{title:"Listado"}} />
        </Tabs>

    );

}
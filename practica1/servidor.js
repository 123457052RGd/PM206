console.log("Hola mundo JS desde el servidor de diego")

/*operaciones*/
let edad1= 11
const edad2 = 42

console.log("edad promedio")
console.log((edad1 + edad2) / 2)

/*medir tiempo de un proceso*/
console.time("mi proceso")

for (let i=0; i<1000000; i++) {}
    
console.timeEnd("mi proceso")


/*objetos tipo tabla*/

let usuarios = [
    {nombre: "Diego", edad: 21},
    {nombre: "María", edad: 25}
]
console.table(usuarios)
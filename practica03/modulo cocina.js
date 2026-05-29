// ════════════════════════════════════════════════════════════════
// CONFIGURACIÓN GENERAL DEL SISTEMA
// ════════════════════════════════════════════════════════════════

const config = {
  nombreSistema: "La Cafetería",
  modulo: "Cocina",
  moneda: "$",

  // límite para marcar stock bajo
  stockBajoEn: 5,

  // array de categorías
  categorias: ["Bebidas", "Alimentos", "Postres", "Snacks"],
};


// ════════════════════════════════════════════════════════════════
// ARRAY DE PRODUCTOS
// Cada elemento es un objeto
// ════════════════════════════════════════════════════════════════

let productos = [
  {
    id: 1,
    nombre: "Café Americano",
    categoria: "Bebidas",
    precio: 35,
    stock: 50,
    estado: "activo",
    desc: "Café negro sin leche"
  },

  {
    id: 2,
    nombre: "Cappuccino",
    categoria: "Bebidas",
    precio: 45,
    stock: 40,
    estado: "activo",
    desc: "Espresso con leche vaporizada"
  },

  {
    id: 3,
    nombre: "Latte",
    categoria: "Bebidas",
    precio: 48,
    stock: 35,
    estado: "activo",
    desc: ""
  },

  {
    id: 4,
    nombre: "Té Verde",
    categoria: "Bebidas",
    precio: 30,
    stock: 5,
    estado: "activo",
    desc: ""
  },

  {
    id: 5,
    nombre: "Chocolate Caliente",
    categoria: "Bebidas",
    precio: 42,
    stock: 0,
    estado: "inactivo",
    desc: ""
  },

  {
    id: 6,
    nombre: "Croissant",
    categoria: "Alimentos",
    precio: 28,
    stock: 15,
    estado: "activo",
    desc: "Recién horneado"
  },

  {
    id: 7,
    nombre: "Bagel con queso",
    categoria: "Alimentos",
    precio: 38,
    stock: 10,
    estado: "activo",
    desc: ""
  },

  {
    id: 8,
    nombre: "Cheesecake",
    categoria: "Postres",
    precio: 55,
    stock: 8,
    estado: "activo",
    desc: "De zarzamora"
  },

  {
    id: 9,
    nombre: "Brownie",
    categoria: "Postres",
    precio: 32,
    stock: 3,
    estado: "activo",
    desc: ""
  },

  {
    id: 10,
    nombre: "Granola Bar",
    categoria: "Snacks",
    precio: 22,
    stock: 20,
    estado: "activo",
    desc: ""
  },
];


// ════════════════════════════════════════════════════════════════
// ARRAY DE PEDIDOS
// ════════════════════════════════════════════════════════════════

let pedidos = [

  {
    id: "P-001",
    mesa: "Mesa 2",
    items: ["Café Americano", "Croissant"],
    estado: "en-preparacion",
    hora: "10:15",
    notas: ""
  },

  {
    id: "P-002",
    mesa: "Mesa 5",
    items: ["Latte", "Cheesecake"],
    estado: "pendiente",
    hora: "10:22",
    notas: "Sin azúcar"
  },

  {
    id: "P-003",
    mesa: "Juan R.",
    items: ["Cappuccino"],
    estado: "listo",
    hora: "10:05",
    notas: ""
  },

  {
    id: "P-004",
    mesa: "Mesa 1",
    items: ["Té Verde", "Brownie", "Granola Bar"],
    estado: "pendiente",
    hora: "10:28",
    notas: "Para llevar"
  },
];


// ════════════════════════════════════════════════════════════════
// OBJETO ESTADO GENERAL
// ════════════════════════════════════════════════════════════════

const estado = {

  siguienteIdProducto: 11,
  siguienteIdPedido: 5,

  filtroPedidos: "todos",

  // array vacío
  itemsSeleccionados: [],

  productoAEliminar: null,
};


// ════════════════════════════════════════════════════════════════
// OBJETO CON ESTADOS DE PEDIDO
// ════════════════════════════════════════════════════════════════

const estadosPedido = {

  pendiente: {
    etiqueta: "Pendiente",
    clase: "badge-pendiente"
  },

  "en-preparacion": {
    etiqueta: "En preparación",
    clase: "badge-prep"
  },

  listo: {
    etiqueta: "Listo",
    clase: "badge-listo"
  },

  cancelado: {
    etiqueta: "Cancelado",
    clase: "badge-cancel"
  },
};


// ════════════════════════════════════════════════════════════════
// FUNCIÓN PARA MOSTRAR ESTADÍSTICAS
// ════════════════════════════════════════════════════════════════

function renderizarStats() {

  // cantidad total de pedidos
  const total = pedidos.length;

  // filter() devuelve un nuevo array
  const pendientes =
    pedidos.filter(p => p.estado === "pendiente").length;

  const preparacion =
    pedidos.filter(p => p.estado === "en-preparacion").length;

  const listos =
    pedidos.filter(p => p.estado === "listo").length;

  console.log("Total:", total);
  console.log("Pendientes:", pendientes);
  console.log("En preparación:", preparacion);
  console.log("Listos:", listos);
}


// ════════════════════════════════════════════════════════════════
// CAMBIAR ESTADO DEL PEDIDO
// ════════════════════════════════════════════════════════════════

function cambiarEstadoPedido(id, nuevoEstado) {

  // find() busca un objeto dentro del array
  const pedido = pedidos.find(p => p.id === id);

  if (pedido) {

    // modificar propiedad del objeto
    pedido.estado = nuevoEstado;

    console.log("Pedido actualizado:", pedido);
  }
}


// ════════════════════════════════════════════════════════════════
// FILTRAR PRODUCTOS
// ════════════════════════════════════════════════════════════════

function mostrarProductosActivos() {

  // filter() recorre el array
  const activos =
    productos.filter(p => p.estado === "activo");

  console.log(activos);
}


// ════════════════════════════════════════════════════════════════
// AGREGAR PRODUCTO
// ════════════════════════════════════════════════════════════════

function agregarProducto() {

  // nuevo objeto
  const nuevoProducto = {

    id: estado.siguienteIdProducto++,

    nombre: "Frappé",

    categoria: "Bebidas",

    precio: 60,

    stock: 12,

    estado: "activo",

    desc: "Frappé de vainilla"
  };

  // push() agrega al array
  productos.push(nuevoProducto);

  console.log("Producto agregado");
}


// ════════════════════════════════════════════════════════════════
// ELIMINAR PRODUCTO
// ════════════════════════════════════════════════════════════════

function eliminarProducto(id) {

  // filter() crea un nuevo array
  productos = productos.filter(p => p.id !== id);

  console.log("Producto eliminado");
}


// ════════════════════════════════════════════════════════════════
// CREAR NUEVO PEDIDO
// ════════════════════════════════════════════════════════════════

function crearPedido() {

  // array con productos seleccionados
  estado.itemsSeleccionados = [
    "Cappuccino",
    "Brownie"
  ];

  const nuevoPedido = {

    id: `P-00${estado.siguienteIdPedido++}`,

    mesa: "Mesa 9",

    // spread operator
    items: [...estado.itemsSeleccionados],

    estado: "pendiente",

    hora: "11:20",

    notas: "Sin azúcar"
  };

  // unshift() agrega al inicio
  pedidos.unshift(nuevoPedido);

  console.log("Pedido creado");
}


// ════════════════════════════════════════════════════════════════
// MOSTRAR PEDIDOS
// ════════════════════════════════════════════════════════════════

function mostrarPedidos() {

  pedidos.map(p => {

    console.log("ID:", p.id);
    console.log("Mesa:", p.mesa);

    // join() une elementos del array
    console.log("Items:", p.items.join(", "));

    console.log("Estado:", p.estado);

    console.log("---------------------");
 
  });
}

renderizarStats();

mostrarProductosActivos();

agregarProducto();

crearPedido();

mostrarPedidos();

cambiarEstadoPedido("P-001", "listo");

eliminarProducto(5);
// cocina.js – Módulo Cocina: CRUD de productos

function renderizarProductos() {
  const busqueda = document.getElementById("buscar-prod").value.toLowerCase();
  const categoria = document.getElementById("filtro-cat").value;

  const filtrados = productos.filter(p => {
    const coincideNombre = !busqueda || p.nombre.toLowerCase().includes(busqueda);
    const coincideCat = !categoria || p.categoria === categoria;
    return coincideNombre && coincideCat;
  });

  const tbody = document.getElementById("prod-tbody");
  if (!filtrados.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:2rem;">No se encontraron productos</td></tr>`;
    return;
  }

  tbody.innerHTML = filtrados.map(p => `
    <tr>
      <td><div class="prod-nombre">${p.nombre}</div>${p.desc ? `<div class="prod-desc">${p.desc}</div>` : ""}</td>
      <td><span class="cat-pill">${p.categoria}</span></td>
      <td>${config.moneda}${p.precio.toFixed(2)}</td>
      <td class="${claseStock(p.stock)}">${etiquetaStock(p.stock)}</td>
      <td><span class="badge ${p.estado === "activo" ? "badge-activo" : "badge-inactivo"}">${p.estado === "activo" ? "Activo" : "Inactivo"}</span></td>
      <td>
        <button class="btn btn-sm" onclick="abrirModal(${p.id})" style="margin-right:6px;"><i class="ti ti-edit"></i> Editar</button>
        <button class="btn btn-sm btn-danger" onclick="pedirConfirmacionEliminar(${p.id})"><i class="ti ti-trash"></i></button>
      </td>
    </tr>
  `).join("");
}

function claseStock(stock) {
  if (stock === 0) return "stock-out";
  if (stock <= config.stockBajoEn) return "stock-low";
  return "stock-ok";
}

function etiquetaStock(stock) {
  if (stock === 0) return `<i class="ti ti-alert-circle"></i> Sin stock`;
  if (stock <= config.stockBajoEn) return `<i class="ti ti-alert-triangle"></i> ${stock}`;
  return `${stock}`;
}

function abrirModal(id) {
  document.getElementById("modal-producto").classList.add("open");
  const catSelect = document.getElementById("p-cat");
  catSelect.innerHTML = config.categorias.map(cat => `<option value="${cat}">${cat}</option>`).join("");

  if (id !== null) {
    const p = productos.find(x => x.id === id);
    document.getElementById("modal-titulo").textContent = "Editar producto";
    document.getElementById("edit-id").value = p.id;
    document.getElementById("p-nombre").value = p.nombre;
    document.getElementById("p-cat").value = p.categoria;
    document.getElementById("p-precio").value = p.precio;
    document.getElementById("p-stock").value = p.stock;
    document.getElementById("p-desc").value = p.desc;
    document.getElementById("p-estado").value = p.estado;
  } else {
    document.getElementById("modal-titulo").textContent = "Agregar producto";
    document.getElementById("edit-id").value = "";
    ["p-nombre", "p-precio", "p-stock", "p-desc"].forEach(campo => document.getElementById(campo).value = "");
    document.getElementById("p-cat").value = config.categorias[0];
    document.getElementById("p-estado").value = "activo";
  }
}

function cerrarModal() {
  document.getElementById("modal-producto").classList.remove("open");
}

function guardarProducto() {
  const nombre = document.getElementById("p-nombre").value.trim();
  const precio = parseFloat(document.getElementById("p-precio").value);
  const stock = parseInt(document.getElementById("p-stock").value);
  if (!nombre || isNaN(precio) || isNaN(stock)) {
    mostrarToast("Completa todos los campos requeridos");
    return;
  }
  const datosProd = {
    nombre, precio, stock,
    categoria: document.getElementById("p-cat").value,
    desc: document.getElementById("p-desc").value.trim(),
    estado: document.getElementById("p-estado").value,
  };
  const idEdicion = document.getElementById("edit-id").value;
  if (idEdicion) {
    const idx = productos.findIndex(p => p.id == idEdicion);
    productos[idx] = { ...productos[idx], ...datosProd };
    mostrarToast("Producto actualizado");
  } else {
    productos.push({ id: estado.siguienteIdProducto++, ...datosProd });
    mostrarToast("Producto agregado");
  }
  cerrarModal();
  renderizarProductos();
}

function pedirConfirmacionEliminar(id) {
  estado.productoAEliminar = id;
  document.getElementById("confirm-overlay").classList.add("open");
}

function cerrarConfirmacion() {
  document.getElementById("confirm-overlay").classList.remove("open");
  estado.productoAEliminar = null;
}

function confirmarEliminar() {
  if (estado.productoAEliminar !== null) {
    productos = productos.filter(p => p.id !== estado.productoAEliminar);
    mostrarToast("Producto eliminado");
    cerrarConfirmacion();
    renderizarProductos();
}
}
// PRÁCTICA 02 — COCINA
// Objetivo: usar filter() y find() sobre el array de productos

// 1. PRODUCTOS BARATOS
const productosBaratos = productos.filter(p => p.precio < 35);
console.log("Productos baratos:", productosBaratos);

// 2. PRODUCTOS CAROS
const productosCaro = productos.filter(p => p.precio > 45);
console.log("Productos caros:", productosCaro);

// 3. BEBIDAS
const bebidas = productos.filter(p => p.categoria === "Bebidas");
console.log("Bebidas:", bebidas);

// 4. POSTRES
const postres = productos.filter(p => p.categoria === "Postres");
console.log("Postres:", postres);

// BONUS: find() — regresa solo el primero que encuentre
const primerPostre = productos.find(p => p.categoria === "Postres");
console.log("Primer postre:", primerPostre);

const productos = [
  { id: 1,  nombre: "Café Americano",     categoria: "Bebidas",   precio: 35, stock: 50, estado: "activo" },
  { id: 2,  nombre: "Cappuccino",         categoria: "Bebidas",   precio: 45, stock: 40, estado: "activo" },
  { id: 3,  nombre: "Latte",              categoria: "Bebidas",   precio: 48, stock: 35, estado: "activo" },
  { id: 4,  nombre: "Té Verde",           categoria: "Bebidas",   precio: 30, stock: 5,  estado: "activo" },
  { id: 5,  nombre: "Chocolate Caliente", categoria: "Bebidas",   precio: 42, stock: 0,  estado: "inactivo" },
  { id: 6,  nombre: "Croissant",          categoria: "Alimentos", precio: 28, stock: 15, estado: "activo" },
  { id: 7,  nombre: "Bagel con queso",    categoria: "Alimentos", precio: 38, stock: 10, estado: "activo" },
  { id: 8,  nombre: "Cheesecake",         categoria: "Postres",   precio: 55, stock: 8,  estado: "activo" },
  { id: 9,  nombre: "Brownie",            categoria: "Postres",   precio: 32, stock: 3,  estado: "activo" },
  { id: 10, nombre: "Granola Bar",        categoria: "Snacks",    precio: 22, stock: 20, estado: "activo" },
];

// productos baratos con filter
const baratos = productos.filter(p => p.precio < 35);
console.log("baratos", baratos);

// productos caros con filter
const caros = productos.filter(p => p.precio > 45);
console.log("caros", caros);

// bebidas con filter
const bebidas = productos.filter(p => p.categoria === "Bebidas");
console.log("bebidas", bebidas);

// postres con filter
const postres = productos.filter(p => p.categoria === "Postres");
console.log("postres", postres);

// find regresa solo el primero que encuentre
const unPostre = productos.find(p => p.categoria === "Postres");
console.log("find postres", unPostre);
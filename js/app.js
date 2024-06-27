// Constructores

function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

// Realiza una cotización con los datos
Seguro.prototype.cotizarSeguro = function() {
  /**
   * 1 = Americano 1.15
   * 2 = Americano
   * 3 = Americano
   */

  let cantidad;
  const base = 2000;

  //console.log(this.marca);
  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
  }
}

function UI() {};

// llena las opciones de los aplicaciones

UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 20;
  const selectYear = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
}

// muestra alertas en pantalla

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("div");
  if (tipo === "error") {
    div.classList.add("mensaje", "error");
  } else {
    div.classList.add("mensaje", "correcto");
  }

  div.classList.add('mensaje', 'mt-10');
  div.textContent = mensaje;

  // Insertar en HTML
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    document.querySelector(".mensaje").remove();
  }, 3000);
}

// Instanciar el obejto UI

const ui = new UI();
ui.llenarOpciones();

// Cuando la página Web este cargada
document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones(); // Llenar el select con los años
});

eventListener();


function eventListener() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  // 1. Leer la marca seleccionada
  const marca = document.querySelector("#marca").value;

  // 2. Leer el año seleccionado
  const year = document.querySelector("#year").value;

  // 3. Leer el tipo de seguro seleccionado
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  
  if (marca ==='' || year === '' || tipo === '') {
    ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
    return;
  }

  // console.log(`La marca es: ${marca}, el año es: ${year} y el tipo de seguro es: ${tipo}`);
  
  // Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  seguro.cotizarSeguro(); // Realiza la cotización
  // console.log(seguro);


}
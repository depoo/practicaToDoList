// Variables
const formulario = document.querySelector("#formulario");
const tituloForm = document.querySelector('#titulo-formulario');
const task = document.querySelector(".tareas");
const total = document.querySelector("#total");
const completadas = document.querySelector("#completadas");
let tareas = [];

// eventos
  // averiguar que significa esto:
  // (()=>{
  //  
  //})();
(()=>{
  formulario.addEventListener("submit", validarFormulario);

  task.addEventListener('click', eliminarTarea);

  task.addEventListener('click', tareaCompletada);
})()


//funciones
function validarFormulario(e) {
  e.preventDefault();

  //validar los datos del input
  const tarea = document.querySelector('#tarea').value;
  // averiguar que significa esto: .trim()
  if (!tarea.trim()) {
    tituloForm.textContent = 'Formulario Vacio';

    setTimeout(()=>{
      tituloForm.textContent = 'Formulario';
    }, 2000)

    return;
  }

  // crear un objeto
  const objectTarea = {
    id: Date.now(),
    tarea: tarea,
    estado: false,
  }

  // el spreadOperator copiara todo lo que haiga en nuestro variable tareas que es un arreglo vacio y agregara el objeto objectTarea
  tareas = [...tareas, objectTarea]

  //Usamos la funcion rest() para limpiar los campos del formulario.
  formulario.reset();
  // funcion que mostrara las nuevas listas que iremos agregando.
  mostrarHTML();
}

function mostrarHTML() {
  // idicamos que la caja de la lista comienze como una caja vacia y que no se duplique las listas que vamos agregando
  task.innerHTML = "";

  if (tareas.length < 1) {
    const mensaje = document.createElement("div");
    mensaje.textContent = "SIN TAREAS";
    return;
  }

  tareas.forEach(item =>{
    // creamos una etiqueta div
    const itemTarea = document.createElement('div');

    // a la etiqueta creada agregamos una clase.
    itemTarea.classList.add("item-tarea");

    // creamos la estructura para agregar listas a la caja
    /* Con el operador ternario cambiamos el estado de false a true
    presionando el boton para que se marque una linea en la lista
    */
    itemTarea.innerHTML = `
    ${
      item.estado ? (`<p class="completa"> ${item.tarea} </p>`)
                  : (`<p> ${item.tarea} </p>`)
    }
    <div class="botones">
      <button data-id="${item.id}" class="eliminar">x</button>
      <button data-id="${item.id}" class="completada">?</button>
    </div>
    `;

    task.appendChild(itemTarea)
  })

  // mostrar el total y completadas
  const totalTareas = tareas.length; // va enumerar cuantas listas de tareas tenemos
  total.textContent = `Total tareas: ${totalTareas}`; // vamos a cambiar el texto de total tareas con la variable que almacena la longitud de la lista de tareas
  const tareasCompletadas = tareas.filter(item => item.estado === true).length; // Hara una filtracion de todas las listas que hayan cambiado su estado a true y las va enumerar
  completadas.textContent = `Completadas ${tareasCompletadas}`; // Cambiara su texto a de acuerdo a la enumeracion de la variable que almacena los estados en true.
}

// Eliminar Tarea
function eliminarTarea(e) {
  if(e.target.classList.contains('eliminar')){
    const tareaId = Number(e.target.getAttribute("data-id"));
    // eliminar tarea mediante el metodo filter
    const deleteTask = tareas.filter( item => item.id !== tareaId )
    tareas = deleteTask;

    // Llamando a la funcion mostrarHTML() para que vuelva a pintar la caja de las listas
    mostrarHTML();
  };
}

// Editar Tarea
function tareaCompletada(e) {
  if(e.target.classList.contains('completada')){
    const tareaId = Number(e.target.getAttribute("data-id"));

    //darlo por completado
    /* indicamos si el "item.id" es igual a "tareaId" que proceda a cambiar el valor de la propiedad estado de nuestro objeto a un valor verdarero caso contrario que siga siendo falso. */
    const completeTask = tareas.map(item => {
      if (item.id === tareaId) {
        item.estado = !item.estado;
        return item;
      }else{
        return item;
      }
    })
    tareas = completeTask;

    // Llamando a la funcion mostrarHTML() para que vuelva a pintar la caja de las listas
    mostrarHTML();
  };
}
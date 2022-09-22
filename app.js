const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#tarea');
const btnVaciar = document.querySelector('#vaciar');
let tasks = [];


//EVENTOS

eventListeners()
function eventListeners(){
    //al añadir una tarea
    formulario.addEventListener('submit', agregarTarea);

    //al cargar el documento
    document.addEventListener('DOMContentLoaded', ()=>{
        tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        crearHTML();
    });
    

}



//FUNCIONES
function agregarTarea(e){
    e.preventDefault()
    
    const textArea = document.querySelector('#area').value;
    if(textArea === ''){
        mostrarError('Agrega al menos una tarea');
        return;
    }
    //añadir tarea al array vacio
    const tareaObj = {
        id: Date.now(),
        texto: textArea,
    }
    tasks = [...tasks, tareaObj];
    
    crearHTML();

    //resetear campo
    formulario.reset()
}


function crearHTML(){
    limpiarHTML();
    if(tasks.length > 0){

        tasks.forEach(tarea =>{

            //crear el boton eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('close');
            btnEliminar.innerText = 'x';
            //eliminar
            btnEliminar.onclick = ()=>{
                borrarTarea(tarea.id);
            }

            //crear html
            const li = document.createElement('li');
            li.classList.add('item');
            li.innerText = tarea.texto;
            li.appendChild(btnEliminar);
            listaTareas.appendChild(li);
        

            
        });
    }
    sincronizarStorage();
}

function limpiarHTML(){
    while(listaTareas.firstChild){
        listaTareas.removeChild(listaTareas.firstChild);
    }
}
function borrarTarea(id){
   tasks = tasks.filter(tarea => tarea.id !== id);
   crearHTML();
}

function sincronizarStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.classList.add('error');
    mensajeError.textContent = error; 
    //insertar al html
    formulario.appendChild(mensajeError);
    setTimeout(()=>{
        mensajeError.remove()
    },3000)
}
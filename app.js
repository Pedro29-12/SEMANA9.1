const readline=require("node:readline/promises");
const {stdin: entrada, stdout: salida} = require("node:process");
//creamos una iterfas para leer datos  desde la terminal
const teclado=readline.createInterface({
    input: entrada,
    output:salida
});
//crear una lista temporral donde guardaremos los estudiantes 
let estudiantes=[];
//variable para asignar un codigo a cada estudiante
let siguienteId=1;
//create: crear estudiante
function crearEstudiante(nombre){
    const estudiante={
        id:siguienteId,
        nombre: nombre
    };
    estudiantes.push(estudiante);//permite agregar el estudiante en la lista
    siguienteId++;

    console.log("Estudiante registrado correctamente");
}

//read: mostrar todos los estudiantes
function listarEstudiantes(){
    if(estudiantes.length===0){
        console.log("No hay estudiante");
        return;
    }
    console.log("\n--- LISTA DE ESTUDIANTES ---");
//HACEMOS EL RECORRIDO PARA VISUALIZAR CADA ESTUDIANTE
estudiantes.forEach(function(estudiante){
    console.log(
        "codigo: "+estudiante.id+
        " | nombre: "+estudiante.nombre
        );
    });
}
//UPDATE MODIFICAR EL NOMBRE DE UN ESTUDIANTE
function actualizarEstudiante(id,nuevoNombre){
    const estudiante=estudiantes.find(function(e){
        return e.id===id;
    });
    if (estudiante){
        estudiante.nombre=nuevoNombre;
        console.log("Estudiante actualizado");
    }else{
        console.log("No se encontro el estudiante");
    }
}
//DELETE: ELIMINAR UN ESTUDIANTE
function eliminarEstudiante(id){
    const cantidadAnterior=estudiante.length;
    //CONSERVEMOS A TODOS MENOS AL ESTUDIANTE
    estudiante=estudiantes.filter(function(e){
        return e.id !== id;
    });
    if(estudiantes.length<cantidadAnterior){
        console.log("Estudiante Eliminado");
    }else{
        console.log("No se encontro el estudiante");
    }
}

//MENU PRINCIPAL DEL PROYECTO 
async function iniciar() {
    let opcion="";
    //EL MENU SE REPITE HASTA QUE ELIJAS 
    while(opcion !== "5"){
        console.log("\n=== CRUD DE ESTUDIANTE ===");
        console.log("1. Registrar estudiante");
        console.log("2. Listar estudiante");
        console.log("3. Actualizar estudiante");
        console.log("4. Eliminar estudiante");
        console.log("5. Salir");

        opcion=(await teclado.question("Elige una opcion: ")).trim();
        if(opcion === "1"){
            const nombre=(
                await teclado.question("Nombre del estudiante: ")
            ).trim();
            if(nombre !== ""){
                crearEstudiante(nombre);
            }else{
                console.log("El nombre no puede estar vacio");
            }
        }else if(opcion=="2"){
            listarEstudiantes();
        }else if(opcion==="3"){
            const id=Number(
                await teclado.question("Nuevo nombre: ")
            ).trim();

            if(Number.isInteger(id) && id>0 && nuevoNombre !==""){
                actualizarEstudiante(id,nuevoNombre);
            }else{
                console.log("Ingrese un codigo y nombre valido: ");
            }
        }else if(opcion==="4"){
            const id=Number(
                await teclado.question("Codigo a eliminar: ")
            );
            if(Number.isInteger(id)&&id>0){
                eliminarEstudiante(id);
            }else{
                console.log("Ingrese un codigo valido: ");
            }
        }else if(opcion=="5"){
            console.log("Programa Finalizado - Igor: ");
        }else{
            console.log("Opcion no valida, intente otra vez Igor ");
        }
    }
    //CERRAMOS LA INTERFAZ DE ENTRADA
    teclado.close();
}
//EJECUTAMOS EL PROGRAMA
iniciar();

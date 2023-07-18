import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Data } from './data.model';

//CREAMOS EL SERVICIO DESDE TERMINAL: ng g service data
//Componente: Presentar datos y permitir que el usuario interactúe con ellos VS Servicio: Controlar la información

//Los servicios son objetos Singleton


@Injectable({
  providedIn: 'root' //Cuando proporcionas el servicio en el nivel raíz, Angular crea una instancia única compartida del Service y lo inyecta en cualquier clase que lo solicite.
})
export class DataService {
    //2.1 Inicializamos la variable datos y la asignamos un type array para almacenar datos 
  private datos: Data[] = [];
  private datoParaEditar: BehaviorSubject<Data | null> = new BehaviorSubject<Data | null>(null); 
    //BehaviorSubject es una clase de RxJS que permite crear un flujo de datos que se puede observar y al que se pueden suscribir. Proporciona un valor inicial y emite nuevos valores a medida que se actualizan. Los suscriptores pueden recibir y reaccionar a estos valores emitidos. En este caso, estamos indicando que puede contener objetos de tipo Data (que es la interfaz que hemos definido) o el valor null. 

    // = new BehaviorSubject<Data | null>(null); Aquí estamos creando una nueva instancia de BehaviorSubject y proporcionando el valor inicial. En este caso, estamos inicializándolo con el valor null. Esto significa que cuando creamos el BehaviorSubject, no contiene ningún objeto de datos, está vacío.

  constructor() {
    //2.2 Cargar los datos iniciales y los datos guardados
    this.cargarDatosIniciales();
    this.cargarDatosGuardados();
  }

  cargarDatosIniciales() {
    this.datos = [
      { id: 1, nombre: 'Juan', edad: 25, profesion: 'Ingeniero' },
      { id: 2, nombre: 'Maria', edad: 30, profesion: 'Diseñadora' },
      { id: 3, nombre: 'Pedro', edad: 28, profesion: 'Programador' }
    ];
  }

  cargarDatosGuardados() {
    const datosGuardados = localStorage.getItem('datos');
    if (datosGuardados) {
      this.datos = JSON.parse(datosGuardados);
    }
  }

  //El objeto localStorage es una característica proporcionada por los navegadores web modernos que permite almacenar datos en el navegador de forma persistente. Es una especie de "almacén" donde se pueden guardar datos clave-valor.

  //Utilizamos método getItem() de localStorage para obtener el valor almacenado con la clave 'datos'. getItem() busca y devuelve el valor asociado con la clave que le hemos proporcionado antes en nuestro array.
  
  //if (datosGuardados) { ... } --> Se verifica si se encontró un valor para la clave 'datos' en el almacenamiento local. Si hay un valor almacenado, se procede a la siguiente línea.

  //this.datos = JSON.parse(datosGuardados);--> En esta línea, se utiliza JSON.parse() para convertir la cadena de texto datosGuardados en un objeto JavaScript. JSON.parse() analiza la cadena y la convierte en un objeto JavaScript o en un valor si es posible. En este caso, se asume que datosGuardados contiene una representación en formato JSON de los datos guardados previamente

  //2.3 Crear los métodos para obtener datos, agregar nuevos datos, eliminar datos y actualizar datos --->>> REALIZAR OPERACIONES CRUD (Create, Read, Update, Delete)


  //Los métodos principales que necesitamos para trabajara con nuestros datos en otros método -->>> (2)
  guardarDatos() {
    localStorage.setItem('datos', JSON.stringify(this.datos));
  }//De nuevo usamos setItem() de localStorage, esta vez para guardar los datos en el almacenamiento local del navegador. setItem() toma dos argumentos: el nombre de la clave y el valor que se desea almacenar.

  getDatos(): Data[] { 
    return this.datos;
  }

  agregarDato(nuevoDato: Data) { //La funciónn agregarDato acepta un parámetro nuevoDato de tipo Data
    const nuevoId = this.generarNuevoId(); //Llamamos a la función generarNuevoId() para obtener un nuevo identificador único para el dato que se va a agregar.
    nuevoDato.id = nuevoId; //Se asigna el nuevo identificador único (nuevoId) al atributo id del objeto nuevoDato
    this.datos.push(nuevoDato); //El objeto nuevoDato se agrega al array this.datos. 
    this.guardarDatos(); //Llamamos al método guardarDatos() para almacenar los datos actualizados en el almacenamiento local del navegador utilizando localStorage.
  }



  eliminarDato(id: number) { //Esta función acepta un parámetro id de tipo number.
    const index = this.datos.findIndex(dato => dato.id === id); //Utilizamos el método findIndex() del array this.datos para buscar el índice del dato que tiene un identificador coincidente con el id proporcionado. findIndex() recibe una función de callback que se ejecuta por cada elemento del array y devuelve el índice del primer elemento que cumple con la condición especificada. En este caso, se busca un dato cuyo id sea igual al id proporcionado.
    if (index !== -1) { //Se verifica si se encontró un índice válido. Un valor de -1 indica que no se encontró un dato con el id proporcionado en la lista.
      this.datos.splice(index, 1); // Si se encontró un índice válido, se utiliza el método splice(), que sirve para modificar el array original eliminando o reemplazando elementos.
      this.guardarDatos(); //Llamamos al método guardarDatos() para almacenar los datos actualizados en el almacenamiento local del navegador utilizando localStorage.
    }
  }

  actualizarDato(datoActualizado: Data) { //Acepta un parámetro datoActualizado de tipo Data
    const index = this.datos.findIndex(dato => dato.id === datoActualizado.id); //Utilizamos el método findIndex() del array this.datos para buscar el índice del dato que tiene un identificador coincidente con el id del datoActualizado proporcionado. 
    if (index !== -1) { //Se verifica si se encontró un índice válido (index !== -1) para el dato que se desea actualizar. 
      this.datos[index] = datoActualizado; //Si se encontró un índice válido, se actualiza el dato en la posición index del array this.datos con el datoActualizado. Esto reemplaza el dato existente en esa posición por el dato actualizado.
      this.guardarDatos();//Llamamos al método guardarDatos() para almacenar los datos actualizados en el almacenamiento local del navegador utilizando localStorage.
    }
  }

  //2.3 Crear métodos para obtener y establecer el dato seleccionado para editar

  getDatoParaEditar(): Observable<Data | null> {
    return this.datoParaEditar.asObservable(); //devuelve un Observable que emite valores de tipo Data | null. Los componentes o servicios que se suscriban a este Observable podrán recibir y reaccionar a los valores emitidos, que pueden ser objetos Data o null. Esto permite obtener el dato que se está editando en un componente y recibir actualizaciones cuando cambia.
  }

  setDatoParaEditar(dato: Data | null) {
    this.datoParaEditar.next(dato); //se utiliza para establecer el dato que se está editando. Toma un parámetro dato de tipo Data | null, lo que significa que se puede proporcionar un objeto Data o el valor null. Utiliza el método next() en this.datoParaEditar para emitir el nuevo valor al Observable, lo que notificará a todos los suscriptores que se ha producido un cambio en el dato que se está editando.
  }

  limpiarDatoParaEditar() {
    this.datoParaEditar.next(null); //se utiliza para eliminar un dato del array this.datos basándose en su identificador único (id). Utiliza el método findIndex() para buscar el índice del dato con el id proporcionado en el array. Si se encuentra un índice válido, se utiliza el método splice() para eliminar ese elemento del array. Luego, se llama al método guardarDatos() para almacenar los datos actualizados en el almacenamiento local.
  }

  // 2.3.A (Vinculado a la función agregarDato) Crear un método para generar un nuevo ID para el nuevo dato

  private generarNuevoId(): number {
    const ids = this.datos.map(dato => dato.id); //el método map() en el array this.datos crea un nuevo array ids que contiene todos los identificadores (id) de los datos existentes. El método map() itera sobre cada elemento del array this.datos y devuelve un nuevo array con los identificadores.
    const maxId = Math.max(...ids); //el método Math.max() junto con el operador de propagación (...) obtiene el valor máximo de los identificadores en el array ids, y el operador de propagación descompone el array ids en una secuencia de argumentos para que Math.max() pueda determinar el valor máximo correctamente.
    return maxId + 1; //devuelve el valor máximo encontrado en el paso anterior incrementado en 1, lo que asegura que el nuevo identificador generado sea único para un nuevo dato que se vaya a agregar
  }
}

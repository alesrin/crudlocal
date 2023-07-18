
//PASO 1 - CREAMOS LA INTERFAZ DATA EN UN ARCHIVO MODEL.TS PARA DEFINIR LA ESTRUCTURA DE LOS DATOS (Creamos archivo data.model.ts)

export interface Data {
    id: number;
    nombre: string;
    edad: number;
    profesion: string;
  }
  

// Nos vamos al paso nº2 --> Crear el servicio (ng g service data)


  /* 
  ¿QUÉ ES UNA INTERFACE?
  
Una interfaz en TypeScript es una forma de definir la estructura de un objeto. Permite especificar qué propiedades y métodos debe tener un objeto que implemente esa interfaz. En nuestro caso, la interfaz Data define la estructura que deben tener los objetos de datos en nuestra aplicación, es decir, qué propiedades deben tener y de qué tipo. 
  

El archivo data.model.ts sirve para definir la estructura de los datos en nuestra aplicación. En él, definimos la interfaz Data que especifica las propiedades y tipos de datos que deben tener los objetos de datos. Al tener esta definición clara en un archivo separado, podemos reutilizarla en diferentes partes de la aplicación y mantener una consistencia en la estructura de los datos. 

Utilizamos el archivo con el nombre de la interfaz seguido de .model.ts para mantener una estructura organizada en el proyecto, separando las definiciones de modelos en archivos específicos.

Si utilizásemos esta interfaz únicamente en DataService, lo habríamos añadido allí directamente; si solo lo utilizásemos en DataForm, lo añadiríamos en DataForm; e utiliza en el componente principal AppComponent y se comparte entre varios componentes de la aplicación, podríamos colocarla en el archivo app.component.ts antes de la declaración de la clase AppComponent. Esto ayudaría a centralizar todas las interfaces comunes en el archivo principal del componente principal. TODO DEPENDE DE LA ESTRUCTURA Y LAS NECESIDADES DEL PROYECTO
  */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Data } from '../data.model';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  //3.1 Creamos una propiedad nuevoDato para mantener el dato actualmente en el formulario
  nuevoDato: Data = {
    id: 0,
    nombre: '',
    edad: 0,
    profesion: ''
  };

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getDatoParaEditar().subscribe((dato: Data | null) => {
      if (dato) {
        this.nuevoDato = dato;
      }
    });
  }

  /* Función de flecha: Un tipo de función cuya lógica es la de una función tradicional pero que incluye algunas consideraciones: 
      1- No se alan como las funciones tradicionales.
      2- Llevan el return implicito
      3- A la izquierda especifica la recepción de argumentos (método en este caso), a la derecha la expresión que se va a evaluar.
      4- No necesita usar el this
      5- Utiliza siempre las {} para delimitar el cuerpo
 */
//Crear métodos para agregar o actualizar un dato y limpiar el formulario

  agregarOActualizarDato(dataForm: NgForm) {
    if (dataForm.valid) {
      if (this.nuevoDato.id === 0) {
        this.dataService.agregarDato(this.nuevoDato);
      } else {
        this.dataService.actualizarDato(this.nuevoDato);
      }
      this.limpiarFormulario(dataForm);
    }
  }

  limpiarFormulario(dataForm: NgForm) {
    this.nuevoDato = {
      id: 0,
      nombre: '',
      edad: 0,
      profesion: ''
    };
    dataForm.resetForm();
    this.dataService.limpiarDatoParaEditar();
  }
}

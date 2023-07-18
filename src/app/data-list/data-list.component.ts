import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Data } from '../data.model';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  datos: Data[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.actualizarDatos();
  }
//4.1 Creamos métodos para eliminar y editar datos


//OBTENEMOS LOS DATOS
  actualizarDatos() {
    this.datos = this.dataService.getDatos();
  }
//ELIMINAMOS DATOS
  eliminarDato(id: number) {
    this.dataService.eliminarDato(id);
    this.actualizarDatos();
  }
//EDITAMOS DATOS
  editarDato(dato: Data) {
    this.dataService.setDatoParaEditar(dato);
  }
}

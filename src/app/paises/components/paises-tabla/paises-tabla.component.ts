import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/paises-interface';

@Component({
  selector: 'app-paises-tabla',
  templateUrl: './paises-tabla.component.html',
  styleUrls: ['./paises-tabla.component.css']
})
export class PaisesTablaComponent {
  @Input() paises: Country[] =[]; //1

}


//1-> Traigo el array de paises con su tipo.
// Todos los datos que ha llenado por-pais.ts los traigo aquí para llenar la tabla
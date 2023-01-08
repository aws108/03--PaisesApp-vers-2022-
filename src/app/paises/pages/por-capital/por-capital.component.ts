import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises-interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent {
  
  termino: string ="";
  hayError: boolean = false;
  paises: Country[] = [];

  constructor(private paisesService: PaisesService){}

  buscarPorCapital(termino: string){
    this.hayError = false; 
    this.termino = termino.trim(); //this.termino (variable de aquí) = termino (variable del parámetro)

    this.paisesService.buscarCapitalService(this.termino)
      .subscribe( (resp) => { //1
        this.paises = resp; //2
        //console.log(this.paises)
      }, (err)=> {
        this.hayError = true; //si hay error, el err es true
        this.paises = [] //Si hay un error, no mostrará nada en la tabla
      }
    );
  }

 
}

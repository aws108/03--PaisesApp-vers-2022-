import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises-interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styleUrls: ['./por-pais.component.css']
})
export class PorPaisComponent {

  termino: string ="";
  hayError: boolean = false;
  paises: Country[] = [];
  paisesSugeridos: Country[] = [];
  mostrarOcultarSugerencias: boolean = false;

  constructor(private paisesService: PaisesService){}

  buscarPorPais(termino: string){
    this.mostrarOcultarSugerencias = false;
    this.hayError = false; 
    this.termino = termino.trim(); //this.termino (variable de aquí) = termino (variable del parámetro)

    this.paisesService.buscarPaisService(this.termino)
      .subscribe( (resp) => { //1
        this.paises = resp; //2
        //console.log(this.paises)
      }, (err)=> {
        this.hayError = true; //si hay error, el err es true
        this.paises = [] //Si hay un error, no mostrará nada en la tabla
      }
    );
  }

  sugerencias(termino: string){
    this.hayError = false;
    this.termino = termino
    this.mostrarOcultarSugerencias = true;

    this.paisesService.buscarPaisService(termino)
      .subscribe( res => this.paisesSugeridos = res.splice(0,3), //3
      (err)=> this.paisesSugeridos = []
    ); 
  }

  buscarSugerido(termino: string){
    this.buscarPorPais(termino);
  }

}

//1-> Respuesta exitosa. Al ponerle el tipado Country, que es un array, ya podrás obtener los
// métodos típicos de un array como el length, pop, etc. La respuesta es de tipo Country
//2-> paises se llena con los datos de la respuesta del get y como paises es de tipo Country,
// ya tienes los datos con su tipo en un array
//3-> la respuesta es un array que mostrará las sugerencias, pero sólo 3 resultados
import { Component } from '@angular/core';
import { Country } from '../../interfaces/paises-interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: ['button{margin-right: 5px;}']
})
export class PorRegionComponent {

  regiones: string[] = ["africa", "americas", "asia", "europe", "oceania"];
  regionActiva: string = ""; //pa saber que región se activo cuando cliques a un botón
  paises: Country[]=[];

  constructor(private paisesService: PaisesService){}

  activarRegion(r: string){
    this.regionActiva = r;
    
    //console.log(this.regionActiva);
    
    this.paisesService.buscarRegionService(this.regionActiva)
    .subscribe( (resp) => { 
      this.paises = resp; 
      
      //console.log("países: ",this.paises)
    });
  }




}



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})

export class VerPaisComponent implements OnInit{

  pais: any;
  
  constructor(private activatedRoute: ActivatedRoute,
              private paisesService: PaisesService){} 


  ngOnInit(): void { //1
    this.activatedRoute.params //observable
      .pipe(                  //operaciones y operadores rxjs
        switchMap( (params)=> this.paisesService.getPaisPorIdService(params["id"])), //4
        tap(console.log) //5 -> devuelve un array
        )
      .subscribe( res=> {this.pais = res[0] }); //el primer elemento de la respuesta, porque devuelve un array
      console.log("pais: ",this.pais)
    
  
  //Te suscribes a los cambios en la URL -> this.activatedRoute.params
  //A partir de los parámetros de la ruta, extraes la parte de la id en 'params' y 
  // en 'res' tienes todos los datos del país
  }

}

//Constructor: actúa antes de iniciarse el componente
//ngOnInit(): actúa cuando el componente se ha iniciado
//activatedRoute.params.subscribe() -> suscríbete al parámetro de la ruta activa, la primera parte
// actúa a modo de observable y por eso nos suscribirmos
//http://localhost:4200/pais/ES -> ES es la id --> path: "pais/:id"
//(params["id"]); -> Así tomamos el código ES. Key [id] -> De los parámetros, toma el id
//.pipe()-> lugar donde se hacen operaciones con los datos del observable activatedRoute.params
//SwitchMap-> recibe un observable y devuelve otro observable

//1-> Nos suscribimos a los cambios de la URL. Al elegir veer un país, cambia el código de país
//2-> Digamos que a la variable id le has asignado el valor del código del país
//3-> Al suscribirte, traes toda la info que viene por el endPoint, que es toda la info del país
//4-> La función de flecha debe devolver un observable, que será la función de la service
// Recibe el valor del observable del activatedRoute.params y retorna aquí un nuevo observable
// Se retorna este observable. El subscribe de más abajo no se modifica
//5-> tap(console.log) recibe el switchmap y lo imprime por consola 


/*
    //Esta es la vers 2:
    this.activatedRoute.params
      .subscribe( params=>{ //2
        console.log(params["id"]); 
      
        this.paisesService.getPaisPorIdService(params["id"])
          .subscribe(pais=>{ //3
            console.log(pais);
        });
    });  */
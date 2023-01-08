import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/paises-interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  constructor(private http: HttpClient) { }

  get httpParams(){
    return new HttpParams().set('fields','name,capital,cca2,flags,population'); //4
  }

  buscarPaisService(termino: string): Observable<Country[]>{ //1
    const endPoint = `${this.apiUrl}/name/${termino}`;
    return this.http.get<Country[]>(endPoint, {params: this.httpParams} ); //2
  }

  buscarCapitalService(termino: string): Observable<Country[]>{
    const endPoint = `${this.apiUrl}/capital/${termino}`;
    return this.http.get<Country[]>(endPoint, {params: this.httpParams} );
  }

  getPaisPorIdService(id: string): Observable<Country>{ //3
    const endPoint = `${this.apiUrl}/alpha/${id}`;
    return this.http.get<Country>(endPoint);
  }

  buscarRegionService(region: string): Observable<Country[]>{
    const endPoint = `${this.apiUrl}/region/${region}`; 
    return this.http.get<Country[]>(endPoint, {params: this.httpParams} );
  }

} 

//1-> Vas a observar la url para estar atento a la info que venga. 
// Lo que devuelve Country es un array de países
//2-> El get necesita el modelo para hacer la petición y devolver el mismo tipo con los datos en sus variables
// Aquí es donde se llena el array de Country con los datos
//En este caso no traes un array porque sólo vas a tener un país

//4-> ?fields=name,capital,cca2,flags,population hace que traiga menos datos a la respuesta
// HttpParams() -> Permite configurar los parámetros del fields de la url
// 
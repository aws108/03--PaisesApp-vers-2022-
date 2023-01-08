import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-paises-input',
  templateUrl: './paises-input.component.html',
  styleUrls: ['./paises-input.component.css']
})
export class PaisesInputComponent implements OnInit{
  
  termino: string = ""; 

  @Output() onEnter: EventEmitter<string> = new EventEmitter(); 
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = ""; //6

  debouncer: Subject<string> = new Subject();

  buscar(){
    this.onEnter.emit(this.termino);
  }

  dBouncer(){
    this.debouncer.next(this.termino); //next manda el siguiente valor, el this.termino
    
  }

  ngOnInit(){
    this.debouncer
    .pipe( debounceTime(300) ) //4
    .subscribe(valor => {
      console.log("debouncer: ",valor);
      this.onDebounce.emit(valor); //5
    })
  }


}

/*

1-> termino: string = ""; -> Se llenará gracias a [(ngModel)]="termino"
2-> @Output() onEnter: EventEmitter<string> = new EventEmitter(); -> output del evento onEnter
3-> Cuando desde el html se llame a buscar(), onEnter emitirá el termino

onDebounce -> emite cuando la persona deja de escribir
Subject -> Hace de observable, por eso en ngOnInit() te suscribes al debouncer
ngOnInit()-> Sólo se dispara una vez, cuando el componente se ha creado
dBouncer()-> Cada vez que alguien presione una tecla, se llama al dBouncer(), llama a next que
  está suscrito en el init y devolverá el valor del debouncer

4-> debounceTime(300) son las milésimas de segundo que hay de espera para llegar al subscribe
  No vayas al subscribe hasta que el debouncer (observable) deje de emitir valores hasta las 300 milésimas
  Escribes en el input, espera 300 milésimas y luego aparece en el console.log lo introducido

5-> emites el evento onDebounce con los datos que lleva el this.debouncer, que gracias a dBouncer()
  ya tienes la palabra introducida por el input. En vez de emitir el valor, se puede emitir el terminio

6-> <app-paises-input placeholder="Buscar por capital..."> en por-capital.html envía a esta clase
  un dato que se recogerá con el @Input para mostrarlo en  el placeholder

  */
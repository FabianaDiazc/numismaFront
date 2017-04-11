import { Component, OnInit,  EventEmitter, Output } from '@angular/core';
import { ObjetoService } from '../../services/objeto.service';
import { Objeto } from '../../models/objeto';

@Component({
  selector: 'object-selector',
  templateUrl: './object-selector.component.html',
  styleUrls: ['./object-selector.component.css']
})
export class ObjectSelectorComponent implements OnInit {

  objetos: Objeto[];
  @Output() onVoted = new EventEmitter<Objeto>();

  constructor(private objetoService: ObjetoService) 
  { }

  ngOnInit() {
    this.objetoService.getObjetos().subscribe(
      (objetos) => {
        this.objetos = objetos;
        console.log(this.objetos);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  select(obj: Objeto) {
    this.onVoted.emit(obj);
  }
  
}

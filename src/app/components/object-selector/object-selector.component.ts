import { Component, OnInit,  EventEmitter, Output, Input } from '@angular/core';
import { ObjetoService } from '../../services/objeto.service';
import { Objeto } from '../../models/objeto';

@Component({
  selector: 'object-selector',
  templateUrl: './object-selector.component.html',
  styleUrls: ['./object-selector.component.css']
})
export class ObjectSelectorComponent implements OnInit {

  objetos: Objeto[];
  checked: boolean[];
  @Output() onVoted = new EventEmitter<Objeto[]>();
  @Input() type: string;

  constructor(private objetoService: ObjetoService) 
  { 
    this.checked = [];
  }

  ngOnInit() {
    console.log(this.type);
    this.objetoService.getObjetos().subscribe(
      (objetos) => {
        this.objetos = objetos.filter(obj => obj.tipo == this.type);
        console.log(this.objetos);
        for(let obj of this.objetos) {
          this.checked.push(false);
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  // select(obj: Objeto) {
  //   this.onVoted.emit(obj);
  // }

  check(index: number) {
    this.checked[index] = !this.checked[index];
  }

  done() {
    let send: Objeto[] = [];
    for(let i = 0; i < this.objetos.length; i++) {
      if(this.checked[i]) send.push(this.objetos[i]);
    }
    if(send.length == 0) {

    } else {
      this.onVoted.emit(send);
    }
  }  
}

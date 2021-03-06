import { Component, OnInit,  EventEmitter, Output, Input } from '@angular/core';
import { ObjetoService } from '../../services/objeto.service';
import { Objeto } from '../../models/objeto';

@Component({
  selector: 'random-selector',
  templateUrl: './random-selector.html',
  styleUrls: ['./random-selector.css']
})
export class RandomSelectorComponent implements OnInit {

  valores: Number[];
  numVals: number = 5;
  @Output() onVotedRandom = new EventEmitter<Number>();
  @Input() type: string;

  constructor(private objetoService: ObjetoService) 
  { }

  ngOnInit() {
    if(this.type == 'billetes') {
      console.log( 'billetes');
      let min = 0;
      let max = 200
      this.valores = [];
      for(let i = 0; i < this.numVals; i++) {
        let val = (~~(Math.random() * (max - min) + min)) * 1000;
        this.valores.push(val);
      }
   } else if(this.type == 'monedas') {
     let min = 0;
      let max = 500
      this.valores = [];
      for(let i = 0; i < this.numVals; i++) {
        // multiplo de 50;
        let val = ( ~~(Math.random() * (max - min) + min) * 10);
        let mod = val % 50
        this.valores.push(val - mod)
      }
   } else {
      let min = 0;
      let max = 2000
      this.valores = [];
      for(let i = 0; i < this.numVals; i++) {
        // multiplo de 50;
        let val = ( ~~(Math.random() * (max - min) + min) * 10);
        let mod = val % 50
        this.valores.push(val - mod)
      }
   }
  }

  select(val: Number) {
    this.onVotedRandom.emit(val);
  }
  
}

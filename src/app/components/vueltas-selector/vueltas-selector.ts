import { Component, OnInit,  EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { ObjetoService } from '../../services/objeto.service';
import { Objeto } from '../../models/objeto';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'vueltas-selector',
  templateUrl: './vueltas-selector.html',
  styleUrls: ['./vueltas-selector.css']
})
export class VueltasSelectorComponent implements OnInit {
  billetes: any[] = [
      // {
      //     value: 1000,
      //     number: 0,
      //     maxNumber: 20,
      //     color: 'default',
      //     imgUrl: "http://www.colombia.co/wp-content/uploads/2015/08/01.jpg"
      // },
      {
          value: 2000,
          number: 0,
          maxNumber: 20,
          color: 'primary',
          imgUrl: "assets/img/billetes/2mil.jpg"
      },
      {
          value: 5000,
          number: 0,
          maxNumber: 20,
          color: 'info',
          imgUrl: "assets/img/billetes/5mil.jpg"
      },
      {
          value: 10000,
          number: 0,
          maxNumber: 20,
          color: 'warning',
          imgUrl: "assets/img/billetes/10mil.jpg"
      },
      {
          value: 20000,
          number: 0,
          maxNumber: 20,
          color: 'success',
          imgUrl: "assets/img/billetes/20mil.jpg"
      },
      {
          value: 50000,
          number: 0,
          maxNumber: 20,
          color: 'danger',
          imgUrl: "assets/img/billetes/50mil.jpg"
      }
  ];

  monedas: any[] = [
      // {
      //     value: 50,
      //     number: 0,
      //     maxNumber: 20,
      //     color: 'danger',
      //     imgUrl: "http://www.globocambio.co/img/monedas/50-peso-new-back.jpg"
      // },
      {
          value: 100,
          number: 0,
          maxNumber: 20,
          color: 'primary',
          imgUrl: "http://www.globocambio.co/img/monedas/100-peso-new-back.jpg"
      },
      {
          value: 200,
          number: 0,
          maxNumber: 20,
          color: 'info',
          imgUrl: "http://www.globocambio.co/img/monedas/200-peso-new-back.jpg"
      },
      {
          value: 500,
          number: 0,
          maxNumber: 20,
          color: 'warning',
          imgUrl: "http://www.globocambio.co/img/monedas/500-peso-new-back.jpg"
      },
      {
          value: 1000,
          number: 0,
          maxNumber: 20,
          color: 'success',
          imgUrl: "http://www.globocambio.co/img/monedas/1000-peso-new-back.jpg"
      }
  ];

  currBillete: any;
  currMoneda: any;
  valores: Number[];
  multi: number;
  @Output() onVueltasSelected = new EventEmitter<Number>();
  @Input() type: string;
  @Input() targetVal: number;
  isLoading: boolean;
  solution: number;
  puntos: number;
  @ViewChild('childModal') public childModal:ModalDirective;

  constructor(private objetoService: ObjetoService) 
  {
    this.puntos = 3;
    this.isLoading = true; 
  }

  ngOnInit() {
    console.log(this.type);
    console.log(this.targetVal);
    if(this.type == 'billetes') {
      console.log( 'billetes');
      for(let i = this.billetes.length-1; i >=0; i--) {
        if(this.billetes[i].value < this.targetVal) {
          this.currBillete = this.billetes[i];
          break;
        }
      }
   } else if(this.type == 'monedas') {
     for(let i = this.monedas.length-1; i >=0; i--) {
        if(this.monedas[i].value < this.targetVal) {
          this.currMoneda = this.monedas[i];
          break;
        }
      }
   } else {
      for(let i = this.billetes.length-1; i >=0; i--) {
        console.log(i);
        console.log(this.billetes[i]);
        if(this.billetes[i].value < this.targetVal) {
          this.currBillete = this.billetes[i];
          break;
        }
      }
      
      for(let i = this.monedas.length-1; i >=0; i--) {
        console.log(i);
        console.log(this.monedas[i]);
        if(this.monedas[i].value < this.targetVal) {
          this.currMoneda = this.monedas[i];
          break;
        }
      }
    }
    console.log(this.currBillete);
    console.log(this.currMoneda);
    if(this.currBillete) {
      this.multi = ~~(this.targetVal / this.currBillete.value);
      this.solution = ((this.multi+1)*this.currBillete.value) - this.targetVal;
    } else {
      this.multi = ~~(this.targetVal / this.currMoneda.value);
      this.solution = ((this.multi+1)*this.currMoneda.value) - this.targetVal;
    }

    this.valores = [this.solution, this.solution, this.solution];
    let num0s = 0;
    let auxVal = this.solution;
    while((auxVal / 10) ==  Math.floor(auxVal / 10)) {
      num0s++;
      auxVal = auxVal / 10;
      console.log(auxVal);
    }
    console.log('num 0s: ' + num0s);
    let numdigits = auxVal.toString().length
    
    for(let i = 0; i < 2; i++) {
      let rand = 0;
      do {
        rand = Math.floor((Math.random() * 3)) + 1;
        rand--;
        console.log('intentar rand: ' + rand);
      } while(this.valores[rand] != this.solution);
      console.log('voy a usar rand: ' + rand);
      
      this.valores[rand] = Math.floor((Math.random() *  Math.pow(10,numdigits)) + 1) * Math.pow(10, num0s);
      // console.log('rand ' + rand );
    }
    this.isLoading = false;
  }
  
  select(val: Number) {
    if(val == this.solution) {
      console.log('ganaste');
      this.onVueltasSelected.emit(this.puntos);
    } else {
      console.log('mal');
      this.puntos--;
      this.childModal.show();
    }
    
  }
  
  retry() {
    this.childModal.hide();
  }
}

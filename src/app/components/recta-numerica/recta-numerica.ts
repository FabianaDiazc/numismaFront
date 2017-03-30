import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes
 } from '@angular/core';

@Component({
  selector: 'recta-numerica',
  templateUrl: './recta-numerica.html',
  styleUrls: ['./recta-numerica.css'],
  animations: [
        trigger('focusPanel', [
            state('inactive', style({
                transform: 'scale(1)',
                backgroundColor: '#eee'
            })),
            state('active', style({
                transform: 'scale(1.1)',
                backgroundColor: '#cfd8dc'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ]),

        trigger('movePanel', [
            transition('void => *', [
                animate(600, keyframes([
                    style({opacity: 0, transform: 'translateY(-200px)', offset: 0}),
                    style({opacity: 1, transform: 'translateY(25px)', offset: .75}),
                    style({opacity: 1, transform: 'translateY(0)', offset: 1}),
                ]))
            ])
        ])


    ]
  })
export class RectaNumericaComponent {
    state: string = 'inactive';
    currValue: number;
    targetValue: number;
    progressType: string;
    checkModel:any = {monedas: true, billetes: false};
    editTarget: boolean;
    billetes: any[] = [
        {
            value: 1000,
            number: 0,
            maxNumber: 10,
            imgUrl: "http://www.colombia.co/wp-content/uploads/2015/08/01.jpg"
        },
        {
            value: 2000,
            number: 0,
            maxNumber: 5,
            imgUrl: "http://www.colombia.co/wp-content/uploads/2015/08/02.jpg"
        },
        {
            value: 5000,
            number: 0,
            maxNumber: 5,
            imgUrl: "http://www.colombia.co/wp-content/uploads/2015/08/05.jpg"
        },
        {
            value: 10000,
            number: 0,
            maxNumber: 5,
            imgUrl: "http://www.colombia.co/wp-content/uploads/2015/08/10.jpg"
        },
        {
            value: 20000,
            number: 0,
            maxNumber: 5,
            imgUrl: "http://www.colombia.co/wp-content/uploads/2015/08/20.jpg"
        },
        {
            value: 50000,
            number: 0,
            maxNumber: 5,
            imgUrl: "http://www.colombia.co/wp-content/uploads/2015/08/50.jpg"
        }
    ];

    monedas: any[] = [
        {
            value: 50,
            number: 0,
            maxNumber: 5,
            imgUrl: "http://www.globocambio.co/img/monedas/50-peso-new-back.jpg"
        },
        {
            value: 100,
            number: 0,
            maxNumber: 10,
            imgUrl: "http://www.globocambio.co/img/monedas/100-peso-new-back.jpg"
        },
        {
            value: 200,
            number: 0,
            maxNumber: 10,
            imgUrl: "http://www.globocambio.co/img/monedas/200-peso-new-back.jpg"
        },
        {
            value: 500,
            number: 0,
            maxNumber: 10,
            imgUrl: "http://www.globocambio.co/img/monedas/500-peso-new-back.jpg"
        },
        {
            value: 1000,
            number: 0,
            maxNumber: 5,
            imgUrl: "http://www.globocambio.co/img/monedas/1000-peso-new-back.jpg"
        }
    ];

    constructor() {
        this.targetValue = 57000;
        this.currValue = 0;
        this.progressType = 'info';
        this.editTarget = false;
    }

    toggleMove() {
        this.state = (this.state === 'inactive' ? 'active' : 'inactive');
    }

    changed(event: any) {
        console.log(event.value);
    }

    add(billete: any) {
        if(billete.number < billete.maxNumber) {
            billete.number++;
            this.currValue += billete.value;
        }
        this.calculateColor();
    }

    substract(billete: any) {
        if(billete.number > 0) {
            billete.number--;
            this.currValue -= billete.value;
        }
        this.calculateColor();
    }

    calculateColor() {
        if(this.currValue < this.targetValue) {
            this.progressType = 'info';
        } else if (this.currValue > this.targetValue) {
            this.progressType = 'danger';
        } else if (this.currValue == this.targetValue) {
            this.progressType = 'success';
        }
        console.log(this.progressType);
    }

}

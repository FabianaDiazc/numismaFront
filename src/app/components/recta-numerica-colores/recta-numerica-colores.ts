import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes,
    ViewChild,
    ElementRef
 } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario';
import { Objeto } from '../../models/objeto';
import { Router }  from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'recta-numerica-colores',
  templateUrl: './recta-numerica-colores.html',
  styleUrls: ['./recta-numerica-colores.css'],
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
export class RectaNumericaColoresComponent {
    isLoading: boolean;
    state: string = 'inactive';
    currValue: number;
    targetValue: number;
    progressType: string;
    checkModel:any = {monedas: true, billetes: false};
    editTarget: boolean;
    usuario: Usuario;
    choosenObject: Objeto;
    textEstoy: string = 'Monedas';

    @ViewChild('childModal') public childModal:ModalDirective;
    // @ViewChild('avatar') avatar: ElementRef;

    billetes: any[] = [
        // {
        //     value: 1000,
        //     number: 0,
        //     maxNumber: 20,
        //     color: 'primary',
        //     imgUrl: "http://www.colombia.co/wp-content/uploads/2015/08/01.jpg"
        // },
        {
            value: 2000,
            number: 0,
            maxNumber: 20,
            color: 'primary',
            imgUrl: "http://www.banrep.gov.co/billetes/2-mil/images/2000/anverso2000.jpg"
        },
        {
            value: 5000,
            number: 0,
            maxNumber: 20,
            color: 'info',
            imgUrl: "http://www.banrep.gov.co/billetes/5-mil/images/5000/anverso5000.jpg"
        },
        {
            value: 10000,
            number: 0,
            maxNumber: 20,
            color: 'warning',
            imgUrl: "http://www.banrep.gov.co/billetes/10-mil/images/10000/anverso10000.jpg"
        },
        {
            value: 20000,
            number: 0,
            maxNumber: 20,
            color: 'success',
            imgUrl: "http://www.banrep.gov.co/billetes/20-mil/images/20000/anverso20000.jpg"
        },
        {
            value: 50000,
            number: 0,
            maxNumber: 20,
            color: 'danger',
            imgUrl: "http://www.banrep.gov.co/billetes/50-mil/images/50000/anverso50000.png"
        }
    ];

    monedas: any[] = [
        {
            value: 50,
            number: 0,
            maxNumber: 20,
            color: 'danger',
            imgUrl: "http://www.globocambio.co/img/monedas/50-peso-new-back.jpg"
        },
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

    constructor(private usuarioService: UsuarioService,
                private router: Router,)
    {
        this.isLoading = true;
        this.targetValue = 57000;
        this.currValue = 0;
        this.progressType = 'info';
        this.editTarget = false;
        let token = this.usuarioService.getToken();
        if(!token) {
            this.router.navigate(['/login']);
        } else { 
            this.usuarioService.getAuthCustomer().subscribe(
                (usuario) => {
                    this.usuarioService.setUsuario(usuario);
                    this.usuario = usuario;
                    this.isLoading = false;
                },
                (error) => {
                    this.router.navigate(['/login']);
                }
            )
        }
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
        // this.avatar.nativeElement.style.left = 'calc(50% - 30px)';
        let percentage = this.currValue / this.targetValue;
        console.log(percentage);
        if(percentage > 1) {
            // this.avatar.nativeElement.style.left = 'calc(100% - 30px)';
        } else {
            // this.avatar.nativeElement.style.left = `calc(${percentage*100}% - 30px)`;
        }
        if(this.currValue < this.targetValue) {
            this.progressType = 'info';
        } else if (this.currValue > this.targetValue) {
            this.progressType = 'danger';
        } else if (this.currValue == this.targetValue) {
            this.progressType = 'success';
            this.showChildModal();
        }
        console.log(this.progressType);
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    goToMenu() {
        this.router.navigate(['/menu']);
    }

    onVoted(obj: Objeto) {
        this.choosenObject = obj;
        this.targetValue = this.choosenObject.valor;
    }

    public showChildModal():void {
        this.childModal.show();
    }

    continue() {
        this.router.navigate(['/balanza']);
    }

    changeEstoy() {
        if(this.textEstoy == 'Monedas') {
            this.checkModel.monedas = false;
            this.checkModel.billetes = true;
            this.textEstoy = 'Billetes';
        } else {
            this.checkModel.monedas = true;
            this.checkModel.billetes = false;
            this.textEstoy = 'Monedas';
        }
        this.reset();
    }

    reset() {
        this.currValue = 0;
        for(let moneda of this.monedas) {
            moneda.number = 0;
        }
        for(let billete of this.billetes) {
            billete.number = 0;
        }
    }

    calculatePorcentage(color: string) {
        let colorValue: number = 0;
        console.log('entre con ' + color);
        if(this.textEstoy == 'Monedas') {
            for(let moneda of this.monedas.filter(moneda => moneda.color == color)) {
                colorValue += moneda.value * moneda.number;
            }
        } else {
            for(let billete of this.billetes.filter(billete => billete.color == color)) {
                colorValue += billete.value * billete.number;
            }
        }

        let percentage = colorValue / this.targetValue;
        return percentage * 100;
    }
}

import {
    Component,
    trigger,
    state,
    style,
    transition,
    animate,
    keyframes,
    ViewChild,
    ElementRef,
    OnInit
 } from '@angular/core';
import { UsuarioService } from '../../services/usuario-service';
import { Usuario } from '../../models/usuario';
import { Objeto } from '../../models/objeto';
import { Router, ActivatedRoute }  from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { NivelService } from '../../services/nivel-service';
import { Puntaje } from '../../models/puntaje';
import { Observable } from 'rxjs/Rx';

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
export class RectaNumericaComponent implements OnInit {
    isLoading: boolean;
    state: string = 'inactive';
    currValue: number;
    targetValue: number;
    progressType: string;
    checkModel:any = {monedas: true, billetes: false};
    editTarget: boolean;
    usuario: Usuario;
    choosenObject: Objeto;
    valueSelected: Boolean;
    messagePista: string;

    @ViewChild('childModal') public childModal:ModalDirective;
    @ViewChild('avatar') avatar: ElementRef;
    @ViewChild('childModalPista') public childModalPista:ModalDirective;
    @ViewChild('childModalTePasaste') public childModalTePasaste:ModalDirective;
    
    billetes: any[] = [
        {
            value: 1000,
            number: 0,
            maxNumber: 20,
            imgUrl: "http://www.colombia.co/wp-content/uploads/2015/08/01.jpg"
        },
        {
            value: 2000,
            number: 0,
            maxNumber: 20,
            imgUrl: "assets/img/billetes/2mil.jpg"
        },
        {
            value: 5000,
            number: 0,
            maxNumber: 20,
            imgUrl: "assets/img/billetes/5mil.jpg"
        },
        {
            value: 10000,
            number: 0,
            maxNumber: 20,
            imgUrl: "assets/img/billetes/10mil.jpg"
        },
        {
            value: 20000,
            number: 0,
            maxNumber: 20,
            imgUrl: "assets/img/billetes/20mil.jpg"
        },
        {
            value: 50000,
            number: 0,
            maxNumber: 20,
            imgUrl: "assets/img/billetes/50mil.jpg"
        }
    ];

    monedas: any[] = [
        {
            value: 50,
            number: 0,
            maxNumber: 20,
            imgUrl: "http://www.globocambio.co/img/monedas/50-peso-new-back.jpg"
        },
        {
            value: 100,
            number: 0,
            maxNumber: 20,
            imgUrl: "http://www.globocambio.co/img/monedas/100-peso-new-back.jpg"
        },
        {
            value: 200,
            number: 0,
            maxNumber: 20,
            imgUrl: "http://www.globocambio.co/img/monedas/200-peso-new-back.jpg"
        },
        {
            value: 500,
            number: 0,
            maxNumber: 20,
            imgUrl: "http://www.globocambio.co/img/monedas/500-peso-new-back.jpg"
        },
        {
            value: 1000,
            number: 0,
            maxNumber: 20,
            imgUrl: "http://www.globocambio.co/img/monedas/1000-peso-new-back.jpg"
        }
    ];
    puntajes: Puntaje[];
    type: string;
    currPuntaje: Puntaje;
    nivel: number;
    mensajeGanaste: string;
    mensajeBoton: string;
    subscription: any;
    tipos: string[] = ['M', 'B', '2', 'MIN'];

    constructor(private usuarioService: UsuarioService,
                private router: Router,
                private route: ActivatedRoute,
                private nivelService: NivelService)
    {
        this.valueSelected = false;
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

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.nivel = +params['nivel'];
            console.log('entre con nivel: ' + this.nivel);
            this.nivelService.getPuntajesJuegoActual().subscribe(
                (puntajes) => { 
                    this.puntajes = puntajes; 
                    console.log(this.puntajes);
                    this.currPuntaje = this.puntajes.find(puntaje =>  puntaje.nivel.nombre == 'RECTA_NUMERICA' && puntaje.nivel.tipo == this.tipos[this.nivel]);
                    console.log(this.currPuntaje);
                    if(this.currPuntaje.estado == 'BLOQUEADO') {
                        this.router.navigate(['/menu', 0]);
                    }
                    this.currPuntaje.puntos = 10;

                    this.type = this.currPuntaje.nivel.tipo == 'M' ? 'monedas' : this.currPuntaje.nivel.tipo == 'B' ? 'billetes' : 'both';
                    if(this.type == 'monedas') {
                        this.checkModel.monedas = true;
                        this.checkModel.billetes = false;
                    } else if (this.type == 'billetes') {
                        this.checkModel.monedas = false;
                        this.checkModel.billetes = true;
                    } else {
                        this.checkModel.monedas = true;
                        this.checkModel.billetes = true;
                    }
                    console.log(this.type);
                    this.showPistaAfter2min();
                    this.isLoading = false;
                },
                (error) => { 
                    console.log(error); 
                    this.isLoading = false;
                }
            );
        });
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
        this.avatar.nativeElement.style.left = 'calc(50% - 30px)';
        let percentage = this.currValue / this.targetValue;
        console.log(percentage);
        if(percentage > 1) {
            this.avatar.nativeElement.style.left = 'calc(100% - 30px)';
            this.avatar.nativeElement.style.height = '150px';
        } else {
            this.avatar.nativeElement.style.left = `calc(${percentage*100}% - 30px)`;
            console.log(percentage*100);
            this.avatar.nativeElement.style.height = 150*percentage + 'px';
        }
        if(this.currValue < this.targetValue) {
            this.progressType = 'info';
        } else if (this.currValue > this.targetValue) {
            this.progressType = 'danger';
            this.childModalTePasaste.show();
            this.currPuntaje.puntos--;
        } else if (this.currValue == this.targetValue) {
            this.progressType = 'success';
            this.showChildModal();
        }
        console.log(this.progressType);
    }

    terminarNivel() {
        this.subscription.unsubscribe();
        let nextPuntaje = this.puntajes.find(puntaje => puntaje.nivel.id == this.currPuntaje.nivel.siguiente);
        this.nivelService.terminarNivel(this.currPuntaje).subscribe(
            (data) => {
                if(nextPuntaje && nextPuntaje.estado == 'BLOQUEADO')
                    this.nivelService.actualizarNivel(nextPuntaje).subscribe(
                        (data) => {
                            this.router.navigate(['/balanza', this.nivel]);
                        },
                        (error) => {
                            console.log(error);
                        }
                    )
                else {
                    this.router.navigate(['/balanza', this.nivel]);
                }
            },
            (error) => {
                console.log(error);
            }
        )
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }

    goToMenu() {
        this.router.navigate(['/menu', 0]);
    }

    onVoted(obj: Objeto) {
        this.choosenObject = obj;
        this.targetValue = this.choosenObject.valor;
        this.valueSelected = true;
    }

    onVotedRandom(val: number) {
        this.targetValue = val;
        this.valueSelected = true;
    }

    public showChildModal():void {
        if(this.currPuntaje.puntos >= 3) {
            this.mensajeGanaste = "¡¡Ganaste!! obtuviste " + this.currPuntaje.puntos + " puntos.";
            this.mensajeBoton = "Continuar";
        } else {
            this.mensajeGanaste = "Obtuvuste " + this.currPuntaje.puntos + " punto(s). Necesitas al menos 3 para pasar al siguente juego.";
            this.mensajeBoton = "Volver a intentar";
        }
        this.childModal.show();
    }

    continue() {
        if(this.currPuntaje.puntos >= 3)
            this.terminarNivel();
        else {
            this.valueSelected = false;
            this.currPuntaje.puntos = 10;
            this.currValue = 0;
            this.monedas.map(moneda => moneda.number = 0);
            this.billetes.map(billete => billete.number = 0);
            console.log('me voy a desuscribir');
            this.subscription.unsubscribe();
            this.childModal.hide();
        }
    }

    showPista(message: string) {
        if(!message) message= '';
        this.currPuntaje.puntos--;
        if(this.targetValue-this.currValue > 0)
            this.messagePista = message + " te faltan: " ;
        else
            this.messagePista = message + " te sobran: " ;
        this.childModalPista.show();
    }

    dismisPista() {
        this.childModalPista.hide();
    }

    dismisTePasaste() {
        this.childModalTePasaste.hide();
    }

    showPistaAfter2min () {
        this.subscription = this.sleep(120000).subscribe(
            () => {
                this.showPista("Vas 2 minutos: ");
            }
        );
    }

    sleep (time) {
        return Observable.timer(time);
        // return new Observable.timeout();
    //   return new Promise((resolve) => setTimeout(resolve, time));
    }

    myAbs(val: number) {
      return Math.abs(val);
    }
}

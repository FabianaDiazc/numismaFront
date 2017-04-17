import { SERVER_URL } from '../services/config';

export class Usuario {
    id: number;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    genero: string;
    passwrod: string;
    avatar_recta: any;
    avatar_balanza: any;

    constructor(data: any) {
        this.id = data.id;
        this.username = data.username;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.genero = data.genero;
        this.password = data.password;
        if(data.avatar_recta) {
            this.avatar_recta = data.avatar_recta;
            this.avatar_balanza = data.avatar_balanza;
        } else {
            console.log(data.avatarRecta);
            this.avatar_recta = SERVER_URL + data.avatarRecta.imagen;
            console.log(this.avatar_recta);
            this.avatar_balanza = SERVER_URL + data.avatarBalanza.imagen;
        }
    }
}
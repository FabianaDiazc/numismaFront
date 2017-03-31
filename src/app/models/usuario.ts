export class Usuario {
    id: number;
    username: string;
    password: string;
    first_name: string;
    last_name: string;
    genero: string;
    passwrod: string;

    constructor(data: any) {
        this.id = data.id;
        this.username = data.username;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.genero = data.genero;
        this.password = data.password;
    }
}
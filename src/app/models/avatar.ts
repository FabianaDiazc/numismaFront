export class Avatar {
    id: number;
    imagen: string;
    juego: string;
    name: string;

    constructor(data: any) {
        this.id = data.id;
        this.juego = data.juego;
        this.imagen = data.imagen;
        let arr = this.imagen.split('/');
        this.name = arr[arr.length-1]
    }
}
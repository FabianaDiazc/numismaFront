export class Objeto {
    id: number;
    nombre: string;
    imagen: string;
    valor: number;
    tipo: string;

    constructor(data: any) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.imagen = data.imagen;
        this.valor = data.valor;
        this.tipo = data.tipo;
    }
}
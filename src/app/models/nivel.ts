export class Nivel {
    id: number;
    nombre: string;
    tipo: string;
    siguiente: number;

    constructor(data: any) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.tipo = data.tipo;
        this.siguiente = data.siguiente;
    }
}
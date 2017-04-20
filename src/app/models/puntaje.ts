import { Nivel } from './nivel';

export class Puntaje {
    id: number;
    estado: string;
    nivel: Nivel;

    constructor(data: any) {
        this.id = data.id;
        this.estado = data.estado;
        this.nivel = new Nivel(data.nivel);
    }
}
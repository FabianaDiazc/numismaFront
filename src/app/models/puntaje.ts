import { Nivel } from './nivel';

export class Puntaje {
    id: number;
    estado: string;
    nivel: Nivel;
    puntos: number;

    constructor(data: any) {
        this.id = data.id;
        this.estado = data.estado;
        this.puntos = data.puntos;
        this.nivel = new Nivel(data.nivel);
    }
}
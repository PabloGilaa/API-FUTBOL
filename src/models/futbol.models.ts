export type Jugador = {
    id: number;
    nombre: string;
    goles: number;
}

export type Equipo = {
    id: number;
    nombre: string;
    division: string;
    jugadores: Jugador[];
}
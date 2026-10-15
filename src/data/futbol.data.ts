import type { Equipo } from "../models/futbol.models.js";

export let equipos: Equipo[] = [
    {
        id: 1,
        nombre: "Real Madrid",
        division: "Primera División",
        jugadores: [
            {
                id: 1,
                nombre: "Kylian Mbappé",
                goles: 0
            }
        ]
    },
    {
        id: 2,
        nombre: "FC Barcelona",
        division: "Primera División",
        jugadores: [
          {
                id: 1,
                nombre: "Lamine Yamal",
                goles: 0
            }
        ]
    }
];

export let nextEquipoId = 3;
export let nextJugadorId = 2;

export const changeEquipos = (equiposParams: Equipo[]) => {
    equipos = equiposParams;
};

export const incrementEquipoId = () => {
    nextEquipoId++;
};

export const incrementJugadorId = () => {
    nextJugadorId++;
};
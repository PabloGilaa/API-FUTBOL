import type { Request, Response } from "express";
import {
    equipos,
    changeEquipos,
    nextEquipoId,
    nextJugadorId,
    incrementEquipoId,
    incrementJugadorId
} from "../data/futbol.data.js";


const findEquipo = (id: number, res: Response) => {
    const equipo = equipos.find(x => x.id === id);

    if (!equipo) {
        res.status(404).json({
            message: "no equipo"
        });
        return;
    }

    return equipo;
};



export const getEquipos = (
    req: Request,
    res: Response
) => {
    res.json(equipos);
};

export const getEquipoWithID = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const equipo = findEquipo(id, res);

    if (equipo) {
        res.json(equipo);
    }
};

export const createEquipo = (
    req: Request,
    res: Response
) => {
    const { nombre, division } = req.body;

    if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
        res.status(400).json({
            message: "Nombre obligatorio"
        });
        return;
    }

    if (!division || typeof division !== "string" || division.trim() === "") {
        res.status(400).json({
            message: "División obligatoria"
        });
        return;
    }

    const nuevoEquipo = {
        id: nextEquipoId,
        nombre: nombre.trim(),
        division: division.trim(),
        jugadores: []
    };

    incrementEquipoId();
    equipos.push(nuevoEquipo);

    res.status(201).json(nuevoEquipo);
};

export const updateEquipo = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const equipo = findEquipo(id, res);

    if (equipo) {
        const { nombre, division } = req.body;

        if (nombre !== undefined && (typeof nombre !== "string" || nombre.trim() === "")) {
            res.status(400).json({
                message: "Nombre no válido"
            });
            return;
        }

        if (division !== undefined && (typeof division !== "string" || division.trim() === "")) {
            res.status(400).json({
                message: "División no válida"
            });
            return;
        }

        if (nombre) equipo.nombre = nombre.trim();
        if (division) equipo.division = division.trim();

        res.json(equipo);
    }
};

export const deleteEquipo = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const equipo = findEquipo(id, res);

    if (equipo) {
        changeEquipos(equipos.filter(x => x.id !== id));
        res.json({
            message: "Equipo eliminado"
        });
    } else {
        res.status(400).json({
            message: "No se pudo eliminar"
        });
    }
};



export const getJugadoresByEquipo = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const equipo = findEquipo(id, res);

    if (equipo) {
        res.json(equipo.jugadores);
    }
};

export const addJugador = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);

    const equipo = findEquipo(id, res);

    if (equipo) {
        const { nombre, goles } = req.body;

        if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
            res.status(400).json({
                message: "Nombre de jugador obligatorio"
            });
            return;
        }

        if (goles === undefined || typeof goles !== "number" || goles < 0 || !Number.isInteger(goles)) {
            res.status(400).json({
                message: "Goles debe ser un entero >= 0"
            });
            return;
        }

        const nuevoJugador = {
            id: nextJugadorId,
            nombre: nombre.trim(),
            goles
        };

        incrementJugadorId();
        equipo.jugadores.push(nuevoJugador);

        res.status(201).json(nuevoJugador);
    }
};

export const deleteJugador = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);
    const jugadorId = Number(req.params.jugadorId);

    const equipo = findEquipo(id, res);

    if (equipo) {
        const jugador = equipo.jugadores.find(x => x.id === jugadorId);

        if (!jugador) {
            res.status(404).json({
                message: "no jugador"
            });
            return;
        }

        equipo.jugadores = equipo.jugadores.filter(x => x.id !== jugadorId);

        res.json({
            message: "Jugador eliminado"
        });
    }
};

export const moveJugador = (
    req: Request,
    res: Response
) => {
    const id = Number(req.params.id);
    const jugadorId = Number(req.params.jugadorId);
    const { equipoDestinoId } = req.body;

    const destinoId = Number(equipoDestinoId);

    if (!equipoDestinoId || isNaN(destinoId)) {
        res.status(400).json({
            message: "equipoDestinoId no válido"
        });
        return;
    }

    if (id === destinoId) {
        res.status(400).json({
            message: "El equipo de destino no puede ser el mismo que el de origen"
        });
        return;
    }

    const equipoOrigen = findEquipo(id, res);
    if (!equipoOrigen) return;

    const equipoDestino = equipos.find(x => x.id === destinoId);
    if (!equipoDestino) {
        res.status(404).json({
            message: "no equipo destino"
        });
        return;
    }

    const jugadorIndex = equipoOrigen.jugadores.findIndex(x => x.id === jugadorId);
    if (jugadorIndex === -1) {
        res.status(404).json({
            message: "no jugador en equipo origen"
        });
        return;
    }

    const [jugadorMover] = equipoOrigen.jugadores.splice(jugadorIndex, 1);

    if (!jugadorMover) {
        res.status(404).json({
            message: "no jugador en equipo origen"
        });
        return;
    }

    equipoDestino.jugadores.push(jugadorMover);

    res.json({
        message: "Jugador movido",
        jugador: jugadorMover
    });
};
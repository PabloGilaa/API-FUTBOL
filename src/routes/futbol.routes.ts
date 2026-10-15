import { Router } from "express";
import {
    getEquipos,
    getEquipoWithID,
    createEquipo,
    updateEquipo,
    deleteEquipo,
    getJugadoresByEquipo,
    addJugador,
    deleteJugador,
    moveJugador
} from "../controllers/futbol.controllers.js";

const router = Router();


router.get("/", getEquipos);
router.get("/:id", getEquipoWithID);
router.post("/", createEquipo);
router.put("/:id", updateEquipo);
router.delete("/:id", deleteEquipo);

// Rutas de Jugadores
router.get("/:id/jugadores", getJugadoresByEquipo);
router.post("/:id/jugadores", addJugador);
router.delete("/:id/jugadores/:jugadorId", deleteJugador);
router.patch("/:id/jugadores/:jugadorId/mover", moveJugador);

export default router;
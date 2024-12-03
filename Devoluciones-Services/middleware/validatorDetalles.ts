import {param, validationResult} from "express-validator"
import { Request, Response, NextFunction } from "express";
import { DevolucionRepository } from "../repositories/DevolucionesRepository";

const validatorDetalles = [
    param("id_devolucion")
    .isInt({min: 1})
    .withMessage("El id de la devolución debe ser un número entero mayor a 0")
    .bail()
    .custom(async (value) => {
        const repository = new DevolucionRepository();
        const venta = await repository.buscarId(Number(value));
        if (!venta) {
            throw new Error("La venta no existe");
        }
        return true;
    })
];

function validarDetalle(req: Request, res: Response, next: NextFunction): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    next();
}

export default {
    validatorDetalles,
    validarDetalle
};
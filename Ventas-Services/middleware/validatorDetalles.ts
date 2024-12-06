import { param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { VentasRepository } from '../repositories/VentaRepository';

const validatorDetalles = [
    param("id_venta")
    .isInt({min: 1})
    .withMessage("El id de la venta debe ser un número entero mayor a 0")
    .bail()
    .custom(async (value) => {
        const repository = new VentasRepository();
        const venta = await repository.buscarPorId(Number(value));
        if (!venta) {
            throw new Error("La venta no tiene detalles asociados");
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
import { param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { obtenerPorIdVentas } from "../services/ObtenerPorId";

const validatorParams = [
  param("id_venta")
    .isInt({ min: 1 })
    .withMessage("El ID de la venta debe ser un número entero mayor a 0")
    .bail()
    .custom(async (value) => {
      const venta = await obtenerPorIdVentas(Number(value));
      if (!venta) {
        throw new Error("La venta no existe");
      }
    }),
];

function validator(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
}

export default {
  validatorParams,
  validator,
};

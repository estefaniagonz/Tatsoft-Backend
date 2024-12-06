import { param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validatorEliminar = [
  param("id_devolucion")
    .notEmpty()
    .withMessage("El ID de la devolución es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El ID de la devolución debe ser un número entero positivo."),
];

function validarEliminar(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
}

export default {
  validatorEliminar,
  validarEliminar,
};

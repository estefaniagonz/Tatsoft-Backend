import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validatorCrear = [
  body("producto_id")
    .notEmpty()
    .withMessage("El ID del producto es obligatorio.")
    .isInt({ min: 1 })
    .withMessage("El ID del producto debe ser un número entero positivo."),
  body("cantidad")
    .notEmpty()
    .withMessage("La cantidad es obligatoria.")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero positivo."),
  body("motivo")
    .notEmpty()
    .withMessage("El motivo es obligatorio")
    .isString()
    .withMessage("El motivo debe ser un texto."),
];

function validarCrear(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
}

export default {
  validatorCrear,
  validarCrear,
};

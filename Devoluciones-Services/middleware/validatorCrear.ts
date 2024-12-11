import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validatorCrear = [
  body("motivo")
    .notEmpty()
    .withMessage("El motivo es obligatorio")
    .isString()
    .withMessage("El motivo debe ser un texto."),

  body("fecha_devolucion")
    .notEmpty()
    .withMessage("La fecha de devolución es obligatoria")
    .isISO8601()
    .withMessage("La fecha de devolución debe tener un formato válido (ISO8601)."),

  body("total")
    .notEmpty()
    .withMessage("El total es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El total debe ser un número positivo."),

  body("valor_devolucion")
    .notEmpty()
    .withMessage("El valor de devolución es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El valor de devolución debe ser un número positivo."),

  body("id_producto")
    .notEmpty()
    .withMessage("El ID del producto es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El ID del producto debe ser un número entero positivo."),
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
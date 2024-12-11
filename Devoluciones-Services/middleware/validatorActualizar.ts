import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validatorActualizar = [
  body("fecha_devolucion")
    .optional()
    .isISO8601()
    .withMessage("La fecha debe estar en formato ISO 8601 válido."),

  body("motivo")
    .optional()
    .isString()
    .withMessage("El motivo debe ser un texto.")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage("El motivo debe tener entre 3 y 255 caracteres."),

  body("total")
    .optional()
    .isFloat({ min: 1 })
    .withMessage("El total debe ser un número positivo."),

  body("valor_devolucion")
    .optional()
    .isFloat({ min: 1 })
    .withMessage("El valor de devolución debe ser un número positivo."),
];

function validarActualizar(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
}

export default {
  validatorActualizar,
  validarActualizar,
};
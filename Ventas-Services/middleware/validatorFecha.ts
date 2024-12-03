import { query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validatorFecha = [
  query("fecha_entrega")
    .notEmpty()
    .withMessage("La fecha es requerida.")
    .bail()
    .isISO8601()
    .withMessage("La fecha debe tener un formato válido (YYYY-MM-DD)."),
];

function validarFecha(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }
  next();
}

export default {
  validatorFecha,
  validarFecha,
};

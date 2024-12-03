import { query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validarEstados = ["PENDIENTE", "APROBADO", "RECHAZADO"];

const validatorEstado = [
    query("estado")
      .custom((value) => {
        const estadoNormalizado = value ? value.toUpperCase() : "";
        if (!validarEstados.includes(estadoNormalizado)) {
          throw new Error(`El estado debe ser uno de los siguientes: ${validarEstados.join(", ")}`);
        }
        return true;
      }),
  ];

function validarEstado(req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
}

export default {
  validatorEstado,
  validarEstado,
};

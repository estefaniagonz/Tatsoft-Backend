import { query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validatorMonto = [
  query("montoMin")
    .isFloat({ min: 0.01 }) // Asegura que el monto mínimo sea mayor que 0
    .withMessage("El monto mínimo debe ser un número mayor que cero.")
    .bail()
    .optional(),
  query("montoMax")
    .isFloat({ min: 0.01 }) // Asegura que el monto máximo sea mayor que 0
    .withMessage("El monto máximo debe ser un número mayor que cero.")
    .bail()
    .optional(),
  query("montoMax")
    .custom((value, { req }) => {
      if (req.query && req.query.montoMin && parseFloat(value) < parseFloat(req.query.montoMin as string)) {
        throw new Error("El monto máximo no puede ser menor que el monto mínimo.");
      }
      return true;
    })
    .optional(),
];

  
  function validarMonto (req: Request, res: Response , next: NextFunction): void{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          res.status(400).json({ errors: errors.array() });
          return;    
      }
      next ()
  }
  
  export default {
    validatorMonto,
    validarMonto
  };
  
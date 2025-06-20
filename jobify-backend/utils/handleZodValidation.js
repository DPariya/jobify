// utils/handleZodValidation.js
// Pattern: Higher-Order Function
// Principle: DRY + Strategy Pattern

export const handleZodValidation = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      const error = err.errors?.[0]?.message || 'Invalid input';
      return res.status(400).json({ msg: error });
    }
  };
};

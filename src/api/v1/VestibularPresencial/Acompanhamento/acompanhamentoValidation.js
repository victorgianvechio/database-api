import Joi from 'joi';

export default (req, res, next) => {
  const { error } = Joi.validate(
    req.params,
    Joi.object().keys({
      cpf: Joi.number().required(),
    })
  );
  if (error) return res.status(400).json(error.details);

  return next();
};

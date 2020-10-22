import Joi from 'joi';

export default (req, res, next) => {
  const { error } = Joi.validate(
    req.body,
    Joi.object().keys({
      value: Joi.string().required(),
    })
  );
  if (error) return res.status(400).json(error.details);

  return next();
};

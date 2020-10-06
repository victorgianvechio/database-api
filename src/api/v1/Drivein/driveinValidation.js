import Joi from 'joi';

export default (req, res, next) => {
  const { error } = Joi.validate(
    req.body,
    Joi.object().keys({
      board: Joi.string().required(),
      event_name: Joi.string().required(),
      participants: Joi.array().items(
        Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().required(),
          cpf: Joi.string().required(),
          ra: Joi.string(),
          registration_id: Joi.number(),
          updated_at: Joi.string(),
          created_at: Joi.string(),
          id: Joi.number().required(),
          url: Joi.string().required(),
        })
      ),
    })
  );
  if (error) return res.status(400).json(error.details);

  return next();
};

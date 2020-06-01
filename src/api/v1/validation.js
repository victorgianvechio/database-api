import Joi from 'joi';

export default (req, res, next) => {
  const { many } = req.body;

  // Verifica se o parâmetro many foi passado e faz as validações para a função execMany
  if (many) {
    const { error } = Joi.validate(
      req.body,
      Joi.object().keys({
        query: Joi.string().required(),
        params: Joi.array().required(),
        many: Joi.boolean().required(),
        fromId: Joi.string(),
        from: Joi.object(),
        fileName: Joi.string(),
      })
    );
    if (error) return res.status(400).json(error);
  }
  // Faz as validações para a função exec
  else {
    const { error } = Joi.validate(
      req.body,
      Joi.object().keys({
        query: Joi.string().required(),
        params: Joi.array(),
        fromId: Joi.string(),
        from: Joi.object(),
        fileName: Joi.string(),
      })
    );
    if (error) return res.status(400).json(error.details);
  }

  return next();
};

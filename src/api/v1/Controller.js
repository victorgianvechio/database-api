import db from '../../database/OracleConnection';

class Controller {
  async index(req, res) {
    const { query, params, many } = req.body;

    let data = '';

    // Verifica se foi passado o parâmetro many
    if (many === true) data = await db.execMany(query, params);
    // Verifica se foi passado parâmetros para o query bind
    else if (params) data = await db.exec(query, params);
    // Executa query sem parâmetros
    else data = await db.exec(query);

    // Erro
    if (data.error) return res.status(400).json(data);
    // Sucesso
    return res.status(200).json(data);
  }
}

export default new Controller();

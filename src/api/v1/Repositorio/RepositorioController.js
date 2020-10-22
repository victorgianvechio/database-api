import db from '../../../database/OracleConnection';

class RepositorioController {
    async index(req, res) {

        const query = `SELECT * FROM DESENV_REPOSITORIO WHERE ATIVO = 1`;

        const data = await db.exec(query);

        if (data.error) return res.status(400).json(data);
        // Sucesso
        if (data) {
            return res.status(200).json(data);
        }
    }
}

export default new RepositorioController();
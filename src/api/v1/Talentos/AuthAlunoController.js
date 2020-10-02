import db from '../../../database/OracleConnection';

class AlunoController {
  async find(req, res) {
    const { nro_aluno, senha } = req.body;

    const query = `
        SELECT A.NRO_ALUNO,
          A.NOME_ALUNO,
          A.E_MAIL,
          A.E_MAIL_INSTITUICAO,
          A.SEXO,
          A.LOGRADOURO,
          A.NUMERO,
          A.BAIRRO,
          A.CIDADE,
          A.CEP,
          A.UF,
          A.ESTADO_CIVIL,
          A.FONE_CELULAR,
          A.FONE_ALUNO,
          A.NOMEPAI,
          A.NOMEMAE
        FROM   ALUNO A
          INNER JOIN MATRICULA M
                  ON M.NRO_ALUNO = A.NRO_ALUNO
                      AND M.ANO_SEM_MAT = (SELECT CA.ANO_SEM_MATRICULA
                                          FROM   CONFIG_ACADEMICO CA)
        WHERE  A.NRO_ALUNO = :NRO_ALUNO
          AND A.SENHA = :SENHA
    `;

    const data = await db.exec(query, [nro_aluno, senha]);

    if (data.error) return res.status(400).json(data);
    // Sucesso
    if (data[0]) {
      return res.status(200).json(data[0]);
    }
    // 204 No Content
    return res.status(200).json({
      message: 'Aluno não encontrado ou não matrículado no período vigente',
    });
  }
}

export default new AlunoController();

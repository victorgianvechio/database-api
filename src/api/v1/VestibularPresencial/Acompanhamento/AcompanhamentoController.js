import db from '../../../../database/OracleConnection';

class AcompanhamentoController {
  async find(req, res) {
    const { cpf } = req.params;

    const query = `
    SELECT VEST.ID_VESTIBULAR,
        VEST.DESCRICAO,
        VEST.TIPO_EAD,
        V.INSCRICAO,
        CV.DESCRICAO,
        CV.PERIODO,
        VC.CLASSIFICACAO,
        CASE VC.TIPO_CONVOCACAO
          WHEN 'Convocado' THEN 1
          ELSE 0
        END AS CONVOCADO,
        CASE
          WHEN M.ANO_SEM_MAT IS NOT NULL THEN 1
          ELSE 0
        END AS MATRICULADO
    FROM   PS_VESTIBULANDO V
        LEFT JOIN PS_VESTIBULANDO_CURSO VC
              ON V.ID_VESTIBULAR = VC.ID_VESTIBULAR
                  AND VC.INSCRICAO = V.INSCRICAO
        INNER JOIN PS_VESTIBULAR VEST
                ON VEST.ID_VESTIBULAR = V.ID_VESTIBULAR
        INNER JOIN PS_CURSO_VESTIBULAR CV
                ON CV.ID_CURSO_VEST = VC.ID_CURSO_VEST
                  AND CV.ID_VESTIBULAR = VEST.ID_VESTIBULAR
        LEFT JOIN INGRESSO I
              ON I.ID_VESTIBULAR = VEST.ID_VESTIBULAR
                  AND I.INSCRICAO = V.INSCRICAO
        LEFT JOIN MATRICULA M
              ON M.NRO_ALUNO = I.NRO_ALUNO
                  AND M.ANO_SEM_MAT = VEST.ANO_SEM_LETIVO
    WHERE  V.CPF = :CPF
        AND VEST.SITUACAO = 1
    `;

    const data = await db.exec(query, [cpf]);

    if (data.error) return res.status(400).json(data);
    // Sucesso
    if (data) return res.status(200).json(data);
    // 204 No Content
    return res.status(200).json({
      status: false,
      message: `Nenhum inscrição encontrada com o CPF ${cpf}.`,
    });
  }
}

export default new AcompanhamentoController();

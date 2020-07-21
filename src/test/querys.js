/* eslint-disable no-unused-vars */
import '../lib/dotenv';
import db from '../database/OracleConnection';

async function querySemProxId() {
  const query =
    'insert into tipo_disciplina values (:id, :descricao, :cobra_finan, :tipo_tcc, :cobra_reprova, :ativ_compl)';

  const param = [
    {
      id: 50,
      descricao: 'teste12',
      cobra_finan: 0,
      tipo_tcc: 0,
      cobra_reprova: 0,
      ativ_compl: 0,
    },
    {
      id: 51,
      descricao: 'teste22',
      cobra_finan: 0,
      tipo_tcc: 0,
      cobra_reprova: 0,
      ativ_compl: 0,
    },
    {
      id: 53,
      descricao: 'teste32',
      cobra_finan: 0,
      tipo_tcc: 0,
      cobra_reprova: 0,
      ativ_compl: 0,
    },
  ];

  const result = await db.execMany(query, param);
  console.log('result:', result);
}

async function queryUsandoProxId() {
  const query =
    'insert into tipo_disciplina values (:pk, :descricao, :cobra_finan, :tipo_tcc, :cobra_reprova, :ativ_compl)';

  const param = [
    {
      descricao: 'teste12',
      cobra_finan: 0,
      tipo_tcc: 0,
      cobra_reprova: 0,
      ativ_compl: 0,
    },
    {
      descricao: 'teste22',
      cobra_finan: 0,
      tipo_tcc: 0,
      cobra_reprova: 0,
      ativ_compl: 0,
    },
    {
      descricao: 'teste32',
      cobra_finan: 0,
      tipo_tcc: 0,
      cobra_reprova: 0,
      ativ_compl: 0,
    },
  ];

  const result = await db.execMany(query, param);
  console.log('result:', result);
}

function oldProxID() {
  // async proxId(ptabela) {
  //   const query = 'BEGIN SP_PROX_ID(:ptabela, :pretorno); END;';
  //   const params = {
  //     ptabela,
  //     pretorno: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  //   };
  //   const result = await this.exec(query, params);
  //   return result.pretorno;
  // }
}

function testArray() {
  const array1 = ['ok', 'ok2', 1, 2];
  const array2 = [
    {
      ok: 'ok',
    },
    {
      ok: 'ok',
    },
  ];
  const array3 = [];

  console.log(typeof array1);
  console.log(typeof array2);
  console.log(typeof array3);
  console.log(Array.isArray(array1));
  console.log(Array.isArray(array2));
  console.log(Array.isArray(array3));
}

function testString() {
  const query = 'SELECT * FROM ALUNO WHERE 1=1';
  const result = query
    .substring('INSERT INTO'.length, query.indexOf('VALUES'))
    .trim();

  console.log(result);
}

async function deleteAlunoFalta() {
  const query = `DELETE FROM  fn_aluno_falta
  WHERE  fn_aluno_falta.id_aluno_falta IN (
      SELECT FA.id_aluno_falta
          FROM   classe C
          inner join horario_aula HA
                  ON HA.nro_seq_grade =
                  C.nro_seq_grade
                  AND HA.ano_sem_mat =
                      C.ano_sem_mat
          inner join fn_aluno_falta FA
                  ON fa.id_classe =
                  C.id_classe
          INNER JOIN GRADE_CURRIC GC
                  ON GC.NRO_SEQ_GRADE = C.NRO_SEQ_GRADE
                  AND GC.COD_CURSO = C.COD_CURSO_TURMA
          INNER JOIN DISCIPLINA D
                  ON D.COD_DISCIPLINA = GC.COD_DISCIPLINA
          WHERE C.nro_seq_grade IN (
              SELECT nro_seq_grade
              FROM   atribuicao_aula AA
              WHERE  AA.cod_funcionario = :COD_FUNCIONARIO
                      AND AA.ano_sem_mat = C.ano_sem_mat)
      AND C.ano_sem_mat = :ANO_SEM_MAT
      AND HA.dia_semana = CAST(:DIA_SEMANA AS CHAR(1))
      AND CAST(:HORARIO AS VARCHAR(4)) BETWEEN HA.hora_inicio AND HA.hora_final
      AND dta_falta = TO_DATE(:DTA_FALTA, 'DD/MM/YYYY'))`;

  const params = ['014249', '20201', '3', '1139', '19/05/2020'];

  const result = await db.exec(query, params);
  console.log(result);
}

async function insertAlunoFalta() {
  const query = `INSERT INTO FN_ALUNO_FALTA VALUES (:pk, :idClasse, TO_DATE(:dtaFalta, 'DD/MM/YYYY'), :nroAula, :idTipoFalta)`;
  const params = [
    { idClasse: 1005567, dtaFalta: '19/05/2020', nroAula: 1, idTipoFalta: 8 },
    { idClasse: 1005567, dtaFalta: '19/05/2020', nroAula: 2, idTipoFalta: 8 },
  ];
  const many = true;
  const result = await db.execMany(query, params, many);
  console.log(result);
}

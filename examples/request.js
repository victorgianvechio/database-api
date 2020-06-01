/* eslint-disable no-unused-vars */

/**

 * API_BASE_URL http://localhost:8080/sistemas/apidocente/api/v1/crud [POST]

 * Body da requisição da API

 */

let body;

// Query com parâmetros

body = {
  query: "SELECT A.NOME_ALUNO FROM ALUNO WHERE NRO_ALUNO = '527701'",
};

// Query sem parâmetros

body = {
  query:
    'SELECT * FROM MATRICULA M WHERE M.NRO_ALUNO = :NRO_ALUNO AND M.ANO_SEM_MAT= :ANO_SEM_MAT',
  params: ['015040', '20201'],
};

// Query para inserir múltiplos registros
// a chave primaria deve ser sempre passada na query como :pk, que sera inserida no objeto usando a procedura PROX_ID;
// o campo many deve ser true
body = {
  query:
    'INSERT INTO TIPO_DISCIPLINAS VALUES (:pk, :descricao, :cobra_finan, :tipo_tcc, :cobra_reprova, :ativ_compl)',
  params: [
    {
      descricao: 'teste1',
      cobra_finan: 0,
      tipo_tcc: 0,
      cobra_reprova: 0,
      ativ_compl: 0,
    },
    {
      descricao: 'teste2',
      cobra_finan: 0,
      tipo_tcc: 0,
      cobra_reprova: 0,
      ativ_compl: 0,
    },
    {
      descricao: 'teste3',
      cobra_finan: 0,
      tipo_tcc: 0,
      cobra_reprova: 0,
      ativ_compl: 0,
    },
  ],
  many: true,
};

import Cron from 'node-cron';

import db from '../src/database/OracleConnection';

Cron.schedule("* * * * *", async () => {
  // const query = `SELECT NOME, E_MAIL, CPF, STATUS, DTA_BAIXA, INSCRICAO, resultCurso.DESCRICAO, vestibular.DESCRICAO, vestibular.PROVA_ONLINE_LINK
  //                FROM PS_VESTIBULANDO
  //                WHERE ID_VESTIBULAR = 173
  //                AND ROWNUM <= 1`;

  const data = await db.exec(query);

  console.log(data)
});

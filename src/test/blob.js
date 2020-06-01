import fs from 'fs';
import chalk from 'chalk';

import '../src/lib/dotenv';
import db from '../src/database/OracleConnection';

(async () => {
  const alunos = await db.exec(
    // `
    // select distinct nro_aluno, foto from aluno_foto
    // where nro_aluno in (
    // select distinct m.nro_aluno from matricula m
    // inner join curso c on c.cod_curso = m.cod_curso
    // where m.ano_sem_mat = 20201
    // and m.sit_aluno = 'N'
    // and m.matric_confirmada = 'S'
    // and c.cod_tipo_curso = 0
    // and c.ead = 0
    // )
    // `
    `
    select nro_aluno, foto from aluno_foto
    where nro_aluno in (
    527701
    )
    `
  );

  if (alunos.error) {
    console.log(chalk.hex('#f00').bold(`\n${alunos.message}\n`));
  } else {
    alunos.forEach(aluno => {
      fs.writeFile(
        `photos/${aluno.NRO_ALUNO}.png`,
        aluno.FOTO,
        'binary',
        err => {
          if (err) {
            console.log(chalk.hex('#f00').bold(`\n${err}\n`));
          } else {
            console.log(
              chalk
                .hex('#2ed573')
                .bold(`\n${aluno.NRO_ALUNO} file was saved!\n`)
            );
          }
        }
      );
    });
  }
})();

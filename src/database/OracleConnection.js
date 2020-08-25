/**
 * @file Cria conexão com banco de dados Oracle e executa querys.
 * @author Victor
 */

import oracledb from 'oracledb';
import { readFileSync } from 'fs';
import config from '../config/oracle';

class Connection {
  constructor() {
    // Resultados na forma de JSON
    oracledb.outFormat = oracledb.OBJECT;
    // Commit automático
    oracledb.autoCommit = true;
    // Força todas as queries CLOBs serem retornadas como String
    oracledb.fetchAsString = [oracledb.CLOB];
    // Força todas as queries BLOBs serem retornadas como Buffer
    oracledb.fetchAsBuffer = [oracledb.BLOB];
    // Limite de linhas do retorno de um SELECT | 0 = sem limites
    oracledb.maxRows = 0;
  }

  /**
   * Executa query no banco de dados.
   * @async
   * @param {String} query query SQL.
   * @param {Array<String>} [params] parâmetros (opcional).
   * @returns {Array<Object>|Number|String} array de objetos de um SELECT,
   * o número delinhas de um INSERT/UPDATE/DELETE ou o resultado de uma PROCEDURE.
   */
  async exec(query, params) {
    let conn = '';

    try {
      query = query.toUpperCase();

      // Verifica se a query não é uma DML
      if (
        query.indexOf('DROP TABLE') !== -1 ||
        query.indexOf('ALTER TABLE') !== -1 ||
        query.indexOf('CREATE TABLE') !== -1
      ) {
        throw {
          message: 'query must be an insert, update or delete statement',
        };
      }

      // Verifica se a query é um delete sem where
      if (query.indexOf('DELETE') !== -1 && query.indexOf('WHERE') === -1) {
        throw {
          message: '"delete" is not allowed without "where" statement',
        };
      }

      // Verifica se a query é um insert
      if (query.indexOf('INSERT INTO') !== -1) {
        // Busca nome da tabela na query
        const tableName = query
          .substring('INSERT INTO'.length, query.indexOf('VALUES'))
          .trim();

        // Verifica se foi passado o parâmetro :PK
        const hasPk = query.indexOf(':PK') !== -1;

        // Se existir o parâmetro :PK chama o proxID e insere no objeto params
        if (hasPk) {
          params.unshift(await this.proxId(tableName));
        }
      }

      conn = await oracledb.getConnection(config);

      const result =
        typeof params !== 'undefined'
          ? await conn.execute(query, params)
          : await conn.execute(query);

      // Resultado de um SELECT
      if (result.rows) return result.rows;
      // Resultado de um INSERT/UPDATE/DELETE
      if (result.rowsAffected) return result.rowsAffected;
      // Resultado de uma PROCEDURE
      if (result.outBinds) return result.outBinds;

      return result;
    } catch (err) {
      const error = {
        error: true,
        message: err.message || 'invalid query',
        errorNum: err.errorNum,
        offset: err.offset,
        query,
        params: params || 'no params',
      };
      console.error(error);
      return error;
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  /**
   * Executa varios inserts no banco de dados.
   * Se houver o parâmetro :PK, a função proxID é chamada para gerar o ID
   * com base na tabela SEQUENCIA.
   * @async
   * @param {String} query query SQL.
   * @param {Array<Object>} params parâmetros.
   * @returns {Number} número de linhas inseridas.
   */
  async execMany(query, params) {
    let conn = '';
    try {
      query = query.toUpperCase();

      // Verifica se a query é um insert
      if (query.indexOf('INSERT INTO') === -1)
        throw {
          message:
            '"many" parameter allowed only for insert statement | "execMany" function only allowed for insert statement',
        };

      // Busca nome da tabela na query
      const tableName = query
        .substring('INSERT INTO'.length, query.indexOf('VALUES'))
        .trim();

      // Verifica se foi passado o parâmetro :PK
      const hasPk = query.indexOf(':PK') !== -1;

      // Se existir o parâmetro :PK chama o proxID e insere no objeto params
      if (hasPk) {
        params = await Promise.all(
          params.map(async item => {
            return { ...item, pk: await this.proxId(tableName) };
          })
        );
      }

      conn = await oracledb.getConnection(config);
      const result = await conn.executeMany(query, params);

      if (result.rowsAffected) return result.rowsAffected;

      return result;
    } catch (err) {
      const error = {
        error: true,
        message: err.message || 'invalid query',
        errorNum: err.errorNum,
        offset: err.offset,
        query,
        params: params || 'no params',
      };
      console.error(error);
      return error;
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  /**
   * Executa a procedure que busca o último ID da tabela passada no parâmetro.
   * @async
   * @param {String} ptabela nome da tabela para buscar o próximo ID.
   * @returns {Number} último ID da tabela passada.
   */
  async proxId(ptabela) {
    let conn = '';
    try {
      const query = 'BEGIN SP_PROX_ID(:ptabela, :pretorno); END;';
      const params = {
        ptabela,
        pretorno: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      };

      conn = await oracledb.getConnection(config);
      const result = await conn.execute(query, params);

      return result.outBinds.pretorno;
    } catch (err) {
      const error = {
        error: true,
        message: 'invalid procedure',
        errorNum: err.errorNum,
        offset: err.offset,
      };
      console.error(error);
      return error;
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }

  /**
   * Carregar um arquivo .sql e retorna como string.
   * @async
   * @param {String} path caminho do arquivo .sql para ser carregado.
   * @returns {String} conteúdo do .sql como string.
   */
  async readSQL(path) {
    const query = await readFileSync(path).toString();
    return query;
  }

  /**
   * Testa conexão com o Oracle.
   * @async
   * @returns {Object} status e error (se houver).
   */
  async testConnection() {
    let conn = '';
    try {
      conn = await oracledb.getConnection(config);
      return { status: true };
    } catch (err) {
      return {
        status: false,
        err,
      };
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}

export default new Connection();

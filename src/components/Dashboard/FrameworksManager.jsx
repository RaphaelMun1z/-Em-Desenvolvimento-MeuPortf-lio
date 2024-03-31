import styles from './FrameworksManager.module.scss'

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline, MdAddCircleOutline } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";

import { Link } from 'react-router-dom';

const FrameworksManager = () => {
  const linhas = Array.from({ length: 10 }, (_, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>Exemplo {index + 1}</td>
      <td>Exemplo</td>
      <td>Exemplo</td>
      <td>Exemplo</td>
      <td>Exemplo</td>
      <td><th className={`${styles.actionTh} ${styles.edit}`}><FaRegEdit /></th></td>
      <td><th className={`${styles.actionTh} ${styles.delete}`}><MdDeleteOutline /></th></td>
    </tr>
  ));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Frameworks</h1>
        <Link to="/adm/cadastrar/framework" className={styles.newFramework}>Cadastrar<MdAddCircleOutline /></Link>
      </div>
      <div className={styles.searchContainer}>
        <input type="text" placeholder='Busque pelo framework...' />
        <button type="submit">
          <RiSearch2Line />
        </button>
        <label>
          <p>Filtrar por: </p>
          <select name="searchBy">
            <option value="name">Nome</option>
            <option value="language">Linguagem</option>
            <option value="id">Id</option>
            <option value="createdat">Data de criação</option>
          </select>
        </label>
      </div>
      <div className={styles.list}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Linguagem</th>
              <th>Nível</th>
              <th>Criado em</th>
              <th>Atualizado em</th>
              <th className={styles.headActionTh}>Editar</th>
              <th className={styles.headActionTh}>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {linhas}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FrameworksManager
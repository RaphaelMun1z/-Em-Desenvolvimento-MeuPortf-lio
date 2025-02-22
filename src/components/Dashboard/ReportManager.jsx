import styles from './DashboardItems.module.scss'

// Hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { getReports, deleteReport, resetMessage } from '../../slices/reportSlice';

// Icons
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";

import { Link } from 'react-router-dom'

import PopUp from './PopUp';
import SystemStatusMessage from '../Form/SystemStatusMessage'

const ReportManager = () => {
    const [popUp, setPopUp] = useState(false)
    const [reportToDelete, setReportToDelete] = useState({})

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        const seconds = dateTime.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const dispatch = useDispatch()

    const { reports, loading: reportFormLoading, message, error } = useSelector((state) => state.report)

    useEffect(() => {
        dispatch(getReports())
    }, [])

    const handleConfirmDeleteReport = (reportName, reportId) => {
        reportToDelete.name = reportName
        reportToDelete.id = reportId

        setPopUp(true)
    }

    const handleCancelDeleteReport = () => {
        setReportToDelete({})
        setPopUp(false)
    }

    const handleDeleteReport = (reportId) => {
        dispatch(deleteReport(reportId))
        handleCancelDeleteReport()

        resetComponentMessage()
    }

    const resetComponentMessage = () => {
        setTimeout(() => {
            dispatch(resetMessage())
        }, 2000)
    }

    return (
        <div className={styles.container}>
            {popUp && (
                <PopUp name={reportToDelete.name} id={reportToDelete.id} cancelDelete={handleCancelDeleteReport} deleteFunction={handleDeleteReport} />
            )}
            <div className={styles.header}>
                <h1>Formulários de report</h1>
            </div>
            <div className={styles.searchContainer}>
                <input type="text" placeholder='Busque pelo formulário de orçamento...' />
                <button type="submit">
                    <RiSearch2Line />
                </button>
                <label>
                    <p>Filtrar por: </p>
                    <select name="searchBy">
                        <option value="title">Título</option>
                        <option value="subject">Assunto</option>
                        <option value="name">Nome</option>
                        <option value="status">Status</option>
                        <option value="id">Id</option>
                        <option value="createdat">Data de criação</option>
                    </select>
                </label>
            </div>
            <div className={styles.actionResults}>
                {message && (
                    <SystemStatusMessage type="success" msg={message} />
                )}
                {error && (
                    <SystemStatusMessage type="error" msg={error} />
                )}
            </div>
            <div className={styles.list}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Assunto</th>
                            <th>Mensagem</th>
                            <th>Criado em</th>
                            <th className={styles.headActionTh}>Visualizar</th>
                            <th className={styles.headActionTh}>Deletar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!reportFormLoading && reports && reports.length === 0 && (
                            <p className={styles.noData}>Não há formulários cadastrados.</p>
                        )}
                        {!reportFormLoading && reports && reports.length > 0 && reports.map((form) => (
                            <tr key={form.id}>
                                <td>{form.id}</td>
                                <td>{form.subject}</td>
                                <td>{form.message}</td>
                                <td>{formatDate(form.createdAt)}<br />{formatTime(form.createdAt)}</td>
                                <td><p className={`${styles.actionTh} ${styles.view}`}><Link to={``}><FaRegEye /></Link></p></td>
                                <td><p className={`${styles.actionTh} ${styles.delete}`}><MdDeleteOutline onClick={() => handleConfirmDeleteReport(`ID ${form.id}`, form.id)} /></p></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ReportManager
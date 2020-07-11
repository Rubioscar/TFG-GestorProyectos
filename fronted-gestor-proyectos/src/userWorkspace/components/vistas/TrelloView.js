import React, { useState, useEffect } from "react";
import Board from 'react-trello';
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { getIssues }  from '../../actions/issue';
import MyCard from "../tablero/MyCard";
import { selectBoard } from "../../utils/workFLows/board";
import { issue } from "../../api";

const TrelloView = () => {
    const dispatch = useDispatch();
    const issues = useSelector(state => state.issue.issues.issues);
    const status = useSelector(state => state.issue.status.status);
    const project = useSelector(state => state.project.projects)
    const user = useSelector(state => state.userData.user)
    const [fun, setFun] = useState(false);
    const [mejora, setMejora] = useState(false);
    const [problem, setProblem] = useState(false);
    const [task, setTask] = useState(false);
    const [me, setMe] = useState(false);
    const [dataBoard, setDataBoard] = useState(null);

    const components = {
        Card: MyCard
    }

    useEffect(() => {
        let filter = "?";
        if(fun) 
            filter = filter.concat("issue_type.name=Funcionalidad&")
        if(mejora)
            filter = filter.concat("issue_type.name=Mejora&")
        if(problem)
            filter = filter.concat("issue_type.name=Problema&")
        if(task)
            filter = filter.concat("issue_type.name=Tarea&")
        if(me)
            filter = filter.concat(`asignado.id=${user.user.id}&`);
        if(project.id) {
            filter = filter.concat(`project.id=${project.id}`);
            dispatch(getIssues(filter))
        }    
    } ,[project, user, fun, mejora, problem, task, me, dispatch]);

    useEffect(() => {
        if(issues.length > 0) {
            const dataBoard = selectBoard (project.work_flow.name, issues);
            setDataBoard(dataBoard);
        }
    }, [issues])

    const cardMove = async (cardId, sourceLaneId, targetLaneId, position, cardDetails) => {
        const statusData = status.find(e => e.name === targetLaneId );
        const res = await issue.actualizar(cardId, {issue_status: statusData.id});
        console.log(res);
    };

    return (
        <div className="main-header">
            <div className="header">
                <span className="negritaSin">{project.name}</span>
                <br />
                <span>Lista de issues</span>
            </div>
            <div className="filter">
                <i className="fas fa-search"></i>
                &nbsp;
                <span className="negritaSin">Filtros rápidos:</span>
                &nbsp;
                <Button  variant={fun ? "info" : "outline-info"} onClick={
                    () => setFun(!fun)
                }>Funcionalidad</Button>{' '}
                <Button variant={mejora ? "info" : "outline-info"} onClick={
                    () => setMejora(!mejora)
                }>Mejora</Button>{' '}
                <Button variant={problem ? "info" : "outline-info"} onClick={
                    () => setProblem(!problem)
                }>Problema</Button>{' '}
                <Button variant={task ? "info" : "outline-info"} onClick={
                    () => setTask(!task)
                }>Tarea</Button>{' '}
                <Button variant={me ? "info" : "outline-info"} onClick={
                    () => setMe(!me)
                }>Mis issues</Button>{' '}
            </div>
            {issues.length > 0 && dataBoard && (
                <Board 
                    style={{backgroundColor: '#f1fdff'}}
                    data={dataBoard} 
                    components={components}
                    hideCardDeleteIcon={true}
                    handleDragEnd={cardMove}
                />
            )}
        </div>
    )
}

export default TrelloView;
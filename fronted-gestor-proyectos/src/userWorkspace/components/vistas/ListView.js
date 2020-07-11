import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { getIssues }  from '../../actions/issue';

const ListView = () => {
    const dispatch = useDispatch();
    const issues = useSelector(state => state.issue.issues.issues);
    const project = useSelector(state => state.project.projects)
    const user = useSelector(state => state.userData.user)
    const [fun, setFun] = useState(false);
    const [mejora, setMejora] = useState(false);
    const [problem, setProblem] = useState(false);
    const [task, setTask] = useState(false);
    const [me, setMe] = useState(false);

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
    } ,[project, user, fun, mejora, problem, task, me, dispatch])

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
            <div className="list">
                {issues && issues.map((issue, index) => (
                    <div key={index} className="issue">
                    <div className="row">
                        <i className="fas fa-arrow-up flecha"></i>
                        <a href="" className="elemento">{issue.title}</a>
                        <span className="elemento">{issue.descripcionCorta}</span>
                    </div>
                    <div className="row end">
                        <span>{issue.issue_status.name}</span>
                    </div>
                    <div className="info row">
                        <span className="elemento negritaSin">Estimacion:</span>
                        <span className="elemento">{issue.estimacion}</span>
                    </div>
                    <div className="separacion">
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default ListView;
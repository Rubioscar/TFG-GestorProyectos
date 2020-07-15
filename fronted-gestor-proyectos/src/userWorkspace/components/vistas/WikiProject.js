import React from "react";
import { useSelector } from "react-redux";
import CKEditor from 'ckeditor4-react';
import apiPath from "../../../common/constants";

const ListView = () => {
    const project = useSelector(state => state.project.projects)

    return (
        <div>
        {Object.keys(project).length !== 0 && (
        <div className="main-header">
            <div className="header">
                <span className="negritaSin">{project.name}</span>
                <br />
                <CKEditor
                    data={project.descripcion}
                    readOnly
                    type="inline"
                />
            </div>
            <div className="filter">
                <i className="fas fa-search"></i>
                &nbsp;
                <span className="negritaSin">Filtros:</span>
                &nbsp;
            </div>
            <div className="list">
                {project.wiki.map((file, index) => (
                <div key={index} className="fichero">
                    <i className="fas fa-file-alt fa-3x imagen"></i>
                    <span className="linea">Nombre: {file.name}</span>
                    <span className="linea">Extension: {file.ext}</span>
                    <span className="linea">Tamaño: {file.size}Kb</span>
                    <a className="linea" href={`${apiPath}${file.url}`} target="_blank">
                        <i className="fas fa-eye"></i>
                    </a>
                </div>
                ))}
            </div>
        </div>
        )}
        </div>
    )
}

export default ListView;
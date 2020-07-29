import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import CKEditor from 'ckeditor4-react';
import apiPath from "../../../../common/constants";

const AdminUserView = () => {
    const project = useSelector(state => state.project.projects)
    const [ficheros, setFicheros] = useState([])
    const [tipo, setTipo] = useState("Todos")
    const [name, setName] = useState("")


    useEffect(() => {
        if(Object.keys(project).length !== 0){
            let wikis = project.wiki
            if(tipo !== "Todos") {
                wikis = wikis.filter(e => {
                    if(e.ext === tipo)
                        return e;
                })
            }
            if(name !== "") {
                wikis = wikis.filter(e => {
                    if(e.name.includes(name))
                        return e;
                })
            }
            setFicheros(wikis);
        }
    }, [project,name,tipo])

    const selectTipo = [
        {id:".pdf", description: "PDF"},
        {id:".docx", description: "DOCX"},
        {id:".jpg", description: "JPG"},
        {id:".png", description: "PNG"},
        {id:"Todos", description: "Todos"}
    ]

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
            <div className="list">
                {ficheros.map((file, index) => (
                <div key={index} className="fichero">
                    <i className="fas fa-file-alt fa-3x imagen"></i>
                    <span className="linea">Nombre: {file.name}</span>
                    <span className="linea">Extension: {file.ext}</span>
                    <span className="linea">Tamaño: {file.size}Kb</span>
                    <a className="linea" href={`${apiPath}${file.url}`} target="_blank" rel="noopener noreferrer">
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

export default AdminUserView;
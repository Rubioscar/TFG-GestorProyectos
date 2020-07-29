import React, {useState, useMemo} from "react";
import { useSelector } from "react-redux";
import SimpleInput from "../../../common/components/inputs/simpleInput"
import SelectInput from "../../../common/components/inputs/selectInput";
import {statusDisponibles} from "../../utils/workFLows/newIssue";
import CKEditor from 'ckeditor4-react';
import { files, issue } from "../../api";
import Button from "react-bootstrap/Button";
import Alert from 'react-bootstrap/Alert';
import history from "../../../common/helper/history";
import "../../assets/scss/index.scss";
import apiPath from "../../../common/constants";

const NewIssue = ({match}) => {
  const status = useSelector(state => state.issue.status.status);
  const types = useSelector(state => state.issue.types.types);
  const project = useSelector(state => state.project.projects)
  const userData = useSelector(state => state.userData.user.user)
  const [title, setTitle] = useState("");
  const [esti, setEsti] = useState("");
  const [type, setType] = useState("");
  const [statu, setStatu] = useState("");
  const [user, setUser] = useState("");
  const [corta, setCorta] = useState("");
  const [descripcion, setDes] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [tag, setTag] = useState("");
  const [progres, setProgress] = useState(null);
  const [file, setFile ] = useState([]);
  const [error, setError ] = useState(false);

  const onEditorChange = ( evt ) => {
    setDes(evt.editor.getData());
}

const handleAttachFIle =  async e => {
    e.persist()
    // could do some validation for the attached file here
    const fichero = await files.save(e.target.files, setProgress);
    setFile([...file, fichero[0]]);
    e.target.value = '' // to clear the current file
  }

 const saveIssue = async () => {
     const data = {
        title: title,
        descripcion: descripcion,
        creador: userData.id,
        project: project.id,
        asignado: user,
        issue_type: type,
        issue_status: status.find(e => e.name === statu).id,
        tag: tag,
        estimacion: esti,
        prioridad: prioridad,
        descripcionCorta: corta,
        archivos: file.map(e => e.id)
     }

     const res = await issue.nuevo(data);
     if(res) {
        history.push('/home/trelloView')
     } else {
        setError(true);
     }
 } 

  const selectType = useMemo(() => {
      if(types.length === 0)
        return [];
      return types.map(e => {
          return {
              id: e.id,
              description: e.name
          }
      })
  }, [types]);

  const selectUser = useMemo(() => {
    if(Object.keys(project).length === 0)
      return [];
    return project.users.map(e => {
        return {
            id: e.id,
            description: e.username
        }
    })
  }, [project]);

  const selectTags = useMemo(() => {
    if(Object.keys(project).length === 0)
      return [];
    return project.tags.map(e => {
        return {
            id: e,
            description: e
        }
    })
  }, [project]);

  const selectPrioridad = [
      {id:"Alta", description: "Alta"},
      {id:"Media", description: "Media"},
      {id:"Baja", description: "Baja"}
  ]

  return (
    <div>
        {Object.keys(project).length !== 0  && (
            <div className="main-form">
                <div className="header">
                    <h2>Crear una nueva issue para {project.name}</h2>
                </div>
                {error && (
                    <Alert variant='danger'>Error al crear issue</Alert>)
                }
                <span className="title">Detalles</span>
                <div className="form">
                  <div className="row">
                    <SimpleInput
                        value={title}
                        onChange={setTitle}
                        classInputName="in"
                        label="Titulo:"
                    />
                    <SimpleInput
                    value={esti}
                    onChange={setEsti}
                    classInputName="in"
                    type="number"
                    label="Estimacion (Puntos): "
                    />
                  </div> 
                  <div className="row">
                    <SelectInput
                        id="issueStatus"
                        value={statu}
                        label="Seleciona status:"
                        data={statusDisponibles(project.work_flow.name)}
                        className="in"
                        onChange={setStatu}
                    />
                    <SelectInput
                        id="issue"
                        value={type}
                        label="Seleciona tipo:"
                        data={selectType}
                        className="in"
                        onChange={setType}
                    />
                  </div>
                  <div className="row">
                    <SelectInput
                        id="issueStatus"
                        value={user}
                        label="Asigna usuario"
                        data={selectUser}
                        className="in"
                        onChange={setUser}
                    />
                    <SelectInput
                        id="issue"
                        value={tag}
                        label="Seleciona Tag"
                        data={selectTags}
                        className="in"
                        onChange={setTag}
                    />
                  </div>
                  <div className="row">
                    <SelectInput
                        id="issueStatus"
                        value={prioridad}
                        label="Seleccione prioridad"
                        data={selectPrioridad}
                        className="in"
                        onChange={setPrioridad}
                    />
                  </div> 
                </div>
                <span className="title">Descripcion</span>
                <div className="form">
                    <SimpleInput
                        value={corta}
                        onChange={setCorta}
                        classInputName="text"
                        type="text"
                        label="Descripcion corta: "
                    />
                    <CKEditor
                        data={descripcion}
                        onChange={onEditorChange}
                        type="classic"
                    />
                </div>
                <span className="title">Archivos</span>
                <div className="form">
                    {file.length>0 && (
                        file.map(e => (
                            <div>
                                <span>
                                <i className="fas fa-file"></i> {e.name}
                                </span>
                                &nbsp;
                                <a href={`${apiPath}${e.url}`} target="_blank" rel="noopener noreferrer">Visualizar</a>
                            </div>
                        ))
                    )}
                    <input type="file" onChange={handleAttachFIle} />
                </div>
                <div className="boton">
                    <Button variant="info" onClick={() => saveIssue()}>Crear</Button>
                </div>
            </div>
        )}
    </div>
  );
};

export default NewIssue;

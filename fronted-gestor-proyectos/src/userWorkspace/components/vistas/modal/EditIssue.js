import React, {useState, useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleInput from "../../../../common/components/inputs/simpleInput"
import SelectInput from "../../../../common/components/inputs/selectInput";
import {statusDisponibles} from "../../../utils/workFLows/newIssue";
import CKEditor from 'ckeditor4-react';
import { files, issue } from "../../../api";
import Button from "react-bootstrap/Button";
import "../../../assets/scss/index.scss";
import apiPath from "../../../../common/constants";
import { getIssue }  from '../../../actions/issue';

const EditIssue = ({match, data, onClose}) => {
  const dispatch = useDispatch();
  const status = useSelector(state => state.issue.status.status);
  const types = useSelector(state => state.issue.types.types);
  const project = useSelector(state => state.project.projects)
  const userData = useSelector(state => state.userData.user.user)
  const [progres, setProgress] = useState(null);
  const [issueData, setIssueData ] = useState(null);


  useEffect(() => {
    const datos = {
        title: data.title,
        descripcion: data.descripcion,
        asignado: data.asignado.id,
        issue_type: data.issue_type.id,
        issue_status: data.issue_status.name,
        tag: data.tag,
        estimacion: data.estimacion,
        prioridad: data.prioridad,
        descripcionCorta: data.descripcionCorta,
        archivos: data.archivos
    }
    setIssueData(datos);
  }, []);

const onEditorChange = ( evt ) => {
    setIssueData({
        ...issueData,
        descripcion: evt.editor.getData()
    });
}

const handleAttachFIle =  async e => {
    e.persist()
    // could do some validation for the attached file here
    const fichero = await files.save(e.target.files, setProgress);
    setIssueData({
        ...issueData,
        archivos: [...issueData.archivos, fichero[0]]
    });
    e.target.value = '' // to clear the current file
  }

 const updateIssue = async () => {
     const objeto = {
        ...issueData,
        issue_status: status.find(e => e.name === issueData.issue_status).id,
        archivos: issueData.archivos.map(e => e.id)
     }

     console.log(objeto);
     const res = await issue.actualizar(data.id,objeto);
     if(res) {
        onClose();
        dispatch(getIssue(data.id));
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
        {issueData  && (
            <div className="main-form">
                <div className="header">
                    <h2>Crear una nueva issue para {project.name}</h2>
                </div>
                <span className="title">Detalles</span>
                <div className="form">
                  <div className="row">
                    <SimpleInput
                        value={issueData.title}
                        onChange={(valor) => setIssueData({
                            ...issueData,
                            title: valor
                        })}
                        classInputName="in"
                        label="Titulo:"
                    />
                    <SimpleInput
                    value={issueData.estimacion}
                    onChange={(valor) => setIssueData({
                        ...issueData,
                        estimacion: valor
                    })}
                    classInputName="in"
                    type="number"
                    label="Estimacion (Puntos): "
                    />
                  </div> 
                  <div className="row">
                    <SelectInput
                        id="issueStatus"
                        value={issueData.issue_status}
                        label="Seleciona status:"
                        data={statusDisponibles(project.issue_status)}
                        className="in"
                        onChange={(valor) => setIssueData({
                            ...issueData,
                            issue_status: valor
                        })}
                    />
                    <SelectInput
                        id="issue"
                        value={issueData.issue_type}
                        label="Seleciona tipo:"
                        data={selectType}
                        className="in"
                        onChange={(valor) => setIssueData({
                            ...issueData,
                            issue_type: valor
                        })}
                    />
                  </div>
                  <div className="row">
                    <SelectInput
                        id="issueStatus"
                        value={issueData.asignado}
                        label="Asigna usuario"
                        data={selectUser}
                        className="in"
                        onChange={(valor) => setIssueData({
                            ...issueData,
                            asignado: valor
                        })}
                    />
                    <SelectInput
                        id="issue"
                        value={issueData.tag}
                        label="Seleciona Tag"
                        data={selectTags}
                        className="in"
                        onChange={(valor) => setIssueData({
                            ...issueData,
                            tag: valor
                        })}
                    />
                  </div>
                  <div className="row">
                    <SelectInput
                        id="issueStatus"
                        value={issueData.prioridad}
                        label="Seleccione prioridad"
                        data={selectPrioridad}
                        className="in"
                        onChange={(valor) => setIssueData({
                            ...issueData,
                            prioridad: valor
                        })}
                    />
                  </div> 
                </div>
                <span className="title">Descripcion</span>
                <div className="form">
                    <SimpleInput
                        value={issueData.descripcionCorta}
                        onChange={(valor) => setIssueData({
                            ...issueData,
                            descripcionCorta: valor
                        })}
                        classInputName="text"
                        type="text"
                        label="Descripcion corta: "
                    />
                    <CKEditor
                        data={issueData.descripcion}
                        onChange={onEditorChange}
                        type="classic"
                    />
                </div>
                <span className="title">Archivos</span>
                <div className="form">
                    {issueData.archivos.length>0 && (
                        issueData.archivos.map(e => (
                            <div>
                                <span>
                                <i className="fas fa-file"></i> {e.name}
                                </span>
                                &nbsp;
                                <a href={`${apiPath}${e.url}`} target="_blank">Visualizar</a>
                            </div>
                        ))
                    )}
                    <input type="file" onChange={handleAttachFIle} />
                </div>
                <div className="boton">
                    <Button variant="info" onClick={() => updateIssue()}>Actualizar</Button>
                </div>
            </div>
        )}
    </div>
  );
};

export default EditIssue;

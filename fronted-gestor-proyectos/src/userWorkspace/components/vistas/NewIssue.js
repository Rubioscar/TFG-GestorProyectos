import React, {useState, useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleInput from "../../../common/components/inputs/simpleInput"
import SelectInput from "../../../common/components/inputs/selectInput";
import {statusDisponibles} from "../../utils/workFLows/newIssue";
import CKEditor from 'ckeditor4-react';
import history from "../../../common/helper/history";
import "../../assets/scss/index.scss";

const NewIssue = ({match}) => {
  const dispatch = useDispatch();
  const issues = useSelector(state => state.issue.issues.issues);
  const status = useSelector(state => state.issue.status.status);
  const types = useSelector(state => state.issue.types.types);
  const project = useSelector(state => state.project.projects)
  const userData = useSelector(state => state.userData.user)
  const [title, setTitle] = useState("");
  const [esti, setEsti] = useState("");
  const [type, setType] = useState("");
  const [statu, setStatu] = useState("");
  const [user, setUser] = useState("");
  const [corta, setCorta] = useState("");
  const [descripcion, setDes] = useState("");

  useEffect(() => {

  }, []);

  const onEditorChange = ( evt ) => {
    setDes(evt.editor.getData());
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
                        data={statusDisponibles(project.issue_status)}
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
                        value={statu}
                        label="Seleciona Tag"
                        data={selectTags}
                        className="in"
                        onChange={setType}
                    />
                  </div>
                  <div className="row">
                    <SelectInput
                        id="issueStatus"
                        value={user}
                        label="Seleccione prioridad"
                        data={selectPrioridad}
                        className="in"
                        onChange={setUser}
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
            </div>
        )}
    </div>
  );
};

export default NewIssue;

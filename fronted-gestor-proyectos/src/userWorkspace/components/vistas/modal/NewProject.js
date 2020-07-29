import React, {useState, useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleInput from "../../../../common/components/inputs/simpleInput"
import SelectInput from "../../../../common/components/inputs/selectInput";
import {statusDisponibles} from "../../../utils/workFLows/newIssue";
import CKEditor from 'ckeditor4-react';
import project, { files, users, workFlow } from "../../../api";
import Button from "react-bootstrap/Button";
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import history from "../../../../common/helper/history";
import "../../../assets/scss/index.scss";
import apiPath from "../../../../common/constants";

const NewProject = ({match, onClose}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.user.user)
  const [progres, setProgress] = useState(null);
  const [user, setUser] = useState([]);
  const [workFlows, setWorkFlows] = useState([]);
  const [tag, setTag] = useState("");
  const [data, setData ] = useState({
    name: "",
    descripcion: "",
    users: [],
    admin: "",
    issues: [],
    tags: [],
    work_flow: "",
    wiki: []
  });

  useEffect( () => {
    async function fechtUserandWorkFlow(){
        const array = await users.all();
        const flows = await workFlow.all();
        setUser(array);
        setWorkFlows(flows);
    }
    fechtUserandWorkFlow();
  }, []);

const onEditorChange = ( evt ) => {
    setData({
        ...data,
        descripcion: evt.editor.getData()
    });
}

const handleAttachFIle =  async e => {
    e.persist()
    // could do some validation for the attached file here
    const fichero = await files.save(e.target.files, setProgress);
    setData({
        ...data,
        wiki: [...data.wiki, fichero[0]]
    });
    e.target.value = '' // to clear the current file
  }

  const addUsers = (valor) => {
    setData({
        ...data,
        users: valor.map(e => e.value)
    })
  }

  const addTag = () => {
    setData({
        ...data,
        tags: [...data.tags, tag]
    })
  }

  const deleteTag = (tag) => {
    setData({
        ...data,
        tags: data.tags.filter(e => {
            if(e !== tag)
                return e;
        })
    })
  }

  const deleteFile = async (id) => {
    const res = await files.delete(id);
    if(res)
        setData({
            ...data,
            wiki: data.wiki.filter(e => {
                if(e.id !== id)
                    return e;
            })
        });
  }

 const createProject = async () => {
     const objeto = {
        ...data,
        admin: userData.id,
        wiki: data.wiki.map(e => e.id)
     }

     console.log(objeto)
     const res = await project.nuevo(objeto);
     if(res) {
        onClose();
        history.push('/home');
        window.location.reload();
     }
 }

  const selectUser = useMemo(() => {
    if(user.length === 0)
      return [];
    return user.map(e => {
        return {
            value: e.id,
            label: e.username
        }
    })
  }, [user]);

  const selectFlows = useMemo(() => {
    if(workFlows.length === 0)
      return [];
    return workFlows.map(e => {
        return {
            id: e.id,
            description: e.name
        }
    })
  }, [workFlows]);

  return (
    <div>
        <div className="main-form">
            <div className="header">
                <h2>Crear un nuevo proyecto</h2>
            </div>
            <span className="title">Detalles</span>
            <div className="form">
              <div className="row">
                <SimpleInput
                    value={data.name}
                    onChange={(valor) => setData({
                        ...data,
                        name: valor
                    })}
                    classInputName="in"
                    label="Nombre Proyecto:"
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'row'
                }}>
                    <label className="label multiLabel" htmlFor="">
                        Ususarios:
                    </label>
                    <ReactMultiSelectCheckboxes
                        placeholderButtonLabel="Seleccione los usuarios"
                        options={selectUser}
                        onChange={(valor) => addUsers(valor)}
                    />
                    </div>
                </div>
                <div className="row">
                    <SelectInput
                        id="workflow"
                        value={data.work_flow}
                        label="Seleciona work flow:"
                        data={selectFlows}
                        className="in"
                        onChange={(valor) => setData({
                            ...data,
                            work_flow: valor
                        })}
                    />
                    <div>
                        <SimpleInput
                            value={tag}
                            onChange={setTag}
                            classInputName="in"
                            label="Añadir Tag:"
                        />
                        <span onClick={() => addTag()}><i className="fas fa-plus"></i></span>
                    </div>
                </div>
                <span>Tags:</span>
                <ul>
                    {data.tags.map(e => 
                        <li key={e}>
                            {e}
                            &nbsp;&nbsp;&nbsp;
                            <span onClick={() => deleteTag(e)}>
                                <i className="fas fa-trash"></i>
                            </span>    
                        </li>
                    )}
                </ul>        
              </div>
                <span className="title">Descripcion</span>
                <div className="form">
                    <CKEditor
                        data={data.descripcion}
                        onChange={onEditorChange}
                        type="classic"
                    />
                </div>
                <span className="title">Archivos</span>
                <div className="form">
                    {data.wiki.length>0 && (
                        data.wiki.map(e => (
                            <div key={e.id}>
                                <span>
                                <i className="fas fa-file"></i> {e.name}
                                </span>
                                &nbsp;
                                <a href={`${apiPath}${e.url}`} target="_blank" rel="noopener noreferrer">Visualizar</a>
                                &nbsp;
                                <span onClick={() => deleteFile(e.id)}>
                                    <i className="fas fa-trash"></i>
                                </span>
                            </div>
                        ))
                    )}
                    <input type="file" onChange={handleAttachFIle} />
                </div>
                <div className="boton">
                    <Button variant="info" onClick={() => createProject()}>Crear</Button>
                </div>   
        </div>
    </div>
  );
};

export default NewProject;

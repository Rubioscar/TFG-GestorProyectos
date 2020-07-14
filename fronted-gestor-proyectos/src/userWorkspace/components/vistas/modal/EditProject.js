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
import { findOneProject }  from '../../../actions/project';

const NewProject = ({match, onClose}) => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData.user.user)
  const proyecto = useSelector(state => state.project.projects)
  const [progres, setProgress] = useState(null);
  const [user, setUser] = useState([]);
  const [selected, setSelected] =useState([]);
  const [tag, setTag] = useState("");
  const [data, setData ] = useState({
    name: proyecto.name,
    descripcion: proyecto.descripcion,
    users: [],
    tags: proyecto.tags,
    wiki: proyecto.wiki
  });

  useEffect( () => {
    async function fechtUser(){
        const array = await users.all();
        setUser(array);
    }
    fechtUser();
    setSelected(proyecto.users.map(e => {
        return {
            value: e.id,
            label: e.username
        }
    }))
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
        users: selected.map(e => e.value),
        wiki: data.wiki.map(e => e.id)
     }

     const res = await project.actualizar(objeto,proyecto.id);
     if(res) {
        onClose();
        dispatch(findOneProject(proyecto.id))
        history.push('/home');
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

  const options = [
    { label: 'Thing 1', value: 1},
    { label: 'Thing 2', value: 2},
  ];

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
                        value={selected}
                        placeholderButtonLabel="Seleccione los usuarios"
                        options={selectUser}
                        onChange={setSelected}
                    />
                    </div>
                </div>
                <div className="row">
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
                                <a href={`${apiPath}${e.url}`} target="_blank">Visualizar</a>
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
                    <Button variant="info" onClick={() => createProject()}>Actualizar</Button>
                </div>   
        </div>
    </div>
  );
};

export default NewProject;

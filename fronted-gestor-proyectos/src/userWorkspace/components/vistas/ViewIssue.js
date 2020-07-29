import React, {useState, useEffect, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleInput from "../../../common/components/inputs/simpleInput"
import DateInput from "../../../common/components/inputs/dateInput";
import CustomModal from "../../../common/components/modal/CustomModal";
import CKEditor from 'ckeditor4-react';
import "../../assets/scss/index.scss";
import apiPath from "../../../common/constants";
import { getIssue }  from '../../actions/issue';
import EditIssue from "./modal/EditIssue";

const ViewIssue = ({match}) => {
  const dispatch = useDispatch();
  const project = useSelector(state => state.project.projects);
  const issue = useSelector(state => state.issue.issues.issue);
  const [ver, setVer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getIssue(match.params.id));
  }, []);

  useEffect(() => {
    if(Object.keys(project).length !== 0 && Object.keys(issue).length !== 0
        && project.id === issue.project.id)
        setVer(true);
  }, [project, issue])

  return (
    <div>
        {ver  && (
            <div className="main-form">
                <div className="header">
                    <h2>{project.name}: {issue.title}</h2>
                    <h3>{issue.descripcionCorta}</h3>
                </div>
                <div className="view">
                    <span style={{'margin-top': '20px'}}>Detalles</span>
                    <span onClick={() => setShowModal(true)}>
                        <i className="fas fa-edit fa-2x"></i>
                    </span>
                </div>
                <div className="form">
                  <div className="row">
                    <SimpleInput
                        value={issue.estimacion}
                        readOnly
                        classInputName="in"
                        type="number"
                        label="Estimacion (Puntos): "
                    />
                    <SimpleInput
                        value={issue.prioridad}
                        readOnly
                        classInputName="in"
                        type="text"
                        label="Proridad: "
                    />
                  </div> 
                  <div className="row">
                    <SimpleInput
                        value={issue.issue_status.name}
                        readOnly
                        classInputName="in"
                        type="text"
                        label="Status:"
                    />
                    <SimpleInput
                        value={issue.issue_type.name}
                        readOnly
                        label="Tipo:"
                        type="text"
                        classInputName="in"
                    />
                  </div>
                  <div className="row">
                    <SimpleInput
                        value={issue.asignado.username}
                        readOnly
                        classInputName="in"
                        type="text"
                        label="Asignado:"
                    />
                    <SimpleInput
                        value={issue.tag}
                        readOnly
                        label="Tag:"
                        type="text"
                        classInputName="in"
                    />
                  </div>
                  <div className="row">
                    <SimpleInput
                        value={issue.creador.username}
                        readOnly
                        classInputName="in"
                        type="text"
                        label="Creador:"
                    />
                    <DateInput
                        value={issue.updated_at}
                        readOnly
                        label="Última actualizacion:"
                        classFieldName="in"
                    />
                  </div>
                </div>
                <span className="title">Descripcion</span>
                <div className="form">
                    <CKEditor
                        data={issue.descripcion}
                        readOnly
                        type="inline"
                    />
                </div>
                <span className="title">Archivos</span>
                <div className="form">
                {issue.archivos.length>0 && (
                    issue.archivos.map(e => (
                        <div>
                            <span>
                            <i className="fas fa-file"></i> {e.name}
                            </span>
                            &nbsp;
                            <a href={`${apiPath}${e.url}`} target="_blank">Visualizar</a>
                        </div>
                    ))
                )}
            </div>
            {showModal && (
                <CustomModal
                title="Editar issue"
                onOverlayClick={() => setShowModal(false)}
                >
                    <EditIssue
                        data={issue}
                        onClose={() => setShowModal(false)}
                    />
                </CustomModal>
            )}
            </div>
        )}
    </div>
  );
};

export default ViewIssue;

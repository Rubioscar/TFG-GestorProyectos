import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../../common/helper/history";
import AdminProjectView from "../admin/admiProjectView";
import AdminUserView from "../admin/adminUserView";
import ListGroup from "react-bootstrap/ListGroup";
import CustomModal from "../../../../common/components/modal/CustomModal";
import PrivateRoute from '../../../../common/autentificacion/PrivateRoutes';
// import history from "../helper/history";
import "../../../assets/scss/index.scss";

const AdminView = ({match, closepanel}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userData.user.user);

  return (
    <div>
      {user && Object.keys(user).length !==0 && (
      <div>
        <div className="d-flex wrapper">
          <div className="color border-right sidebar-wrapper">
            <div className="sidebar-heading">
              Panel de Administrador  
            </div>
            <ListGroup>
              <ListGroup.Item action className="color" onClick={() => {
                history.push(`${match.url}/admin/usuarios`);
              }}>
                <i className="fas fa-stream" />
                &nbsp;
                Ususarios
              </ListGroup.Item>
              <ListGroup.Item action className="color" onClick={() => {
                history.push(`${match.url}/admin/equipos`);
              }}>
                <i className="fab fa-trello"></i>
                &nbsp;
                Equipos
              </ListGroup.Item>
              <ListGroup.Item action className="color" onClick={() => {
                history.push(`/home`);
                closepanel()
              }}>
                <i className="fas fa-plus-square"></i>
                &nbsp;
                Home
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div className="page-content-wrapper">     
              <PrivateRoute path={`${match.url}/admin/usuarios`} component={AdminUserView} />
              <PrivateRoute path={`${match.url}/admin/equipos`} component={AdminProjectView} />
            </div>
        </div>
      </div>
    )}
    </div>
  );
};

export default AdminView;

import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../common/helper/history";
import PrivateRoute from '../../common/autentificacion/PrivateRoutes';
import ListView from "../components/vistas/ListView";
import TrelloView from "../components/vistas/TrelloView";
import NewIssue from "../components/vistas/NewIssue";
import WikiProject from "../components/vistas/WikiProject";
import NewProject from "../components/vistas/modal/NewProject";
import EditProject from "../components/vistas/modal/EditProject";
import ViewIssue from "../components/vistas/ViewIssue";
import AdminView from "../components/vistas/admin/adminView";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { findOneProject }  from '../actions/project';
import { getIssuesStatus, getIssuesTypes }  from '../actions/issue';
import CustomModal from "../../common/components/modal/CustomModal";
// import history from "../helper/history";
import "../assets/scss/index.scss";
import setUser from "../actions/user";
import projectApi from "../api";

const Home = ({match}) => {
  const dispatch = useDispatch();
  const [proyecSelect, setProyecSelect] = useState(false);
  const user = useSelector(state => state.userData.user.user);
  const project = useSelector(state => state.project.projects);
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [adminPanel, setAdminPanel] = useState(false);
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    dispatch(setUser(data));
    dispatch(getIssuesStatus());
    dispatch(getIssuesTypes());
    async function fechtProyectos(){
      const array = await projectApi.find();
      setProyectos(array);
    }
    fechtProyectos();
  }, []);

  const selectProject = async (id) => {
    await dispatch(findOneProject(id));
    setProyecSelect(true);
  };

  const nuevo = () => {
    setEdit(false);
    setShow(true);
  }

  const editar = () => {
    setEdit(true);
    setShow(true);
  }

  const admin = (e) => {
    e.preventDefault();
    setAdminPanel(true);
  }

  const cerrarSesion = () => {
    localStorage.removeItem("userData");
    history.push('/login')
  }

  return (
    <div>
      {user && Object.keys(user).length !==0 && (
      <div>
        <Navbar bg="info" variant="dark">
        <Navbar.Brand>
          <i className="fas fa-project-diagram"></i>
          &nbsp;
          GPO
        </Navbar.Brand>
        <Nav className="mr-auto">
        <NavDropdown title="Proyectos" id="collasible-nav-dropdown">
        { proyectos.map((project, index) => ( 
          <NavDropdown.Item key={index} onClick={() => selectProject(project.id)}>
            {project.name}
          </NavDropdown.Item> 
          )) 
        }
        </NavDropdown>
        {/*<Nav.Link href=" " onClick={(e) => admin(e)}>Admin</Nav.Link>*/}
          {(user.role.type === "creator" || user.role.type === "admin") && (
            <Button variant="outline-light" onClick={() => nuevo()}>Crear Proyecto</Button>
          )}
        </Nav>
        <Nav style={{ marginRight: '80px'}}>
        <i className="fas fa-user-circle fa-2x imagen"></i>
        <NavDropdown title={user.username} id="collasible-nav-dropdown">
          <NavDropdown.Item  onClick={() => cerrarSesion()}>
            <span className="exit">
              <i className="fas fa-sign-out-alt"></i>
              Cerrar sesión
            </span>
          </NavDropdown.Item> 
        </NavDropdown>
        </Nav>
        </Navbar>
        {adminPanel ? <AdminView closepanel={() => setAdminPanel(false)} /> :
          <div className="d-flex wrapper">
            {proyecSelect ? (
            <div className="color border-right sidebar-wrapper">
              <div className="sidebar-heading">
                {project.name}
                &nbsp;
                {(user.id === project.admin.id || user.role.type === "admin")&& (
                  <span onClick={() => editar()}>
                    <i className="fas fa-pencil-alt"></i>
                  </span>
                )}  
              </div>
              <ListGroup>
                <ListGroup.Item action className="color" onClick={() => {
                  history.push(`${match.url}/listView`);
                }}>
                  <i className="fas fa-stream" />
                  &nbsp;
                  Lista
                </ListGroup.Item>
                <ListGroup.Item action className="color" onClick={() => {
                  history.push(`${match.url}/trelloView`);
                }}>
                  <i className="fab fa-trello"></i>
                  &nbsp;
                  Tablero
                </ListGroup.Item>
                <ListGroup.Item action className="color" onClick={() => {
                  history.push(`${match.url}/newIssue`);
                }}>
                  <i className="fas fa-plus-square"></i>
                  &nbsp;
                  Nueva Issue
                </ListGroup.Item>
                <ListGroup.Item action className="color" onClick={() => {
                  history.push(`${match.url}/wiki`);
                }}>
                  <i className="fas fa-book-open"></i>
                  &nbsp;
                  Wiki
                </ListGroup.Item>
              </ListGroup>
            </div> ) : null
            }
            <div className="page-content-wrapper">     
              <PrivateRoute path={`${match.url}/trelloView`} component={TrelloView} />
              <PrivateRoute path={`${match.url}/listView`} component={ListView} />
              <PrivateRoute path={`${match.url}/newIssue`} component={NewIssue} />
              <PrivateRoute path={`${match.url}/viewIssue/:id`} component={ViewIssue} />
              <PrivateRoute path={`${match.url}/wiki`} component={WikiProject} />
            </div>
          </div> }
        {show && (
          <CustomModal
          title={edit ? "Editar Proyecto" : "Nuevo Proyecto"}
          onOverlayClick={() => setShow(false)}
          >
            {edit ? 
              <EditProject
                onClose={() => setShow(false)}
              /> :
              <NewProject
                  onClose={() => setShow(false)}
              /> }
          </CustomModal>
        )}
      </div>
    )}
    </div>
  );
};

export default Home;

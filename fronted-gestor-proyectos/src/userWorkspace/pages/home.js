import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../common/helper/history";
import PrivateRoute from '../../common/autentificacion/PrivateRoutes';
import ListView from "../components/vistas/ListView";
import TrelloView from "../components/vistas/TrelloView";
import NewIssue from "../components/vistas/NewIssue";
import NewProject from "../components/vistas/modal/NewProject";
import EditProject from "../components/vistas/modal/EditProject";
import ViewIssue from "../components/vistas/ViewIssue";
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

  return (
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
        <Button variant="outline-light" onClick={() => nuevo()}>Crear Proyecto</Button>
      </Nav>
      </Navbar>
      <div className="d-flex wrapper">
        {proyecSelect ? (
        <div className="color border-right sidebar-wrapper">
          <div className="sidebar-heading">
            {project.name}
            &nbsp;
            <span onClick={() => editar()}>
              <i className="fas fa-pencil-alt"></i>
            </span>  
          </div>
          <ListGroup>
            <ListGroup.Item action className="color" onClick={() => {
              history.push(`${match.url}/listView`);
            }}>
              <i className="fas fa-stream" />
              &nbsp;
              Dashboard
            </ListGroup.Item>
            <ListGroup.Item action className="color" onClick={() => {
              history.push(`${match.url}/trelloView`);
            }}>
              <i className="fab fa-trello"></i>
              &nbsp;
              Overview
            </ListGroup.Item>
            <ListGroup.Item action className="color" onClick={() => {
              history.push(`${match.url}/newIssue`);
            }}>
            <i className="fas fa-plus-square"></i>
              &nbsp;
              New Issue
            </ListGroup.Item>
            <ListGroup.Item action className="color">Profile</ListGroup.Item>
            <ListGroup.Item action className="color">Status</ListGroup.Item>
          </ListGroup>
        </div> ) : null
        }
        <div className="page-content-wrapper">     
          <PrivateRoute path={`${match.url}/trelloView`} component={TrelloView} />
          <PrivateRoute path={`${match.url}/listView`} component={ListView} />
          <PrivateRoute path={`${match.url}/newIssue`} component={NewIssue} />
          <PrivateRoute path={`${match.url}/viewIssue/:id`} component={ViewIssue} />
        </div>
      </div>
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
  );
};

export default Home;

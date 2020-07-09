import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import history from "../../common/helper/history";
import PrivateRoute from '../../common/autentificacion/PrivateRoutes';
import ListView from "../components/vistas/ListView";
import TrelloView from "../components/vistas/TrelloView";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import ListGroup from "react-bootstrap/ListGroup";
import { findOneProject }  from '../actions/project';
// import history from "../helper/history";
import "../assets/scss/index.scss";
import setUser from "../actions/user";

const Home = ({match}) => {
  const dispatch = useDispatch();
  const [proyecSelect, setProyecSelect] = useState(false);
  const user = useSelector(state => state.userData.user.user);
  const project = useSelector(state => state.project.projects)

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    dispatch(setUser(data));
  }, []);

  const selectProject = async (id) => {
    await dispatch(findOneProject(id));
    setProyecSelect(true);
  };

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
      { user && user.projects.map((project, index) => ( 
        <NavDropdown.Item key={index} onClick={() => selectProject(project.id)}>
          {project.name}
        </NavDropdown.Item> 
        )) 
      }
        <NavDropdown.Divider />
        <NavDropdown.Item >Ver todos los proyectos</NavDropdown.Item>
      </NavDropdown>
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav>
      </Navbar>
      <div className="d-flex wrapper">
        {proyecSelect ? (
        <div className="color border-right sidebar-wrapper">
          <div className="sidebar-heading">{project.name}</div>
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
            <ListGroup.Item action className="color">Events</ListGroup.Item>
            <ListGroup.Item action className="color">Profile</ListGroup.Item>
            <ListGroup.Item action className="color">Status</ListGroup.Item>
          </ListGroup>
        </div> ) : null
        }
        <div className="page-content-wrapper">     
          <PrivateRoute path={`${match.url}/trelloView`} component={TrelloView} />
          <PrivateRoute path={`${match.url}/listView`} component={ListView} />
        </div>
      </div>
    </div>
  );
};

export default Home;

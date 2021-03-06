import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Contexto de usuario
import UserContext from './context/UserContext';

// Obtenemos el componente a renderizar y cualquier otro parámetro
const PrivateRoute = ({ component: Component, ...others }) => {
  return (
    <UserContext.Consumer>
      { (value) => {
        return (
          <Route
            {...others}
            render={(props) =>
            // Renderizamos el componente con sus propiedades solo si el
            // usuario está identificado
            value.signedIn ? (
              <Component {...props} />
            ) : (
              // Redirigimos a /login en otro caso
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    message: 'Intenta loguearte antes'
                  }
                }}
              />
            )}
          />
)
      }}
    </UserContext.Consumer>
  );
}

export default PrivateRoute;

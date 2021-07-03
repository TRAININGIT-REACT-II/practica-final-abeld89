import { NavLink } from "react-router-dom";
import { useContext } from 'react';

import { UserContext } from '../context/UserContextProvider';

/**
 * Pagina principal
 */
const Home = () => {

  const { data, deleteData } = useContext(UserContext);

  if (data && !data.token) {
    return <section aria-describedby="desc">
      <main>
        <h1>TRAINING NOTES BY ABEL</h1>
        <div>
          <nav className="secondary">
            <NavLink activeClassName="active" to="/login">
              Login
            </NavLink>
            <NavLink activeClassName="active" to="/register">
              Register
            </NavLink>
          </nav>
        </div>
      </main>
    </section>
  } else {
    return (<section aria-describedby="desc">
      <main>
        <h1>TRAINING NOTES BY ABEL</h1>
        <div>
          <nav className="secondary">
            <NavLink activeClassName="active" to="/">
              Inicio
            </NavLink>
            <NavLink activeClassName="active" to="/notes">
              Notas
            </NavLink>
          </nav>
        </div>
      </main>
      <div className="d-flex col-md-12">
        <div className="col-md-3 menu">
          <p>Usuario: {data.username.toUpperCase()}</p>
          <p><button className="btn btn-info" onClick={e => deleteData()}>Cerrar sesión</button></p>
        </div>
      </div>
    </section>
    );
  }
}
export default Home;
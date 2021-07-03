import '../css/Form.css';
import { Redirect } from "react-router-dom";
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContextProvider';

/**
 * El login de usuario registrado
 */
const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { saveData, data } = useContext(UserContext);

  const loginForm = (e) => {
    e.preventDefault();
    // Agregamos un nuevo elemento
    fetch("/api/login", {
      // Cambiamos el método a POST
      method: "POST",
      // Obtenemos el cuerpo del mensaje. Hacemos uso de JSON.stringify
      // Para obtener una cadena a partir del objeto
      body: JSON.stringify({
        username: username,
        password: password
      }),
      // Modificamos la cabecera
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      // Obtenemos la respuesta
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          alert(json.error);
        } else {
          saveData(json);
        }
      })
      .catch((err) => console.error(err));
  };

  if (data.token) {
    return <Redirect to="/" />
  } else {
    return <section aria-describedby="desc">
      <div className="login-form">
        <form onSubmit={loginForm}>
          <h2 className="text-center">Iniciar sesión</h2>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Username" required="required" onChange={e => setUsername(e.target.value)} value={username} />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" placeholder="Password" required="required" onChange={e => setPassword(e.target.value)} value={password} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-success col-md-12">
              Inicia
            </button>
          </div>
        </form >
      </div >
    </section>
  }

};

export default Login;
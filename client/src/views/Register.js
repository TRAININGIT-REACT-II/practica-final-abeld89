import { useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";

/**
 * Página de registro
 */
const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { saveData, data } = useContext(UserContext);

  const resetForm = () => {
    setUsername("");
    setPassword("");
    setPassword2("");
  };

  const submitForm = (e) => {
    e.preventDefault();
    // Agregamos un nuevo elemento
    fetch("/api/register", {
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
          resetForm();
        } else {
          saveData(json);
        }
      })
      .catch((err) => console.error(err));
  };

  if (data.token) {
    return <p>Usuario logueado {data.username}</p>
  }

  return <div className="login-form">
    <form onSubmit={submitForm}>
      <h2 className="text-center">Nueva cuenta</h2>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Username" required="required" onChange={e => setUsername(e.target.value)} value={username} />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Password" required="required" onChange={e => setPassword(e.target.value)} value={password} />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Repeat Password" required="required" onChange={e => setPassword2(e.target.value)} value={password2} />
      </div>
      <div className="form-inline">
        <button type="submit" className="btn btn-primary col-md-12">
          Registrarse
        </button>
      </div>
      <div className="form-group">
        <button onClick={resetForm} className="btn btn-warning col-md-12">
          Limpiar
        </button>
      </div>
    </form>
  </div>
};

export default Register;
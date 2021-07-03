import { useContext, useState, useEffect } from "react"
import { Redirect, useParams, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";

/**
 * Página para listar notas
 */
const ViewNote = () => {
  const { data } = useContext(UserContext);
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  const history = useHistory();

  if (!data.token) {
    return <Redirect to="/login" />;
  }

  const fetchNote = () => {
    fetch("/api/notes/" + id, {
      headers: {
        "api-token": data.token
      }
    })
      .then((res) => res.json())
      .then((json) => {
        setNote(json)
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    fetchNote();
  }, []);

  if (error) {
    return <p>Ha ocurrido un error mientras se buscaba la nota</p>
  }

  if (!note) {
    return <p>Cargando...</p>
  }

  return (
    <section aria-label="Notes" className="d-flex justify-content-center">
      <div>
        <div>
          <p>Editar nota: {note.id}</p>
          <div className="input-group mb-3">
            <input disabled type="text" className="form-control" value={note.title} />
            <input disabled type="text" className="form-control" value={note.content} />
          </div>
        </div>
        <div>
          <button type="button" onClick={() => history.push("/notes")} className="btn-primary">Volver</button>
        </div>
      </div>
    </section>
  );

};

export default ViewNote;
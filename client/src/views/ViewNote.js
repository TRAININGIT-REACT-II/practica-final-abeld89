import { Redirect, useParams, Link, useRouteMatch } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContextProvider";

/**
 * Página para listar notas
 */
const ViewNote = () => {
  // Esta variable es para guardar la ruta padre de la que venimos (/notes)
  const match = useRouteMatch();
  const params = useParams();
  const { data } = useContext(UserContext);
  const [note, setNote] = useState([]);

  if (!data.token) {
    return <Redirect to="/login" />
  }

  const fetchNote = () => {
    fetch(`/api/notes/${params.id}`, {
      headers: {
        "api-token": data.token
      }
    })
      .then((res) => res.json())
      .then((json) => setNote(json))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <section aria-label="Notes" className="d-flex justify-content-center">
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="">Note {params.id}</span>
          </div>
          <input type="text" className="form-control" defaultValue={note.title} />
          <input type="text" className="form-control" defaultValue={note.content} />
        </div>
        <Link to={`${match.url}`}>
          <button className="btn btn-outline-secondary" type="button">Volver</button>
        </Link>
      </div>
    </section >

  );
};

export default ViewNote;
import { useContext, useState, useEffect } from "react"
import { Redirect, useParams, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import { updateNote as updateNoteService } from "../services/notesService";

/**
 * Editar nota
 */
const EditNote = () => {

  const { data } = useContext(UserContext);
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
        setTitle(json.title);
        setContent(json.content);
        setNote(json)
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    fetchNote();
  }, []);

  const updateNote = (e) => {
    e.preventDefault();
    updateNoteService(data.token, id, title, content)
      .then(() => history.push("/notes"))
      .catch((err) => setError(err));
  };

  if (error) {
    return <p>Ha ocurrido un error mientras se buscaba la nota</p>
  }

  if (!note) {
    return <p>Cargando...</p>
  }

  return (
    <section aria-label="Notes" className="d-flex justify-content-center">
      <form onSubmit={updateNote}>
        <div>
          <p>Editar nota: {id}</p>
          <div className="input-group mb-3">
            <input type="text" className="form-control" onChange={e => setTitle(e.target.value)} value={title} />
            <input type="text" className="form-control" onChange={e => setContent(e.target.value)} value={content} />
          </div>
        </div>
        <div>
          <button type="submit" className="btn-primary">Guardar</button>
          <button type="button" onClick={() => history.push("/notes")} className="btn-primary">Cancelar</button>
        </div>
      </form>
    </section>
  );

};

export default EditNote;
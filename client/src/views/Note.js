import { useState, useContext } from "react"
import { Redirect } from "react-router-dom";
import '../css/Note.css';
import { UserContext } from "../context/UserContextProvider";
/**
 * Nueva nota
 */
const Note = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data } = useContext(UserContext);

  const [notes, setNotes] = useState([]);

  const resetForm = () => {
    setTitle("");
    setContent("");
  };

  const submitNote = (e) => {
    e.preventDefault();
    if (title && content) {
      return;
    }
    const submitNoteReq = {
      title: title,
      content: content
    };
    fetch("/api/notes", {
      // Cambiamos el método a POST
      method: "POST",
      // Obtenemos el cuerpo del mensaje. Hacemos uso de JSON.stringify
      // Para obtener una cadena a partir del objeto
      body: JSON.stringify(submitNoteReq),
      // Modificamos la cabecera
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "api-token": data.token
      },
    })
      // Obtenemos la respuesta
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          alert(json.error);
        } else {
          setNotes([json].concat(notes));

        }
        resetForm();
      })
      .catch((err) => console.error(err));
  };

  if (!data.token) {
    return <Redirect to="/login" />;
  }

  return (
    <section aria-label="Add Note" className="d-flex justify-content-center">
      <form onSubmit={submitNote}>
        <div className="form-group">
          <label htmlFor="add" className="text-center">Añadir una nueva nota</label>
          <input
            id="add"
            type="text"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Escribe un título"
          />
        </div>
        <div className="form-group">
          <input
            id="add"
            type="text"
            className="form-control"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Escribe el contenido"
          />
          <button type="submit" className="btn btn-primary col-md-12">Agregar una nota</button>
          <button type="" className="btn btn-secondary col-md-12">Volver</button>
        </div>
      </form>
    </section>
  );
};

export default Note;
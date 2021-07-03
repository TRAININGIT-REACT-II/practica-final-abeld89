import { Link, Redirect } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContextProvider";

import Modal from "../components/Modal";

/**
 * Nueva nota
 */
const Notes = () => {
  const { data } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  
  const [noteToDelete, setNoteToDelete] = useState("");
  const closeModal = () => setNoteToDelete("");

  const handleClickNotDelete = () => {
    closeModal();
  }

  const handleClickDelete = () => {
    //Llamar a borrar
    console.log("boton eliminar");
    deleteNote();
    closeModal();
  }

  const deleteNote = () => {
    fetch(`/api/notes/${noteToDelete}`, {
      headers: {
        "api-token": data.token
      },
      method: "DELETE"
    })
      .then((res) => res.json())
      .then(() => fetchNotes())
      .catch((err) => console.error(err));
  };

  const fetchNotes = () => {
    fetch("/api/notes", {
      headers: {
        "api-token": data.token
      }
    })
      .then((res) => res.json())
      .then((json) => setNotes(json))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (!data.token) {
    return <Redirect to="/login" />;
  } else {
    return (<section aria-label="Notes" className="d-flex justify-content-center">
      <div>
        <div>
          <p>Listado de notas para el usuario: {data.username}</p>
          {notes.map((note, i) => (
            <div key={i}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">Note {i}</span>
                </div>
                <input type="text" className="form-control" defaultValue={note.title} />
                <input type="text" className="form-control" defaultValue={note.content} />
                <Link to={'/viewNote/' + note.id}>
                  <div className="input-group-append">
                    <button className="btn btn-outline-success" type="button">Ver</button>
                  </div>
                </Link>
                <Link to={'/editNote/' + note.id} >
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">Editar</button>
                  </div>
                </Link>
                <div className="input-group-append">
                  <button onClick={() => setNoteToDelete(note.id)} className="btn btn-danger" type="button">Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <Link to="/addNote">
            <button className="btn-primary">Añadir nota</button>
          </Link>
        </div>
      </div>
      <Modal show={noteToDelete} onClose={closeModal}>
        <h3>¿Estás seguro que quieres eliminar esta nota?</h3>
        <p>Estamos en modal</p>
        <button onClick={handleClickDelete}>Si</button>
        <button onClick={handleClickNotDelete}>No</button>
      </Modal>
      
    </section>
    );
  }
}

export default Notes;
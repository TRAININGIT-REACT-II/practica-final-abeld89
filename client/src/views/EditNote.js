import { useContext, useState } from "react"
import { Redirect, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";

/**
 * Editar nota
 */
const EditNote = (props) => {

  const { data } = useContext(UserContext);
  const id = props.state.note.id;
  const title = props.state.note.title;
  const content = props.state.note.content;

  if (!data.token) {
    return <Redirect to="/login" />;
  }

  return (
    <section aria-label="Notes" className="d-flex justify-content-center">
      <div>
        <div>
          <p>Editar nota: {id}</p>
          <div className="input-group mb-3">
            <input type="text" className="form-control" defaultValue={title} />
            <input type="text" className="form-control" defaultValue={content} />
          </div>
        </div>
        <div>
          <Link to="/">
            <button className="btn-primary">Guardar</button>
          </Link>
          <Link to="/">
            <button className="btn-primary">Cancelar</button>
          </Link>
        </div>
      </div>
    </section>
  );

};

export default EditNote;
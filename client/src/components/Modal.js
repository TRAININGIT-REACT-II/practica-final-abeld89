import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import "../css/Modal.css";

const Modal = ({ children, show, onClose }) => {
  const modalRef = useRef(null);
  const modalGroupRef = useRef(document.getElementById("modal"));

  useEffect(() => {
    const modalElement = document.createElement("div");
    modalElement.classList.add("modal-hidden");

    modalGroupRef.current.appendChild(modalElement);
    modalRef.current = modalElement;

    return () => modalGroupRef.current.removeChild(modalRef.current);
  }, []);

  useEffect(() => {
    if (modalRef.current != null) {
      if (show) {
        modalRef.current.classList.remove("modal-hidden");
      } else {
        modalRef.current.classList.add("modal-hidden");
      }
    }
  }, [show]);

  // Renderizamos componente
  if (show && modalRef.current != null) {
    return createPortal(
      <div role="dialog" aria-modal="true">
        <div className="modal-background" onClick={onClose} />
        <div className="my-modal">
          <button aria-label="Cerrar modal"
            className="modal-close outline"
            onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>,
      modalRef.current
    );
  } else {
    // No renderizamos
    return null;
  }
};

export default Modal;
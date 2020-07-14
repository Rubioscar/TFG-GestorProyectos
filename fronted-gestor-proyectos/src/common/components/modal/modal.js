import { useEffect } from "react";
import ReactDOM from "react-dom";
import "../../assets/scss/modal.scss"

let modalContainer = null;

const Modal = ({ children }) => {
  const modalRoot = document.getElementById("modal");
  modalContainer = document.createElement("div");
  modalRoot.appendChild(modalContainer);
  useEffect(() => {
    return () => {
      modalRoot.removeChild(modalContainer);
      modalContainer = null;
    };
  });
  return modalContainer
    ? ReactDOM.createPortal(children, modalContainer)
    : null;
};
export default Modal;

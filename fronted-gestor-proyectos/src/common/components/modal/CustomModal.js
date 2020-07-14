import React from "react";
import Modal from "./modal";

const CustomModal = ({ onOverlayClick, title,children }) => {
  return (
    <Modal>
      <div className="overlay" onClick={onOverlayClick} />
      <div className={`modal-container genericModal`}>
      <div className="title">{title}</div>
      <div className="wrapper">{children}</div>
      </div>
    </Modal>
  );
};

export default CustomModal;

import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ onClose, children, title }:{
    onClose: () => void,
    children: React.ReactNode,
    title?: string
}) => {
    const handleCloseClick = (e:any) => {
        e.preventDefault();
        onClose();
    };

    const modalContent = (
        <div className="modal-overlay">
            <div className="modal-wrapper max-sm:w-full">
                <div className="modal relative">
                    <div className="modal-header">
                        <a href="#" onClick={handleCloseClick}>
                            x
                        </a>
                    </div>
                    {title && <h1>{title}</h1>}
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );

    return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root") as HTMLElement
    );
};

export default Modal
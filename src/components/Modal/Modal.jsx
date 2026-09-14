import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useModalRoot } from "./hooks/useModalRoot";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { useBodyScrollLock } from "./hooks/useBodyScrollLock";
import { useEscapeHandler } from "./hooks/useEscapeHandler";
import { useHandleOutsideClick } from "./hooks/useHandleOutsideClick";
import { useModalAnimation } from "./hooks/useModalAnimation";

import "./modal.css";

export const Modal = ({ isOpen, onClose, children, title, className = "", footer }) => {
  const modalRoot = useModalRoot();
  const modalRef = React.useRef(null);
  const { shouldRender, isAnimating } = useModalAnimation(isOpen);
  useFocusTrap(modalRef, isOpen);
  useBodyScrollLock(isOpen);
  useEscapeHandler(isOpen ? onClose : null);
  useHandleOutsideClick(modalRef, isOpen ? onClose : null);

  if (!shouldRender || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        ref={modalRef}
        className={`modal-content ${isAnimating ? "modal-animate" : ""} ${className}`}
        tabIndex="-1"
      >
        {title && (
          <h2 id="modal-title" className="modal-title">
            {title}
          </h2>
        )}

        <button className="modal-close-button" onClick={onClose} aria-label="Close modal">
          ×
        </button>

        <div className="modal-body">{children}</div>
        <div className="modal-footer">{footer}</div>
      </div>
    </div>,
    modalRoot,
  );
};

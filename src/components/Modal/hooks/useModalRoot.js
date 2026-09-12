import { useEffect, useState } from "react";

export function useModalRoot() {
  const [modalRoot, setModalRoot] = useState(null);

  useEffect(() => {
    let root = document.getElementById("modal-root");

    if (!root) {
      root = document.createElement("div");
      root.id = "modal-root";
      document.body.appendChild(root);
    }

    setModalRoot(root);

    return () => {
      if (root && root.childNodes.length === 0) {
        document.body.removeChild(root);
      }
    };
  }, []);

  return modalRoot;
}

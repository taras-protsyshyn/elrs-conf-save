import { createContext, useState, useEffect, useContext } from "react";

const ProductTypeContext = createContext();

export const ProductTypeProvider = ({ children }) => {
  const [productType, setProductType] = useState(null);

  useEffect(() => {
    const productNameElement = document.querySelector("#product_name");
    if (productNameElement) {
      const productType = productNameElement.textContent.toLocaleLowerCase().includes("tx")
        ? "tx"
        : "rx";
      setProductType(productType);
    }
  }, []);

  return (
    <ProductTypeContext.Provider value={{ productType }}>{children}</ProductTypeContext.Provider>
  );
};

export const useProductTypeContext = () => useContext(ProductTypeContext);

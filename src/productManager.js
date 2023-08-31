import { writeFileSync, readFileSync } from "fs";

class ProductManager {
  constructor() {
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const idProduct = this.products.length + 1;
    const codeEncontrado = this.products.find(
      (producto) => code === producto.code
    );
    if (codeEncontrado) {
      console.log("Producto con code proporcionado ya existe");
      return;
    }
    const producto = {
      id: idProduct,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    if (Object.values(producto).includes(undefined)) {
      console.log("Faltan datos");
      return;
    }
    this.products.push(producto);
    try {
      writeFileSync("archivo.txt", JSON.stringify(this.products));
      console.log("Producto agregado en el archivo");
    } catch (error) {
      console.log("Error al actualizar archivo");
    }
  }
  getProducts() {
    try {
      const data = JSON.parse(readFileSync("archivo.txt", "utf-8"));
        return data
    } catch (error) {
      console.log(error);
    }
  }
  getProductById(idProduct) {
    const arreglo = JSON.parse(readFileSync("archivo.txt", "utf-8"));
    const productFound = arreglo.find((producto) => idProduct === producto.id);
    productFound ? console.log(productFound) : console.error("NOT FOUND");
  }

  updateProduct(idProduct, replacementProduct) {
    const arreglo = JSON.parse(readFileSync("archivo.txt", "utf-8"));
    const productFound = arreglo.find((producto) => idProduct === producto.id);
    if (productFound) {
      replacementProduct.id = idProduct;
      arreglo[idProduct - 1] = replacementProduct;
      writeFileSync("archivo.txt", JSON.stringify(arreglo));
      console.log("Producto actualizado en el archivo");
    } else {
      console.log("NOT FOUND");
    }
  }

  deleteProduct(idProduct) {
    const arreglo = JSON.parse(readFileSync("archivo.txt", "utf-8"));
    const arregloBorrado = arreglo.filter(
      (producto) => producto.id !== idProduct
    );
    writeFileSync("archivo.txt", JSON.stringify(arregloBorrado));
    console.log("Producto borrado en el archivo");
  }
}

const productManager = new ProductManager();

productManager.addProduct(
  "Iphone 14",
  "Iphone blanco 14 256GB",
  2500,
  "./img/iphone14",
  "IP14",
  10
);
productManager.addProduct(
  "Iphone 13",
  "Iphone negro 13 128GB",
  1800,
  "./img/iphone13",
  "IP13",
  5
);
productManager.addProduct(
  "Iphone 12",
  "Iphone rose 12 256GB",
  1500,
  "./img/iphone12",
  "IP12",
  15
);
productManager.addProduct(
    "Iphone 11",
    "Iphone negro 11 128GB",
    1800,
    "./img/iphone11",
    "IP11",
    25
  );
  productManager.addProduct(
    "Iphone 10",
    "Iphone negro 10 128GB",
    1800,
    "./img/iphone10",
    "IP10", 
    8
  );
  productManager.addProduct(
    "Iphone 9",
    "Iphone blue 9 128GB",
    1800,
    "./img/iphone9",
    "IP9",
    12
  );
  productManager.addProduct(
    "Iphone 8",
    "Iphone red 8 128GB",
    1000,
    "./img/iphone8",
    "IP8",
    6
  );



export const productos = productManager.getProducts()

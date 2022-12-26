const fs = require('fs');

const writeFile = (path, product) => fs.promises.writeFile(path, JSON.stringify({ product: product }))

const readFile = async (path) => {
    const asyncProduct = await fs.promises.readFile(path);
    const result = JSON.parse(asyncProduct)
    return result
}

class ProductManager {

    constructor(path) {
        this.product = [];
        this.path = path;
    }

    inicio = async () => {
        const existFile = fs.existsSync(this.path)

        if (existFile) {
            console.log("El archivo ya existe");
            const { product } = await readFile(this.path)
            this.product = product;
        } else {
            await writeFile(this.path, this.product);
            console.log("El archivo se crero correctamente");
        }
    }

    getProducts = async () => {
        const file = await readFile(this.path)
        return file;
    }

    // getProducts = []

    addProduct = async ({ title, descripcion, price, thumbnail, code, stock }) => {
        const buscar = this.product.find((producto) => producto.title === title || producto.code === code);

        if (buscar) {
            console.log(`Error ya existe un producto con eso nombre${title} o codigo ${code}`);
        } else {
            const id = this.product.length + 1;
            this.product.push({
                id,
                title,
                descripcion,
                price,
                thumbnail,
                code,
                stock
            })
            await writeFile(this.path, this.product);
            console.log('Producto creado exitosamente');
        }
    };

    getProductsById = (id) => {
        const idProducto = this.product.map((product) => product.id === id);

        if (idProducto) {
            return idProducto
        } else {
            console.log('No se encontro el producto con ese id');
            return null;
        }
    }

    updateProduct = async (id, newProducto) => {
        const indexProduct = this.product.findIndex((product) => product.id === id);

        if (indexProduct !== -1) {
            const ids = this.product[indexProduct].id;

            this.product[indexProduct] = {
                id,
                ...newProducto
            }
            await writeFile(this.path, this.product);
            console.log('Se actualizo correctamente');
        } else {
            console.log('No se encontro el producto con ese id');
        }
    }

    deleteProduct = async (id) => {
        const indexProduct = this.product.findIndex((product) => product.id === id);

        if (indexProduct !== -1) {
            const newProducto = this.product.filter((product) => product.id !== id);

            await writeFile(this.path, newProducto);
            console.log('Se elimino correctamente');
        } else {
            console.log('No se encontro el producto con ese id');
        };
    }
}

async function main() {
    const productManager = new ProductManager("./productos.json");
    await productManager.inicio()

    let productos = await productManager.getProducts()
    console.log(productos);

    const newProducto = {
        title: "producto prueba",
        descripcion: "este es un  producto prueba",
        price: 200,
        thumbnail: "sin imagen",
        code: "abc123",
        stock: 25
    }
    await productManager.addProduct(newProducto);

    productos = await productManager.getProducts()
    console.log(productos);

    const producUpdate = {
        title: "producto prueba",
        descripcion: "este es un  producto prueba",
        price: 200,
        thumbnail: "sin imagen",
        code: "abc123",
        stock: 25
    }

    await productManager.updateProduct(1, producUpdate);

    productos = await productManager.getProducts();
    console.log(productos);

    await productManager.deleteProduct()

    products = await productManager.getProducts()
    console.log(productos);
}

main()
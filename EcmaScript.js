class ProdcutManager {

    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (title && description && price && thumbnail && code && code && stock) {

            const Exist = this.products.map(v => v.code).includes(code);

            if (Exist) {
                console.log('This code exist');
            } else {
                this.products.push({
                    id: this.products.length,
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock
                });
            }
        } else {
            console.log('Error i missed entering some value ');
        }
    }

    getProduct() {
        console.log(this.products);
    }


    getProductById(id) {
        const productId = this.products.map(productId => productId.id).includes(id)

        if (!productId) {
            console.log('product not found');
        }
    }

}

// Instancia
const products = new ProdcutManager()

products.getProduct()

products.addProduct("prodcuto prueba", "Este es un prodcuto prueba", 200, "sin imagen", "abc123", 25)

products.getProduct()

products.addProduct("prodcuto prueba", "Este es un prodcuto prueba", 200, "sin imagen", "abc123", 25)

products.getProduct()

products.getProductById(3)
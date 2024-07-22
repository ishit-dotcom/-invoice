class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = parseFloat(price);
        this.quantity = parseInt(quantity);
        this.total = this.price * this.quantity;
    }
}

class Invoice {
    constructor(customerName) {
        this.customerName = customerName;
        this.date = new Date().toLocaleString();
        this.products = [];
        this.totalAmount = 0.0;
    }

    addProduct(product) {
        this.products.push(product);
        this.totalAmount += product.total;
    }

    generateInvoice() {
        let invoice = `<h2>INVOICE</h2>`;
        invoice += `<p>Customer: ${this.customerName}</p>`;
        invoice += `<p>Date: ${this.date}</p>`;
        invoice += `<table>`;
        invoice += `<tr><th>Product</th><th>Quantity</th><th>Price</th><th>Total</th></tr>`;

        this.products.forEach(product => {
            invoice += `<tr><td>${product.name}</td><td>${product.quantity}</td><td>$${product.price.toFixed(2)}</td><td>$${product.total.toFixed(2)}</td></tr>`;
        });

        invoice += `</table>`;
        invoice += `<p><strong>Total Amount: $${this.totalAmount.toFixed(2)}</strong></p>`;
        
        return invoice;
    }
}

let invoice;

function addProduct() {
    const customerName = document.getElementById('customerName').value;
    if (!invoice) {
        invoice = new Invoice(customerName);
    }

    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const quantity = document.getElementById('productQuantity').value;

    if (name && price && quantity) {
        const product = new Product(name, price, quantity);
        invoice.addProduct(product);

        document.getElementById('productName').value = '';
        document.getElementById('productPrice').value = '';
        document.getElementById('productQuantity').value = '';
    }
}

function generateInvoice() {
    if (invoice) {
        document.getElementById('invoice').innerHTML = invoice.generateInvoice();
    }
}

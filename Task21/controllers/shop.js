const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cart-item");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      // console.log(product);

      res.render("shop/product-detail", {
        pageTitle: product.title, // product.title,
        path: "/products",
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.shopUser
    .getCart()
    .then((cart) => {
      // console.log(cart);
      return cart
        .getProducts()
        .then((products) => {
          // console.log(products)
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products,
            cartTotal: cart.totalPrice,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let existingQty;
  req.shopUser
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      let newQuantity = 1;
      if (product) {
        existingQty = product.cartitem.quantity;

        return CartItem.findOne({ where: { productId: product.id } })
          .then((cartProduct) => {
            return cartProduct.update({ quantity: existingQty + 1 });
          })
          .then((op) => {
            // console.log("Row Updated :", op);
            return "Row Updated";
          })
          .catch((err) => console.log(err));
      }
      // ...

      return Product.findByPk(prodId)
        .then((product) => {
          return fetchedCart.addProduct(product, {
            through: { quantity: newQuantity },
          });
        })
        .catch((err) => console.log(err));
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  CartItem.findOne({ where: { productId: prodId } })
    .then((cartproduct) => {
      console.log("destroying the product");
      cartproduct.destroy();
      return;
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });

};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

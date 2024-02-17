const path = require("path");
const cors = require("cors");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const Product = require("./models/product");
const ShopUser = require("./models/shop_user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  ShopUser.findByPk(1)
    .then((shopUser) => {
      req.shopUser = shopUser;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(userRoutes);
app.use("/expense", expenseRoutes);

app.use(cors());
// app.use(errorController.get404);

Product.belongsTo(ShopUser, { constraints: true, onDelete: "CASCADE" });
ShopUser.hasMany(Product);
ShopUser.hasOne(Cart);
Cart.belongsTo(ShopUser);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

sequelize
  .sync({ force: true })
  // .sync()
  .then((result) => {
    return ShopUser.findByPk(1);
  })
  .then((shopUser) => {
    if (!shopUser) {
      return ShopUser.create({ name: "Miachel", email: "Scott@gmail.com" });
    }
    return shopUser;
    // console.log(result);
  })
  .then((shopUser) => {
    // console.log(shopUser);
    return shopUser.createCart();
  })
  .then((cart) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

// All the imports ##############################################################################
const Razorpay = require("razorpay");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const sequelize = require("sequelize");

const Expense = require("../models/expense");
const Order = require("../models/order");
const User = require("../models/user");

//  The required functions ##############################################################################
let new_token = "abcd";
const secretKey = "feiofheofgepegje";
function generateAccessToken(id, ispremiumUser) {
  return jwt.sign({ userId: id, premium: ispremiumUser }, secretKey);
}
// All the exports ##############################################################################
exports.getPurchasePremium = async (req, res, next) => {
  try {
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const amount = 2500;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        console.error("Razorpay Order Creation Error:", err);
        return res
          .status(500)
          .json({ error: "Razorpay Order Creation Failed" });
      }
      req.user
        .createOrder({ orderId: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          // throw new Error(err);
          console.error("Unhandled Error:", err);
          res.status(500).json({ error: "Internal Server Error" });
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something went Wrong !", error: err });
  }
};

exports.postUpdateTransactionstatus = async (req, res, next) => {
  try {
    const { payment_id, order_id } = req.body;
    Order.findOne({ where: { orderId: order_id } }).then((order) => {
      order
        .update({ paymentId: payment_id, status: "SUCCESSFUL" })
        .then(() => {
          req.user
            .update({ ispremiumUser: true })
            .then(() => {
              new_token = generateAccessToken(order.userId, true);
            })
            .then(() => {
              return res.status(202).json({
                success: true,
                message: "Transaction Successfull !",
                token: new_token,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPremiumness = async (req, res, next) => {
  if (req.user.ispremiumUser) {
    return res.json({ premium: true });
  } else {
    return res.json({ premium: false });
  }
};

exports.postUpdateFailure = async (req, res, next) => {
  try {
    const { payment_id, order_id, order_success } = req.body;

    if (!order_success) {
      Order.findOne({ where: { orderId: order_id } }).then((order) => {
        order.update({ status: "FAILED" }).then(() => {
          return res.json({ message: "Transaction Failed" });
        });
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getLeaderboard = async (req, res, next) => {
  const current_users = await Expense.findAll({
    attributes: [
      "userId",
      [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
    group: ["userId"],
  });
  // console.log(current_users);
  res.json(current_users)
  // for (let i = 0; i < current_users.length; i++) {
  //   console.log(current_users[i]);
  // }
};

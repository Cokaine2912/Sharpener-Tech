const sib = require("sib-api-v3-sdk");
const fs = require("fs");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");
const path = require("path");
const bcrypt = require("bcrypt");

//// MODELS //////////////////
const Forgot = require("../models/forgot");
const User = require("../models/user");

// const uuid = require("uuid");

require("dotenv").config();

const client = sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

const tranEmailApi = new sib.TransactionalEmailsApi();

const sender = {
  email: "niraj2835@gmail.com",
  name: "Meredith",
};

// const redirect = "http://localhost:5000/password/resetpassword"

function validate(uuid) {
  return uuidValidate(uuid);
}
const redirect = "http://localhost:5000/password/resetpassword";
async function SendinBlue(receiver) {
  const receivers = [
    {
      email: receiver,
    },
  ];
  try {
    const id = uuidv4();
    op = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Password Reset | Testing SendinBlue | Brevo",
      textContent: `This is just for testing purpose !!`,
      htmlContent: `<h1>FIXING LINK !!</h1>
          <a href="${redirect}/${id}">Click here to reset Paassword<a/>`,
    });

    return id;
  } catch (err) {
    console.log(err);
  }
}

async function HASHING(password, saltrounds) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltrounds).then((hash) => {
      resolve(hash);
    });
  });
}

////////// ALL EXPORTS ////////////////////////////////////////

exports.postNewPassword = async (req, res, next) => {
  const id = await SendinBlue(req.body.email);
  req.body.id = id;
  return res.json(req.body);
};

exports.getResetPassword = async (req, res, next) => {
  try {
    const id = req.params.id;

    const forgot = await Forgot.findOne({ where: { id: id } });

    if (forgot && forgot.isactive === true) {
      console.log("found and active !");

      //   res.redirect(
      //     "http://127.0.0.1:3000/OPTIMIZATION_EXPENSE/views/forgotpassword.html"
      //   );
      res.write("<h1>This is RESET</h1>");
      res.write(`<form action="http://localhost:5000/password/updatenewpassword" method="post">
    <input type="text" name="email" placeholder="email"><br><br>
    <input type="password" name="password" id="password" placeholder="password"><br><br>
    <input type="password" name="confirm" id="confirm" placeholder="confirm password"><br><br>
    <input type="hidden" value=${id} name="id">
    <button type="submit">Submit</button>
  </form>`);
    }
    res.end();
  } catch (err) {
    console.log(err);
  }
};

exports.getResetLink = async (req, res, next) => {
  try {
    const receiver = req.body.email;

    const user = await User.findOne({ where: { email: receiver } });

    if (!user) {
      return res.json({ error: "Email you entered doesn't exist" });
    }

    const id = await SendinBlue(receiver);

    const forgot = await Forgot.create({
      id: id,
      userId: user.id,
      isactive: true,
    });

    res.json({ msg: "reached", id: id });
  } catch (err) {
    console.log(err);
  }
};

exports.updateNewPassword = async (req, res, next) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const confirm = req.body.confirm;
    const id = req.body.id;

    if (password !== confirm) {
      return res.json({ error: "Passwords not matching !" });
    }
    user = await User.findOne({ where: { email: email } });
    forgot = await Forgot.findOne({ where: { id: id } });

    const saltrounds = 10;
    const new_password = await HASHING(password, saltrounds);
    await user.update({ password: new_password });
    
    await forgot.update({ isactive: false });
    return res.json(req.body);
    // res.write("<h2>Your Password has beeen reset</h2>");}
  } catch (err) {
    console.log(err);
  }
};

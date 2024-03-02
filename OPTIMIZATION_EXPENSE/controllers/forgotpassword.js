const sib = require("sib-api-v3-sdk");
const fs = require("fs");
const { v4: uuidv4, validate: uuidValidate } = require("uuid");

// const uuid = require("uuid");

require("dotenv").config();

const client = sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;

const tranEmailApi = new sib.TransactionalEmailsApi();

const sender = {
  email: "niraj2835@gmail.com",
  name: "Cokaine Again",
};

function validate(uuid) {
  return uuidValidate(uuid);
}

async function SendinBlue(receiver) {
  const receivers = [
    {
      email: receiver,
    },
  ];
  try {
    op = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Password Reset | Testing SendinBlue | Brevo",
      textContent: `This is just for testing purpose !!`,
      htmlContent: `<h1>SendinBlue INTEGRATION Testing !!</h1>
          <form >
          <input type="text" placeholder="name"><br><br>
          <input type="number" placeholder="phone number"><br><br>
          <input type="email" placeholder="email"><br><br>
          <button type="submit">Submit</button>
        </form>`,
    });
    op.uuid = uuidv4();
    const test = validate(op.uuid);
    console.log("TEST",test);
    console.log("OP",op);
  } catch (err) {
    console.log(err);
  }
}

////////// ALL EXPORTS ////////////////////////////////////////

exports.postNewPassword = async (req, res, next) => {
  console.log(req.body);
  SendinBlue(req.body.email);

  res.json({ msg: "received" });
};

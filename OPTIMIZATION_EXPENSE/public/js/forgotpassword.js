// const sib = require("sib-api-v3-sdk");

// require("dotenv").config();

// const client = sib.ApiClient.instance;

// const apiKey = client.authentications["api-key"];
// apiKey.apiKey = process.env.SIB_API_KEY;

// const tranEmailApi = new sib.TransactionalEmailsApi();

// const sender = {
//   email: "niraj2835@gmail.com",
//   name: "Cokaine 29",
// };

// async function SendinBlue(receiver) {
//   const receivers = [
//     {
//       email: receiver,
//     },
//   ];
//   try {
//     op = await tranEmailApi.sendTransacEmail({
//       sender,
//       to: receivers,
//       subject: "Password Reset | Testing SendinBlue | Brevo",
//       textContent: `This is just for testing purpose !!`,
//       htmlContent: `<h1>SendinBlue INTEGRATION Testing !!</h1>
//     <form >
//     <input type="text" placeholder="name"><br><br>
//     <input type="number" placeholder="phone number"><br><br>
//     <input type="email" placeholder="email"><br><br>
//     <button type="submit">Submit</button>
//   </form>`,
//     });
//     console.log(op);
//   } catch (err) {
//     console.log(err);
//   }
// }

function setPassword(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  const confirm = event.target.confirm.value;

  // SendinBlue(email);
  if (password !== confirm) {
    return alert("Passwords not matching !!");
  }
  obj = {
    email: email,
    password: password,
  };
  axios
    .post("http://localhost:5000/password/forgotpassword", obj)
    .then((op) => {
      console.log(op);
    })
    .catch();
}

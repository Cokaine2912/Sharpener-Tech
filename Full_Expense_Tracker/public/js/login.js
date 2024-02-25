function Login(event) {
  event.preventDefault();
  obj = {
    email: event.target.email.value,
    password: event.target.password.value,
  };
  axios
    .post("http://localhost:5000/user/login", obj)
    .then((op) => {
      console.log(op.data);
      let token = op.data.token;
      if (op.data.success) {
        localStorage.setItem("token", token);
        window.location.href = "./expense.html";
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      alert(err.response.data.error);
    });
}

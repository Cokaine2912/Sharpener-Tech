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
      if (op.data.success){
        window.location.href = "./expense.html";
      }
    })
    .catch((err) => {
      
      console.log(err.response.data);
      alert(err.response.data.error)
    });
}

function signupForm(event) {
  event.preventDefault();
  
  const obj = {
    username: event.target.username.value,
    email: event.target.email.value,
    password: event.target.password.value,
  };
  axios
    .post("http://localhost:3000/user/signup", obj)
    .then((op) => {
      console.log(op);
    })
    .catch((err) => {
      console.log(err);
    });
}

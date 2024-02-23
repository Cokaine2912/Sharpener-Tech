function signupForm(event) {
  event.preventDefault();

  const obj = {
    username: event.target.username.value,
    email: event.target.email.value,
    password: event.target.password.value,
  };
  axios
    .post("http://localhost:5000/user/signup", obj)
    .then((op) => {
      // console.log(op.data);
      if (op.data.error) {
        const fields = document.getElementsByClassName("ip-fields");

        for (let i = 0; i < fields.length; i++) {
          fields[i].value = "";
        }

        alert(op.data.error);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

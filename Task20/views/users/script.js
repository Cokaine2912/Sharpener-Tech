function handleFormSubmit(event) {
  event.preventDefault();

  const username = event.target.username.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;

  const user_obj = { Username: username, Email: email, Phone: phone };

  const user_obj_JSON = JSON.stringify(user_obj);

  axios
    .post("localhost:5000/post-form", user_obj_JSON)
    .then((result) => {
      console.log(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

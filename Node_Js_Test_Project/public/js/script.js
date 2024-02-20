function handlePosting(event) {
  event.preventDefault();
  console.log("Form Submitted");
  const obj = {
    company: event.target.company.value,
    pros: event.target.pros.value,
    cons: event.target.cons.value,
    rating: event.target.rating.value,
  };
  console.log(obj);
  axios
    .post("http://localhost:5000/add-review", obj)
    .then((op) => {
      console.log(op);
      console.log("posted the review to the backend");
    })
    .catch((err) => {
      console.log(err);
    });
}
function handleFind(event) {
  event.preventDefault();
  let total = 0;

  const display_div = document.getElementById("display");

  const bytagname = document.querySelectorAll("li");
  // console.log("by tag name", bytagname);
  bytagname.forEach((li) => {
    li.remove();
  });

  const obj = {
    findname: event.target.findname.value,
  };
  axios
    .post("http://localhost:5000/find-review", obj)
    .then((op) => {
      // console.log(op.data);

      for (let i = 0; i < op.data.length; i++) {
        // console.log(op.data[i]);
        total = total + op.data[i].rating;
        display(op.data[i]);
      }
      // console.log(total);
      const avg_rating = document.createTextNode(
        `Avg Rating :${total / op.data.length}`
      );
      display_div.appendChild(avg_rating);
    })
    .catch((err) => {
      console.log(err);
    });
}

function display(obj) {
  const ul = document.getElementById("display-review");

  const li = document.createElement("li");
  li.id = "review-list";
  li.className = "items";
  const li_text = document.createTextNode(
    `Comapny Name :${obj.company} | Pros :${obj.pros} | Cons :${obj.cons} | Rating :${obj.rating}`
  );
  li.appendChild(li_text);
  ul.appendChild(li);
}

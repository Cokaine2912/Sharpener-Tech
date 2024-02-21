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
  const temp = document.getElementById("avg-check-id");
  const temp_name = document.getElementById("h4-company-name");
  if (temp) {
    temp.remove();
    temp_name.remove();
  }
  let total = 0;

  const display_div = document.getElementById("display");
  const avg_display_div = document.createElement("div");
  avg_display_div.id = "avg-check-id";
  const bytagname = document.querySelectorAll("li");

  bytagname.forEach((li) => {
    li.remove();
  });

  const obj = {
    findname: event.target.findname.value,
  };

  const company_name_div = document.getElementById("display-company-name");

  const company_name = document.createTextNode(`Company : ${obj.findname}`);

  const h4_company = document.createElement("h4");
  h4_company.id = "h4-company-name";
  h4_company.appendChild(company_name);
  company_name_div.appendChild(h4_company);

  axios
    .post("http://localhost:5000/find-review", obj)
    .then((op) => {
      for (let i = 0; i < op.data.length; i++) {
        // console.log(op.data[i]);
        total = total + op.data[i].rating;
        display(op.data[i]);
      }
      // console.log(total);
      let avg_roundoff = total / op.data.length;
      avg_roundoff = avg_roundoff.toPrecision(3);
      const avg_rating = document.createTextNode(
        `Avg Rating :${avg_roundoff}`
      );

      avg_display_div.appendChild(avg_rating);
      company_name_div.appendChild(avg_display_div);
    })
    .catch((err) => {
      console.log(err);
    });
}

function display(obj) {
  const ul = document.getElementById("display-review");

  const li = document.createElement("li");
  const hr = document.createElement("hr");
  li.id = "review-list";
  li.className = "items";
  const stars = "⭐".repeat(obj.rating);

  const prosTextNode = document.createTextNode(`Pros: ${obj.pros}`);
  const consTextNode = document.createTextNode(`Cons: ${obj.cons}`);
  const ratingTextNode = document.createTextNode(`Rating: ${stars}`);

  li.appendChild(prosTextNode);
  li.appendChild(document.createElement("br"));
  li.appendChild(consTextNode);
  li.appendChild(document.createElement("br"));
  li.appendChild(ratingTextNode);

  li.appendChild(hr);
  ul.appendChild(li);
}

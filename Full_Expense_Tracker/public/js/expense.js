async function ONLOAD() {
  const all = await axios.get("http://localhost:5000/expense/allexpensedata");

  for (let i = 0; i < all.data.length; i++) {
    DISPLAY(all.data[i]);
  }
}
ONLOAD();

function DISPLAY(obj) {
  const ul = document.getElementById("expense-list");
  const li = document.createElement("li");
  li.className = "list-item";
  const li_text = document.createTextNode(
    `${obj.amount} - ${obj.description} - ${obj.category}`
  );
  li.id = obj.id;
  li.appendChild(li_text);
  ul.appendChild(li);

  const db = document.createElement("button");
  const db_text = document.createTextNode("❌");
  db.className = "db";
  db.appendChild(db_text);
  li.appendChild(db);
}

function ADDEXPENSE(event) {
  event.preventDefault();
  obj = {
    amount: event.target.amount.value,
    description: event.target.description.value,
    category: event.target.category.value,
  };
  axios
    .post("http://localhost:5000/expense/addexpense", obj)
    .then((op) => {
      DISPLAY(op.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

const ExpenseList = document.getElementById("expense-list");

if (ExpenseList) {
  ExpenseList.addEventListener("click", async function (event) {
    if (event.target.classList.contains("db")) {
      const todel = event.target.parentElement;
      await axios.delete(`http://localhost:5000/expense/deleteexpense/${todel.id}`)
      ExpenseList.removeChild(todel);
    }
  });
}

/// STATUS !

let USERNAME = "USERNAME";

const existing_token = localStorage.getItem("token");

//////////// FUCNTIONS ////////////////////////////////////

function populateTable(res) {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";
  res.forEach((item) => {
    // Create a new row
    const row = document.createElement("tr");

    // Create cells for each property
    const dateCell = document.createElement("td");
    dateCell.textContent = new Date(item.createdAt).toLocaleString(); // Format the date as per your requirement

    const fileURLCell = document.createElement("td");
    const link = document.createElement("a");
    link.href = item.fileURL;
    link.textContent = "Download";
    fileURLCell.appendChild(link);

    // Append cells to the row
    row.appendChild(dateCell);
    row.appendChild(fileURLCell);

    // Append row to the table body
    tableBody.appendChild(row);
  });
}

async function PAGEITEMS(event) {
  event.preventDefault();
  const button_id = event.target.id;
  let page = button_id.split("-")[1];
  let ipp = localStorage.getItem("ipp");

  if (!ipp) {
    ipp = 10;
  } else {
    ipp = +ipp;
  }
  // const ipp = document.getElementById("ipp-select");
  const response = await axios.get(
    `http://localhost:5000/expense/alldownloads/${page}`,
    { headers: { Authorization: existing_token, ipp: ipp } }
  );
  const data = response.data.data;

  populateTable(data);
}
////////////////////////////////////////////////////////////

if (!existing_token) {
  window.location.href = "./login.html";
} else {
  //// some inside functions

  function ippSET(event) {
    event.preventDefault();
    let ipp = document.getElementById("ipp-select");
    if (!ipp) {
      return alert("Select Rows per page !");
    }
    localStorage.setItem("ipp", ipp.value);
    ONLOAD();
  }

  function premiumCheck() {
    return new Promise(async (resolve, reject) => {
      try {
        const token = localStorage.getItem("token");
        const bool = await axios.get(
          "http://localhost:5000/expense/premiumness",
          {
            headers: { Authorization: token },
          }
        );
        if (bool.premium) {
          garibsePremium();
        }
        resolve(bool);
      } catch (err) {
        reject(err);
      }
    });
  }

  async function ONLOAD() {
    const bool = await premiumCheck();
    USERNAME = bool.data.username;

    const username_button = document.getElementById("username-dropdown");
    const username_button_text = document.createTextNode(USERNAME);
    username_button.appendChild(username_button_text);
    if (bool.data.premium) {
      garibsePremium();
    }
    const token = localStorage.getItem("token");
    let ipp = localStorage.getItem("ipp");
    if (!ipp) {
      ipp = 10;
    } else {
      ipp = +ipp;
    }
    const response = await axios.get(
      "http://localhost:5000/expense/alldownloads/1",
      { headers: { Authorization: token , ipp: ipp} }
    );
    const data = response.data.data;
    const total = response.data.total;

    const buttons = Math.ceil(total / ipp);
    const button_div = document.getElementById("page-button-div");
    button_div.innerHTML = "";
    for (let i = 1; i <= buttons; i++) {
      const html = `<button class="btn btn-outline-primary" id = "page-${i}-button" onclick="PAGEITEMS(event)">${i}</button>`;
      button_div.innerHTML += html;
    }
    populateTable(data);
  }
  ONLOAD();

  function garibsePremium() {
    const rzp_button = document.getElementById("rzp-button");
    if (rzp_button) {
      rzp_button.remove();
    }

    const if_premium = document.getElementById("if-premium");
    if_premium.logo = "premium-logo";
    const premium_text = document.createTextNode("Premium");
    if_premium.appendChild(premium_text);
  }

  const rzp_button = document.getElementById("rzp-button");

  if (rzp_button) {
    rzp_button.onclick = async function (event) {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/purchase/premium",
        {
          headers: { Authorization: token },
        }
      );
      var options = {
        key: response.data.key_id,
        order_id: response.data.order.id,
        handler: async function (response) {
          const update_response = await axios.post(
            "http://localhost:5000/purchase/premium/updatetransactionstatus",
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            },
            { headers: { Authorization: token } }
          );
          localStorage.setItem("token", update_response.data.token);
          alert("You are a Premium User !!");
          garibsePremium();
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
      event.preventDefault();

      rzp1.on("payment.failed", async function (response) {
        await axios.post(
          "http://localhost:5000/purchase/premium/updatefailure",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
            order_success: false,
          },
          { headers: { Authorization: token } }
        );
        alert("Something Went Wrong !");
      });
    };
  }
}

// TEMPORARY

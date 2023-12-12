//root/client/pages/create.html

document.getElementById("create").addEventListener("click", function () {
    if (
      document.getElementById("username").value !== "" &&
      document.getElementById("password").value !== "" &&
      document.getElementById("firstname").value !== "" &&
      document.getElementById("lastname").value !== "" &&
      document.getElementById("email").value !== ""
    ) {
      let firstname = document.getElementById("firstname").value;
      let lastname = document.getElementById("lastname").value;
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let email = document.getElementById("email").value;
      
      // Send variablerne til serveren
      fetch("/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
          email: email
        }),
      }) // Sender brugeren til login siden eller giver en fejl
        .then((response) => {
          if (response.ok) {
            console.log(response.status);
            window.location.href = "/users/login";
          } else {
            console.log(response.status);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Du skal udfylde alle felter");
    }
  });
  


//root/client/pages/create.html
document.getElementById("create").addEventListener("click", function () {
    if (
      document.getElementById("username").value !== "" &&
      document.getElementById("password").value !== "" &&
      document.getElementById("firstname").value !== "" &&
      document.getElementById("lastname").value !== "" &&
      document.getElementById("country").value !== "" &&
      document.getElementById("age").value !== "" &&
      document.getElementById("email").value !== "" &&
      document.getElementById("gender").value !== "" &&
      document.getElementById("streetname").value !== "" &&
      document.getElementById("streetnumber").value !== "" &&
      document.getElementById("postalcode").value !== "" &&
      document.getElementById("city").value !== ""
    ) {
      let firstname = document.getElementById("firstname").value;
      let lastname = document.getElementById("lastname").value;
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;
      let country = document.getElementById("country").value;
      let age = document.getElementById("age").value;
      let email = document.getElementById("email").value;
      let gender = document.getElementById("gender").value;
      let street_name = document.getElementById("streetname").value;
      let street_number = document.getElementById("streetnumber").value;
      let postal_code = document.getElementById("postalcode").value;
      let city = document.getElementById("city").value;
      
  
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
          country: country,
          age: age,
          email: email,
          gender: gender,
          street_name: street_name,
          street_number: street_number,
          postal_code: postal_code,
          city: city
        }),
      })
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
  


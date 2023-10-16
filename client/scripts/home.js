function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = {
    username,
    password,
  };

  axios
    .post("http://164.90.228.42:3000/customer/login", user)
    .then(function (response) {
      location.href = "/store";
    })
    .catch(function (error) {
      console.log(error);
    });
}
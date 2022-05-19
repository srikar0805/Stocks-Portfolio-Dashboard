function showPassword() {
  let x = document.getElementById("validationCustom02");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

(function () {
  "use strict";
  let forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

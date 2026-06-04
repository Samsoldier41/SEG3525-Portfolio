const form = document.getElementById("bookingForm");
const confirmation = document.getElementById("confirmation");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const service = document.getElementById("service").value;
  const barber = document.getElementById("barber").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  if (name === "" || service === "" || barber === "" || date === "" || time === "") {
    errorMessage.classList.remove("d-none");
    confirmation.classList.add("d-none");
    return;
  }

  errorMessage.classList.add("d-none");

  confirmation.innerHTML = `
    Merci ${name}. Votre rendez-vous pour <strong>${service}</strong>
    avec <strong>${barber}</strong> est confirmé pour le
    <strong>${date}</strong> à <strong>${time}</strong>.
  `;

  confirmation.classList.remove("d-none");
  form.reset();
});

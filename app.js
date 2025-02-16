document.addEventListener("DOMContentLoaded", () => {
  const rsvpForm = document.getElementById("rsvpForm");
  const guestNumberDiv = document.getElementById("guestNumberDiv");
  const messageEl = document.getElementById("message");

  // Toggle the guest number field based on the selected attendance option
  const attendingRadios = document.getElementsByName("attending");
  attendingRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "Ναι" && radio.checked) {
        guestNumberDiv.style.display = "block";
      } else if (radio.value === "Όχι" && radio.checked) {
        guestNumberDiv.style.display = "none";
      }
    });
  });

  // When the form is submitted
  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    // Gather form data
    const firstName = document.getElementById("firstName").value;
    const surname = document.getElementById("surname").value;
    const attending = document.querySelector('input[name="attending"]:checked').value;
    const numberOfGuests = (attending === "Ναι") ? document.getElementById("numberOfGuests").value : "";

    // Show a confirmation message based on the answer
    if (attending === "Ναι") {
      messageEl.textContent = "Ευχαριστούμε πολύ που θα έρθεις! Ανυπομονούμε να σε δούμε!";
    } else {
      messageEl.textContent = "Λυπούμαστε που δεν μπορείς να έρθεις. Σε ευχαριστούμε για το ενδιαφέρον!";
    }

    // Prepare the data to be sent to your Google Spreadsheet
    const data = { firstName, surname, attending, numberOfGuests };

    // (Replace with your actual Google Apps Script URL when ready)
    const scriptURL = "https://script.google.com/macros/s/AKfycbwT09B_Ba8XPqAVx3tQCmbxbFdldTpQ4u9obXfYISrXQtSU3_BVf4TvM4_KcuAJ1G2j/exec";

    // Send the data
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      console.log("Η αποστολή ολοκληρώθηκε με επιτυχία.");
    })
    .catch(error => {
      console.error("Σφάλμα κατά την αποστολή της φόρμας:", error);
    });

    // Optionally reset the form after submission
    rsvpForm.reset();
    guestNumberDiv.style.display = "none";
  });
});

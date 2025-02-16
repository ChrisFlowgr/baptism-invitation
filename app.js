// Wait until the webpage has loaded
document.addEventListener("DOMContentLoaded", () => {
  const rsvpForm = document.getElementById("rsvpForm");
  const guestNumberDiv = document.getElementById("guestNumberDiv");
  const messageEl = document.getElementById("message");

  // Show or hide the "Number of Guests" field based on the answer
  const attendingRadios = document.getElementsByName("attending");
  attendingRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "Yes" && radio.checked) {
        guestNumberDiv.style.display = "block";
      } else if (radio.value === "No" && radio.checked) {
        guestNumberDiv.style.display = "none";
      }
    });
  });

  // When the form is submitted
  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the page from refreshing

    // Get the data from the form
    const firstName = document.getElementById("firstName").value;
    const surname = document.getElementById("surname").value;
    const attending = document.querySelector('input[name="attending"]:checked').value;
    const numberOfGuests = (attending === "Yes") ? document.getElementById("numberOfGuests").value : "";

    // Show a confirmation message based on the answer
    if (attending === "Yes") {
      messageEl.textContent = "Thank you for confirming your attendance!";
    } else {
      messageEl.textContent = "We’re sorry you can’t make it.";
    }

    // Prepare the data to be sent to your Google Spreadsheet
    const data = { firstName, surname, attending, numberOfGuests };

    // (Later you will replace this with your actual Google Apps Script URL)
    const scriptURL = "https://script.google.com/macros/s/AKfycbwT09B_Ba8XPqAVx3tQCmbxbFdldTpQ4u9obXfYISrXQtSU3_BVf4TvM4_KcuAJ1G2j/exec";

    // Send the data (don’t worry if this seems technical—the copy-paste does the work)
    fetch(scriptURL, {
      method: "POST",
      mode: "no-cors", // This setting is simple for now
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      console.log("Submission sent successfully.");
    })
    .catch(error => {
      console.error("Error submitting the form:", error);
    });

    // Optionally reset the form after submission
    rsvpForm.reset();
    guestNumberDiv.style.display = "none";
  });
});

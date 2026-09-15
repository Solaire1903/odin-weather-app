const locationForm = document.querySelector("form");
const locationInput = document.getElementById("location-input");

/**
 * Binds an event listener to the form
 * @param {function} handleUserInput The function that handles the user input
 */
const bindFormListener = (handleUserInput) => {
  locationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    handleUserInput(locationInput.value);
  });
};

export { bindFormListener };

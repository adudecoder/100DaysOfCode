// Selecting DOM elements
const wrapper = document.querySelector(".wrapper");
const form = document.querySelector("form");
const fileInp = document.querySelector("input");
const infoText = document.querySelector("p");
const closeBtn = document.querySelector(".close");
const copyBtn = document.querySelector(".copy");

// Function to make a request to the QR Code scanning API
function fetchRequest(file, formData) {
    infoText.innerText = "Scanning QR Code...";
    // Sending a POST request to the QR Code scanning API
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result => {
        // Extracting the scanned data from the API response
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR Code To Scan" : "Couldn't Scan QR Code";
        if (!result) return;
        // Displaying the scanned data in a textarea and showing the image
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() => {
        infoText.innerText = "Couldn't Scan QR Code...";
    });
}

// Event listener for file input change
fileInp.addEventListener("change", async e => {
    // Get the selected file
    let file = e.target.files[0];
    if (!file) return;
    // Create FormData and send a request to the API
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

// Event listener for copying text to clipboard
copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

// Event listener for triggering file input when clicking on the form
form.addEventListener("click", () => fileInp.click());

// Event listener for closing the wrapper
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));

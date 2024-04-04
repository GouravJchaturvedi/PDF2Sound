const form = document.getElementById('pdf-form');
const responseContainer = document.getElementById('response');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(form); // Create FormData object

    // Simulate backend interaction (replace with actual backend call)
    fetch('http://127.0.0.1:5000/convert', {  // Replace '/convert' with your actual backend route
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            responseContainer.innerHTML = `<p class="error">${data.error}</p>`;
        } else {
            responseContainer.innerHTML = `<p class="success">Conversion completed! Download audio: <a href="${data.download_link}">here</a></p>`;
        }
    })
    .catch(error => {
        console.error(error);
        responseContainer.innerHTML = `<p class="error">An error occurred. Please try again.</p>`;
    });
});

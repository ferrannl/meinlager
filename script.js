const form = document.getElementById('contactForm'); // Form
const successModal = document.getElementById('successModal'); // Modal
const countdownElement = document.getElementById('countdown'); // Countdown

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Show modal
    successModal.classList.remove('hidden');

    // Start countdown
    let countdown = 15;
    countdownElement.textContent = countdown;

    const timer = setInterval(() => {
        countdown--;
        countdownElement.textContent = countdown;

        if (countdown <= 0) {
            clearInterval(timer); // Stop timer
            window.location.href = 'index.html'; // Redirect to home page
        }
    }, 1000);
});

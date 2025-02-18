function habilitarBoton() {
    const botonEnviar = document.getElementById("btnEnviar");
    botonEnviar.style.display = "block";
    botonEnviar.disabled = false;
}


document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".form-contacto");
    const mensajeEstado = document.getElementById("mensaje-estado");

    form.addEventListener("submit", async function(event) {
        event.preventDefault(); // Evita que la página se recargue

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const recaptchaResponse = grecaptcha.getResponse(); // Captura el token de reCAPTCHA

        // Validar que los campos no estén vacíos
        if (!name || !email || !message) {
            mensajeEstado.style.display = "block";
            mensajeEstado.style.color = "red";
            mensajeEstado.textContent = "Todos los campos son obligatorios.";
            grecaptcha.reset(); // Restablecer reCAPTCHA
            return;
        }

        if (!recaptchaResponse) {
            mensajeEstado.style.display = "block";
            mensajeEstado.style.color = "red";
            mensajeEstado.textContent = "Por favor, verifica que no eres un robot.";
            return;
        }

        try {
            const response = await fetch("https://web-backend-q6ff.onrender.com/send-message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message, recaptchaToken: recaptchaResponse })
            });

            const result = await response.json();

            // Mostrar mensaje en la pantalla con el texto del error o éxito
            mensajeEstado.style.display = "block";
            mensajeEstado.style.color = result.success ? "green" : "red";
            mensajeEstado.textContent = result.success || result.error;
            
            grecaptcha.reset(); // Restablecer reCAPTCHA
            
            // Si el mensaje se envió con éxito, limpiar el formulario
            if (result.success) {
                form.reset();
            }

        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            mensajeEstado.style.display = "block";
            mensajeEstado.style.color = "red";
            mensajeEstado.textContent = "Hubo un problema al enviar el mensaje.";
        }
    });
});
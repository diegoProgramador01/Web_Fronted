document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'es',
        initialView: 'dayGridMonth',
        selectable: true,
        editable: false,
        events: 'https://web-backend-q6ff.onrender.com/obtener-citas',

        dateClick: function(info) {
            let titulo = prompt("Ingrese el título de la cita:");
            if (titulo) {
                let nuevaCita = {
                    title: titulo,
                    start: info.dateStr
                };

                fetch("https://web-backend-q6ff.onrender.com/crear-cita", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(nuevaCita)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        alert("Error: " + data.error);
                    } else {
                        alert("Cita guardada correctamente");
                        calendar.refetchEvents(); // Recargar eventos en el calendario
                    }
                })
                .catch(error => console.error("Error al guardar la cita:", error));
            }
        }
    });

    calendar.render();
});

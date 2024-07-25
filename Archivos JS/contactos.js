// Inicializar EmailJS
(function() {
    emailjs.init("2suvhVB4TNJwgZaO8"); 
})();

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm("service_o1ah3xc", "template_x942w3p", this)
            .then(function() {
                alert('Mensaje enviado correctamente');
            }, function(error) {
                alert('Error al enviar el mensaje: ' + JSON.stringify(error));
            });
    });
};

// Inicializar el mapa de Leaflet
var map = L.map('map').setView([-1.590047, -78.996266], 15);

// Cargar y mostrar el mapa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Agregar un marcador
L.marker([-0.1919249, -78.50775779]).addTo(map)
    .bindPopup('INTELIGENCIA ARTIFICIAL')
    .openPopup();

// Función para actualizar fecha y hora
function updateDateTime() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('es-ES');
    document.getElementById('current-datetime').textContent = `${formattedDate}, ${formattedTime}`;
}

setInterval(updateDateTime, 1000); // Actualizar cada segundo
document.addEventListener('DOMContentLoaded', updateDateTime); // Actualizar al cargar la página

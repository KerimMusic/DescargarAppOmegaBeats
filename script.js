// Función para compartir la página
function compartirApp() {
    // Verifica si el navegador del dispositivo soporta la función de compartir nativa
    if (navigator.share) {
        navigator.share({
            title: 'Omega Beats',
            text: '¡Descarga la mejor app de beats!',
            url: window.location.href // Toma la URL actual de la página
        }).then(() => {
            console.log('Compartido con éxito');
        })
        .catch((error) => {
            console.log('Error al compartir', error);
        });
    } else {
        // Si no lo soporta (como en una PC de escritorio), muestra una alerta
        alert("La función de compartir no está soportada en este navegador. Copia el enlace manualmente.");
    }
}
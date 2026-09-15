/* =========================================================
   1) COMPARTIR
   ========================================================= */
function compartirApp() {
    if (navigator.share) {
        navigator.share({
            title: 'Omega Beats',
            text: '¡Descarga la mejor app de beats!',
            url: window.location.href
        })
        .then(() => console.log('Compartido con éxito'))
        .catch((error) => console.log('Error al compartir', error));
    } else {
        alert("La función de compartir no está soportada en este navegador. Copia el enlace manualmente.");
    }
}

/* =========================================================
   2) DETECTAR NAVEGADOR INTERNO
      (Instagram, Facebook, TikTok, Twitter/X, LinkedIn, etc.)
   ========================================================= */
function esNavegadorInterno() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    // Firmas típicas de WebViews / apps sociales
    const firmas = [
        'FBAN', 'FBAV', 'FB_IAB',          // Facebook
        'Instagram',
        'Twitter',
        'Line',
        'Snapchat',
        'Pinterest',
        'LinkedInApp',
        'musical_ly', 'BytedanceWebview', 'TikTok', 'Bytedance', // TikTok
        'MicroMessenger',                  // WeChat
        'WhatsApp',
        'GSA',                             // Google Search App
        'KAKAOTALK',
        'Naver'
    ];

    if (firmas.some(f => ua.indexOf(f) !== -1)) return true;

    // Detección genérica de WebView (Android / iOS)
    const esAndroidWebView = /Android/.test(ua) && /; wv\)/.test(ua);
    const esIOSWebView =
        /iPhone|iPad|iPod/.test(ua) &&
        !/Safari/.test(ua) &&
        !/CriOS/.test(ua) &&
        !/FxiOS/.test(ua);

    return esAndroidWebView || esIOSWebView;
}

/* =========================================================
   3) FORZAR APERTURA EN EL NAVEGADOR EXTERNO
      Acepta una URL externa (por ejemplo, el APK) o usa la actual
   ========================================================= */
function abrirEnNavegador(urlExterna) {
    const url = urlExterna || window.location.href;
    const ua  = navigator.userAgent || navigator.vendor || window.opera;
    const esAndroid = /Android/i.test(ua);
    const esiOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

    if (esAndroid) {
        // Fuerza Chrome específicamente + fallback al navegador por defecto
        const sinProtocolo = url.replace(/^https?:\/\//, '');
        window.location.href =
            'intent://' + sinProtocolo + '#Intent;' +
            'scheme=https;' +
            'package=com.android.chrome;' +
            'S.browser_fallback_url=' + encodeURIComponent(url) + ';end';
    } else if (esiOS) {
        // iOS: intenta abrir Safari fuera del WebView
        const sinProtocolo = url.replace(/^https?:\/\//, '');
        window.location.href = 'x-safari-https://' + sinProtocolo;

        // Fallback por si x-safari no está disponible
        setTimeout(() => {
            window.open(url, '_blank');
        }, 800);
    } else {
        window.open(url, '_blank');
    }
}

/* =========================================================
   4) AL CARGAR LA PÁGINA:
      - Mostrar el aviso si estamos en un navegador interno
      - Interceptar el botón Descargar para abrir el APK
        en el navegador externo (Chrome / Safari)
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const notice      = document.getElementById('browser-notice');
    const downloadBtn = document.querySelector('.download-btn');

    if (esNavegadorInterno()) {

        /* --- 4.1) Mostrar aviso arriba --- */
        if (notice) {
            notice.classList.add('show');
            document.body.classList.add('has-notice');
        }

        /* --- 4.2) CLAVE: interceptar el botón Descargar ---
           Dentro de un WebView (Instagram, FB, TikTok…) las descargas
           de APK están bloqueadas. Así que en vez de dejar que el
           navegador interno intente descargar, abrimos el APK en el
           navegador externo (Chrome / Safari). */
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                // Le pasamos la URL del APK (el href del propio botón)
                abrirEnNavegador(downloadBtn.href);
            });
        }
    }
});

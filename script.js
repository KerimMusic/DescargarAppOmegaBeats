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
   2) DETECTAR SI ESTAMOS DENTRO DE UN NAVEGADOR INTERNO
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
   ========================================================= */
function abrirEnNavegador() {
    const url = window.location.href;
    const ua  = navigator.userAgent || navigator.vendor || window.opera;
    const esAndroid = /Android/i.test(ua);
    const esiOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

    if (esAndroid) {
        // Intenta abrir con Chrome; si no está, el sistema ofrece opciones
        const sinProtocolo = url.replace(/^https?:\/\//, '');
        window.location.href =
            `intent://${sinProtocolo}#Intent;scheme=https;` +
            `S.browser_fallback_url=${encodeURIComponent(url)};end`;
    } else if (esiOS) {
        // iOS: intentar abrir Safari desde el WebView
        // (funciona en muchos casos; si no, el usuario deberá usar el menú "..." de la app)
        const sinProtocolo = url.replace(/^https?:\/\//, '');
        window.location.href = `x-safari-https://${sinProtocolo}`;

        // Fallback por si x-safari no está disponible
        setTimeout(() => {
            window.open(url, '_blank');
        }, 800);
    } else {
        window.open(url, '_blank');
    }
}

/* =========================================================
   4) MOSTRAR EL AVISO AL CARGAR LA PÁGINA
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    if (esNavegadorInterno()) {
        const notice = document.getElementById('browser-notice');
        if (notice) {
            notice.classList.add('show');

            // Ajusta el padding superior del body para que el aviso no tape el logo
            document.body.style.paddingTop = notice.offsetHeight + 'px';
        }
    }
});

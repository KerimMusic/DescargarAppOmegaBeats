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
   ========================================================= */
function esNavegadorInterno() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    const firmas = [
        'FBAN', 'FBAV', 'FB_IAB',
        'Instagram',
        'Twitter',
        'Line',
        'Snapchat',
        'Pinterest',
        'LinkedInApp',
        'musical_ly', 'BytedanceWebview', 'TikTok', 'Bytedance',
        'MicroMessenger',
        'WhatsApp',
        'GSA',
        'KAKAOTALK',
        'Naver'
    ];

    if (firmas.some(f => ua.indexOf(f) !== -1)) return true;

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
      - Android: intent:// genérico (respeta navegador por defecto)
                 + fallback a Chrome + navegación directa
      - iOS:     Chrome iOS -> Safari -> window.open
   ========================================================= */
function abrirEnNavegador(urlExterna) {
    const url = urlExterna || window.location.href;
    const ua  = navigator.userAgent || navigator.vendor || window.opera;
    const esAndroid = /Android/i.test(ua);
    const esiOS     = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;

    // Normalizamos la URL (por si viene sin protocolo)
    const urlCompleta  = /^https?:\/\//i.test(url) ? url : 'https://' + url;
    const scheme       = urlCompleta.startsWith('http://') ? 'http' : 'https';
    const sinProtocolo = urlCompleta.replace(/^https?:\/\//i, '');
    const encoded      = encodeURIComponent(urlCompleta);

    if (esAndroid) {
        // 1) Intent GENÉRICO -> Android elige el navegador por defecto
        const intentGenerico =
            'intent://' + sinProtocolo + '#Intent;' +
            'scheme=' + scheme + ';' +
            'action=android.intent.action.VIEW;' +
            'category=android.intent.category.BROWSABLE;' +
            'S.browser_fallback_url=' + encoded + ';' +
            'end';

        // 2) Intent específico a Chrome (fallback)
        const intentChrome =
            'intent://' + sinProtocolo + '#Intent;' +
            'scheme=' + scheme + ';' +
            'package=com.android.chrome;' +
            'S.browser_fallback_url=' + encoded + ';' +
            'end';

        try { window.location.href = intentGenerico; } catch (e) {}

        // Si tras 1.2s la página sigue visible, intentamos Chrome
        setTimeout(() => {
            if (!document.hidden) {
                try { window.location.href = intentChrome; } catch (e) {}
            }
        }, 1200);

        // Último recurso: navegar directo
        setTimeout(() => {
            if (!document.hidden) {
                window.location.href = urlCompleta;
            }
        }, 2500);

    } else if (esiOS) {
        // 1) Chrome iOS
        try { window.location.href = 'googlechrome://' + sinProtocolo; } catch (e) {}

        // 2) Safari
        setTimeout(() => {
            if (!document.hidden) {
                try { window.location.href = 'x-safari-' + scheme + '://' + sinProtocolo; } catch (e) {}
            }
        }, 700);

        // 3) Último recurso
        setTimeout(() => {
            if (!document.hidden) {
                window.open(urlCompleta, '_blank', 'noopener');
            }
        }, 1600);

    } else {
        window.open(urlCompleta, '_blank', 'noopener');
    }
}

/* =========================================================
   4) AL CARGAR LA PÁGINA
   ========================================================= */
document.addEventListener('DOMContentLoaded', function () {
    const notice      = document.getElementById('browser-notice');
    const noticeBtn   = document.getElementById('notice-btn');
    const downloadBtn = document.querySelector('.download-btn');

    if (esNavegadorInterno()) {

        // 4.1) Mostrar aviso
        if (notice) {
            notice.classList.add('show');
            document.body.classList.add('has-notice');
        }

        // 4.2) Botón del aviso -> abre LA LANDING en el navegador externo
        if (noticeBtn) {
            noticeBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                abrirEnNavegador(window.location.href);
            });
        }

        // 4.3) Botón Descargar -> abre EL APK en el navegador externo
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                abrirEnNavegador(downloadBtn.href);
            });
        }
    }
});

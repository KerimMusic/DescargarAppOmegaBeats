/* =========================================================
   Reset y base
   ========================================================= */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background-color: #000000;
    color: #ffffff;
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
    transition: padding-top 0.3s ease;
}

/* Cuando el aviso está visible, empujamos el contenido */
body.has-notice {
    padding-top: 70px;
}

/* =========================================================
   Contenedor principal
   ========================================================= */
.container {
    width: 100%;
    max-width: 400px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 60px 20px;
}

body.has-notice .container {
    height: calc(100vh - 70px);
    padding-top: 20px;
}

/* =========================================================
   Logo
   ========================================================= */
.logo-section {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.logo-section img {
    width: 85%;
    max-width: 300px;
    object-fit: contain;
}

/* =========================================================
   Botón de descarga
   ========================================================= */
.download-btn {
    background-color: #ff0000;
    color: #ffffff;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 15px 50px;
    border-radius: 50px;
    transition: transform 0.2s, background-color 0.2s;
    display: inline-block;
    text-align: center;
    margin: auto 0;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

.download-btn:active {
    transform: scale(0.95);
    background-color: #cc0000;
}

/* =========================================================
   Sección Compartir
   ========================================================= */
.share-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
}

.share-section p {
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 20px;
}

.share-btn {
    background-color: #ff4d4d;
    border: none;
    border-radius: 50%;
    width: 65px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s;
    -webkit-tap-highlight-color: transparent;
}

.share-btn:active {
    transform: scale(0.9);
}

.share-btn svg {
    width: 30px;
    height: 30px;
    fill: none;
    stroke: #ffffff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}

/* =========================================================
   AVISO DE NAVEGADOR INTERNO
   ========================================================= */
.browser-notice {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    background: linear-gradient(90deg, #ff0000, #cc0000);
    color: #ffffff;
    padding: 12px 14px;
    align-items: center;
    gap: 10px;
    box-shadow: 0 4px 15px rgba(255, 0, 0, 0.5);
    animation: slideDown 0.4s ease-out;
}

.browser-notice.show {
    display: flex;
}

.browser-notice .bn-icon {
    font-size: 1.3rem;
    flex-shrink: 0;
}

.browser-notice p {
    font-size: 0.82rem;
    line-height: 1.25;
    margin: 0;
    flex: 1;
}

.browser-notice button {
    background: #ffffff;
    color: #cc0000;
    border: none;
    padding: 9px 16px;
    border-radius: 50px;
    font-weight: bold;
    font-size: 0.82rem;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.15s;
    flex-shrink: 0;
}

.browser-notice button:active {
    transform: scale(0.94);
}

@keyframes slideDown {
    from { transform: translateY(-100%); opacity: 0; }
    to   { transform: translateY(0);     opacity: 1; }
}

/**
 * static class
 * segédfüggvények hiba és sikeres művelet visszajelzésére
 * hibaüzenet - képernyő közepén megjelenik egy piros hátterű négyzet, rajta egy gombbal, amivel bezárható, a háttér szürke és nem kattintható
 * sikeres művelet - képernyő jobb alsó sarkában zöld háttérrel üzenet, 3 mp után eltűnik
 */
class AlertPopup {
    static timeout

    /**
     * eseménykezelő hozzáadása alert nyugtázó gombhoz
     * hibaablak eltüntetése
     */
    static init() {
        document.getElementById('alertAckButton').addEventListener('click', () => {
            document.getElementById('alertPopupContainer').style.display = "none";
        })
    }

    /**
     * hibaablak megjelenítése és szöveg kiírása
     * @param message {string} - megjelenítendő hibaüzenet
     */
    static showAlert(message) {
        document.getElementById('alertMessage').innerHTML = "<p>HIBA!</p>" + message
        document.getElementById('alertPopupContainer').style.display = "initial";
        document.getElementById('alertAckButton').focus()
    }

    /**
     * sikeres művelet visszajelző üzenet megjelenítése
     * timer indítása - 3 mp után eltűnik az üzenet
     * @param message {string|null} - megjelenítendő szöveg
     */
    static showSuccess(message = null) {
        clearTimeout(this.timeout)
        document.getElementById('successPopup').style.display = "initial";
        if (message !== null)
            document.getElementById('successMessage').innerHTML = message
        this.timeout = setTimeout(() => {
            document.getElementById('successPopup').style.display = "none";
            document.getElementById('successMessage').innerHTML = ''
        }, 3000)
    }
}

AlertPopup.init();

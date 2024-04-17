/**
 * static class
 * segédfüggvények hiba és sikeres művelet visszajelzésére
 * hibaüzenet - képernyő közepén megjelenik egy piros hátterű négyzet, rajta egy gombbal, amivel bezárható, a háttér szürke és nem kattintható
 * sikeres művelet - képernyő jobb alsó sarkában zöld háttérrel üzenet, 3 mp után eltűnik
 */
class AlertPopup {
    _timeout
    _view

    /**
     * eseménykezelő hozzáadása alert nyugtázó gombhoz
     * hibaablak eltüntetése
     */
    constructor() {
        this._view = new AlertPopupView()
    }

    /**
     * hibaablak megjelenítése és szöveg kiírása
     * @param message {string} - megjelenítendő hibaüzenet
     */
    showAlert(message) {
       this._view.showAlert(message)
    }

    /**
     * sikeres művelet visszajelző üzenet megjelenítése
     * timer indítása - 3 mp után eltűnik az üzenet
     * @param message {string|null} - megjelenítendő szöveg
     */
    showSuccess(message = null) {
        clearTimeout(this.timeout)
        this._view.showSuccess(message)
        this.timeout = setTimeout(() => {
           this._view.hideSuccess()
        }, 3000)
    }
}



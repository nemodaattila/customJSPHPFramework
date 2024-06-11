/**
 * static class,
 * class for displaying error(alert) and success messages
 * error messages are displayed in the middle of the screen, a rectangle appears with a red background,
 * with a acknowledgment button (label: OK), everything else becomes greyish, and cannot be clicked,
 * success messages are displayed in the bottom right of the screen (green rectangle), it disappears after 3 seconds
 */
class AlertPopup {
    /**
     * {number | undefined} timeout for success message disappearance
     * @private
     */
    _timeout
    _view

    constructor() {
        this._view = new AlertPopupView()
    }

    /**
     * displays error rectangle and message -> calls view
     * @param errorMessage {string} - error message to be displayed
     */
    showAlertMessage(errorMessage) {
        this._view.showAlertMessage(errorMessage)
    }

    /**
     * displays success rectangle and message, hides it after 3 seconds (timout) -> calls view
     * @param message {string|null} success message
     */
    showSuccess(message = null) {
        clearTimeout(this._timeout)
        this._view.showSuccessMessage(message)
        this._timeout = setTimeout(() => {
            this._view.hideSuccessMessage()
        }, 3000)
    }
}



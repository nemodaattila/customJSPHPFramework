//Connector class for Messenger classes : for alert and success messages
class Messenger {
    static _messageObject = undefined

    /**
     * save selected Messenger class
     * @param object
     */
    static setObject(object) {
        this._messageObject = object
    }

    /**
     * calls messenger class's showAlert function, alert() if not set
     * @param message
     */
    static showAlert(message) {
        !this._messageObject ? alert(message) : this._messageObject.showAlertMessage(message)
    }

    /**
     * calls messenger class's showSuccess function, alert() if not set
     * @param message
     */
    static showSuccess(message) {
        !this._messageObject ? alert(message) : this._messageObject.showSuccessMessage(message)
    }
}

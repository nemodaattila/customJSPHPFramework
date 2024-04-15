//Connector
class Messenger {
    _messageObject = undefined

    showAlert(message) {
        if (this._messageObject === undefined) {
            alert(message)
        } else this._messageObject.showAlert(message)
    }

    showSuccess(message) {
        if (this._messageObject === undefined) {
            alert(message)
        } else this._messageObject.showSuccess(message)
    }
}

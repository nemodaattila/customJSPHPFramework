//Connector
class Messenger {
    static _messageObject = undefined

    static setObject(object) {
        this._messageObject = object
    }

    static showAlert(message) {
        !this._messageObject?            alert(message):        this._messageObject.showAlert(message)
    }

    static showSuccess(message) {
        !this._messageObject?            alert(message):this._messageObject.showSuccess(message)
    }
}

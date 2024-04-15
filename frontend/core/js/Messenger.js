//Connector
class Messenger {
   static _messageObject = undefined

    static setObject(object)
    {
        this._messageObject =  object
    }


    static showAlert(message) {
        if (this._messageObject === undefined) {
            alert(message)
        } else this._messageObject.showAlert(message)
    }

    static showSuccess(message) {
        if (this._messageObject === undefined) {
            alert(message)
        } else this._messageObject.showSuccess(message)
    }
}

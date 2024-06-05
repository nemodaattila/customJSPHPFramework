class AlertPopupView {
    _alertContainer;
    _alertMessageContainer
    _successContainer;
    _successMessageContainer
    _alertButton

    constructor() {
        this._alertContainer = HtmlElementCreator.createSimpleHtmlElement('div', document.getElementsByTagName('body')[0], {id: "alertContainer"})
        const container = HtmlElementCreator.createSimpleHtmlElement('div', this._alertContainer)
        this._alertMessageContainer = HtmlElementCreator.createSimpleHtmlElement('div', container);
        this._alertButton = HtmlElementCreator.createNestedHtmlElement(['div', 'input'], container, {
            type: 'button',
            value: 'OK'
        })
        this._alertButton.addEventListener('click', () => this._alertContainer.style.display = "none")
        this._successContainer = HtmlElementCreator.createSimpleHtmlElement('div', document.getElementsByTagName('body')[0], {id: "successContainer"})
        HtmlElementCreator.createSimpleHtmlElement('p', this._successContainer, {innerText: 'Operation successful'})
        this._successMessageContainer = HtmlElementCreator.createSimpleHtmlElement('p', this._successContainer)
    }

    showAlert(message) {
        this._alertMessageContainer.innerHTML = "<p>ERROR!</p>" + message
        this._alertContainer.style.display = "initial";
        this._alertButton.focus()
    }

    showSuccess(message) {
        this._successContainer.style.display = "initial";
            this._successMessageContainer.innerHTML = message
    }

    hideSuccess() {
        this._successContainer.style.display = "none";
        this._successMessageContainer.innerHTML = ''
    }
}

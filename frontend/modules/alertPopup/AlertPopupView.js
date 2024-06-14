/**
 * view for AlertPopup class
 * @see AlertPopup
 */
class AlertPopupView {
    _alertContainer;
    _alertMessageContainer
    _successContainer;
    _successMessageContainer
    _alertAcknowledgerButton

    /**
     * creates and hides success and error message containers/elements
     * adds click event to alert acknowledger button
     */
    constructor() {
        this._alertContainer = HtmlElementCreator.createSimpleHtmlElement('div', document.querySelector('body'), {id: "alertContainer"})
        const container = HtmlElementCreator.createSimpleHtmlElement('div', this._alertContainer)
        this._alertMessageContainer = HtmlElementCreator.createSimpleHtmlElement('div', container);
        this._alertAcknowledgerButton = HtmlElementCreator.createNestedHtmlElement(['div', 'input'], container, {
            type: 'button',
            value: 'OK'
        })
        this._alertAcknowledgerButton.addEventListener('click', () => this._alertContainer.style.display = "none")
        this._successContainer = HtmlElementCreator.createSimpleHtmlElement('div', document.querySelector('body'), {id: "successContainer"})
        HtmlElementCreator.createSimpleHtmlElement('p', this._successContainer, {innerText: 'Operation successful'})
        this._successMessageContainer = HtmlElementCreator.createSimpleHtmlElement('p', this._successContainer)
    }

    hideSuccessMessage() {
        this._successContainer.style.display = "none";
        this._successMessageContainer.innerHTML = ''
    }

    showAlertMessage(message) {
        this._alertMessageContainer.innerHTML = `<p>ERROR!</p> ${message}`
        this._alertContainer.style.display = "initial";
        this._alertAcknowledgerButton.focus()
    }

    showSuccessMessage(message) {
        this._successContainer.style.display = "initial";
        this._successMessageContainer.innerHTML = message
    }
}

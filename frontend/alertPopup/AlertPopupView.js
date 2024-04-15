class AlertPopupView {

    _alertContainer;

    _alertMessageContainer

    _successContainer;

    _successMessageContainer
    constructor() {
        this._alertContainer = HtmlElementCreator.createSimpleHtmlElement('div',document.getElementsByTagName('body')[0])
        let container = HtmlElementCreator.createSimpleHtmlElement('div',this._alertContainer)
        this._alertMessageContainer=HtmlElementCreator.createSimpleHtmlElement('div',container);
        (HtmlElementCreator.createNestedHtmlElement(['div','input'], container, {type: 'button', value: 'OK'}))

        this._successContainer = HtmlElementCreator.createSimpleHtmlElement('div',document.getElementsByTagName('body')[0])
        HtmlElementCreator.createSimpleHtmlElement('p',this._successContainer, {innerText: 'Operation successful'})
        this._successMessageContainer=HtmlElementCreator.createSimpleHtmlElement('p',this._successMessageContainer)
    }
    // document.getElementById('alertAckButton').addEventListener('click', () => {
    //     document.getElementById('alertPopupContainer').style.display = "none";
    // })

    // <div id="alertPopupContainer">
    //     <div id="alertPopup">
    //         <div id="alertMessage"></div>
    //         <div><input id="alertAckButton" type="button" value="OK"></div>
    //     </div>
    // </div>
    // <div id="successPopup">
    //     <p>Művelet sikeres</p>
    //     <p id="successMessage"></p>
    // </div>
}

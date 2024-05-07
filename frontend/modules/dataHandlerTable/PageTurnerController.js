class PageTurnerController {
    _navElements = {}
    _lastPageNum = undefined

    constructor(container) {
        container.style.height = parseInt(container.style.height) + 30 + "px";
        let navContainer = HtmlElementCreator.createHtmlElement("div", container, {"class": "pagerNavContainer"});
        this._navElements['first'] = HtmlElementCreator.createHtmlElement("span", navContainer, {
            "class": "navLink",
            "innerHTML": "Első"
        });
        this._navElements['previous'] = HtmlElementCreator.createHtmlElement("span", navContainer, {
            "class": "navLink",
            "innerHTML": "Előző"
        });
        this._navElements['actual'] = HtmlElementCreator.createHtmlElement("input", navContainer, {type: 'text'});
        this._navElements['next'] = HtmlElementCreator.createHtmlElement("span", navContainer, {
            "class": "navLink",
            "innerHTML": "Következő"
        });
        this._navElements['last'] = HtmlElementCreator.createHtmlElement("span", navContainer, {
            "class": "navLink",
            "innerHTML": "Utolsó"
        });
    }
}

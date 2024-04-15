/**
 * static class
 * segédfüggvények html elemek készítéséhez
 */
class HtmlElementCreator {
    /**
     * létrehoz egy html DOM elemet
     * @param type {array | string} - html DOM típus(pl.: div) - ha array akkor egymásba ágyazza az elemeket
     * @param parent {HTMLElement | string} - szülő DOM element-je, ebbe kerül létrehozásra az elem
     * @param params {object} - HTML elem paraméterei (pl: id, class)
     * @returns {HTMLElement} a létrejött DOM element - egymásba ágyazottnál a belső elem
     * @throws {Error} - ha a type nem string vagy array
     * @see createNestedHtmlElement | createSimpleHtmlElement
     */
    static createHtmlElement(type, parent, params = {}) {
        if (typeof type === "string") {
            return this.createSimpleHtmlElement(type, parent, params)
        } else if (typeof type === "object") {
            return this.createNestedHtmlElement(type, parent, params)
        } else
            throw new Error('createHtmlElement type must be string or array');
    }

    /**
     * létrehoz egy egyszerű (nem egymásba ágyazott) html DOM elemet
     * @param type {string} - html DOM típus
     * @param parent {string | HTMLElement|null} - szülő DOM element-je, ebbe kerül létrehozásra az elem
     * @param params {object} - HTML elem paraméterei
     * @returns {HTMLElement} - a létrejött DOM element
     * @throws {Error} - ha a type nem string, vagy a parent element nem létezik
     */
    static createSimpleHtmlElement(type, parent, params = {}) {
        if (parent !== null) {
            if (typeof parent === "string")
                parent = document.getElementById(parent)
            if (parent.nodeName === undefined)
                throw new Error('createHtmlSimpleElement - parent must be DOM element');
            if (typeof type !== "string")
                throw new Error('createHtmlSimpleElement type must be a string');
        }
        let newDiv = document.createElement(type);
        for (let key in params)
            if (key !== "innerHTML")
                newDiv.setAttribute(key, params[key]);
        if ('innerHTML' in params)
            newDiv.innerHTML = params.innerHTML
        if (parent !== null)
            parent.appendChild(newDiv);
        return newDiv
    };

    /**
     * létrehoz két (vagy több) egymásba ágyaztt html DOM elemet
     * @param type {array} - html DOM típusok (pl: [td, input]) egymásba ágyazva jönnek létre
     * @param parent {string | HTMLElement} - szülő DOM element-je, ebbe kerül létrehozásra az elem
     * @param params {object} - HTML elem paraméterei
     * @returns {HTMLElement} - element a legbelül ágyazott DOM element
     * @throws {Error} - ha a type nem object/array
     * @see createSimpleHtmlElement
     */
    static createNestedHtmlElement(type, parent, params = {}) {
        if (typeof type !== "object")
            throw new Error('createHtmlNestedElement type must be an array');
        let param, temp, returnObject;
        for (let key in type) {
            if (type.hasOwnProperty(key)) {
                param = {}
                if (parseInt(key) === type.length - 1) param = params;
                temp = this.createSimpleHtmlElement(type[key], parent, param)
                if (key === "0") returnObject = temp
                parent = temp;
            }
        }
        return temp;
    }

    /**
     * hozzáad egy header sort egy táblához (<tr><th></th>...</tr>)
     * @param parentDOMElement {HTMLTableElement | HTMLTableSectionElement} - TABLE vagy THEAD DOM element
     * @param headerStrings {array} - a header-ökbe kerülő string-ek
     * @returns {HTMLTableRowElement}  a létrehozott header row
     * @throws {Error}- ha a parentDOMElement nem TABLE vagy THEAD
     */
    static addHeaderRowToTable(parentDOMElement, headerStrings) {
        if (parentDOMElement.nodeName !== "TABLE" && parentDOMElement.nodeName !== "THEAD")
            throw new Error('addHeaderRowToTable tableDOMElement must be a TABLE OR THEAD');
        let row = HtmlElementCreator.createNestedHtmlElement(parentDOMElement.nodeName === 'TABLE' ? ['thead', 'tr'] : ['tr'], parentDOMElement)
        for (let headerString of headerStrings)
            HtmlElementCreator.createSimpleHtmlElement('th', row, {'innerHTML': headerString})
        return row
    }

    /**
     * létrehoz egy select DOM elemet, valamint az option-öket (addOptionToSelect fv)
     * @param parent {HTMLElement} - szülő DOM elememt, amibe a select kerül
     * @param params {object} - paraméterek - a select elem paraméterei
     * @param options {object | array} - választható opciók (részletesebben lásd addOptionToSelect)
     * @param addOptionValue {boolean} - opciókhoz kell e külön value (részletesebben lásd addOptionToSelect)
     * @param filterable {boolean} - ha true hozzáad egy üres optiont
     * @returns {HTMLSelectElement} a létrejött Select DOM elem
     * @see addOptionToSelect
     */
    static createSelectWithOptions(parent, params = {}, options = [], addOptionValue = true, filterable = false) {
        let newDiv = document.createElement("select");
        for (let key in params)
            if (params.hasOwnProperty(key))
                if (key !== "innerHTML" && key !== "selectedIndex") newDiv.setAttribute(key, params[key]);
        if ('innerHTML' in params)
            newDiv.innerHTML = params.innerHTML
        parent.appendChild(newDiv);
        HtmlElementCreator.addOptionToSelect(newDiv, options, addOptionValue, filterable);
        if ('selectedIndex' in params)
            newDiv.selectedIndex = params.selectedIndex
        return newDiv
    };

    /**
     * választható opciókat ad egy select elemhez
     * @param element {HTMLSelectElement} a select DOM elem
     * @param options {object | array} választható opciók - ha az addOptionvalue true az object/array attributumnevei/kulcsai
     * value-k lesznek, az értékek pedig labelek
     * @param addOptionValue {boolean} - ha true: value (attributumérték) és label(attribútum) értékeket kap az option,
     *                                  ha false: a value és a label ugyanaz lesz(attribútumérték)
     * @param filterable {boolean} - ha true, akkor a előre egy üres opció kerül - szűréshez
     */
    static addOptionToSelect(element, options, addOptionValue, filterable = false) {
        if (addOptionValue === undefined)
            addOptionValue = true;
        if (filterable)
            element.add(document.createElement("option"));
        for (let i in options)
            if (options.hasOwnProperty(i)) {
                let option = document.createElement("option");
                if (addOptionValue === true)
                    option.value = i;
                option.text = options[i];
                element.add(option);
            }
    };

    /**
     * rekurzívan kiürít egy DOM elemet
     * @param element {HTMLElement | ChildNode} kiürítendő element
     */
    static emptyDOMElement(element) {
        while (element.firstChild) {
            this.emptyDOMElement(element.firstChild)
            element.removeChild(element.firstChild);
        }
    }
}

/**
 * static class
 * assistant class for creating HTML elements
 */
class HtmlElementCreator {
    /**
     * adds a header row to a table (<tr><th></th>...</tr>)
     * @param parentDOMElement {HTMLTableElement | HTMLTableSectionElement} - TABLE or THEAD DOM element
     * @param headerStrings {string[]} header strings
     * @returns {HTMLTableRowElement}  created table row
     * @throws {Error}- if parentDOMElement not TABLE or THEAD
     */
    static addHeaderRowToTable(parentDOMElement, headerStrings) {
        if (parentDOMElement.nodeName !== "TABLE" && parentDOMElement.nodeName !== "THEAD")
            throw new Error('addHeaderRowToTable tableDOMElement must be a TABLE OR THEAD');
        const row = HtmlElementCreator.createNestedHtmlElement(parentDOMElement.nodeName === 'TABLE' ? ['thead', 'tr'] : ['tr'], parentDOMElement)
        for (const headerString of headerStrings)
            HtmlElementCreator.createSimpleHtmlElement('th', row, {'innerHTML': headerString})
        return row
    }

    /**
     * adds options to a select
     * @param selectDomElement {HTMLSelectElement} select DOM element
     * @param domOptions {object | array} options [key: label][]
     * @param addValueToOption {boolean} if true: options key will be select values and option values will be select labels
     *                                  if false: select labels and values will be the same - the option's values
     * @param addEmptySelect {boolean} if true, the first option will be an empty option
     */
    static addOptionToSelect(selectDomElement, domOptions, addValueToOption = true, addEmptySelect = false) {
        if (addValueToOption === undefined)
            addValueToOption = true;
        if (addEmptySelect)
            selectDomElement.add(document.createElement("option"));
        for (const option in domOptions) {
            const newOption = document.createElement("option");
            if (addValueToOption)
                newOption.value = option;
            newOption.text = domOptions[option];
            selectDomElement.add(newOption);
        }
    };

    /**
     * creates a html element
     * @param type {string[] | string} html DOM type(for e.g.: 'div')  or ARRAY (nested ['div','input'])
     * @param parent {HTMLElement | string} parent DOM element, in which the element is created
     * @param params {object} parameters of the element (fot e.g.: id, class)
     * @returns {HTMLElement} the created HTML element, if nested, it's the nested element
     * @throws {Error} if type is not string or array
     * @see createNestedHtmlElement | createSimpleHtmlElement
     */
    static createHtmlElement(type, parent, params = {}) {
        //TODO test type with object
        if (typeof type === "string")
            return this.createSimpleHtmlElement(type, parent, params)
        if (typeof type === "object")
            return this.createNestedHtmlElement(type, parent, params)
        throw new Error('createHtmlElement type must be string or array');
    }

    /**
     * crates a nested element (multilevel)
     * @param domType {string[]} html DOM types for e.g.: [td, input]
     * @param parentHTMLElement {string | HTMLElement}parent DOM element, in which the element is created
     * @param domParameters {object} parameters of the element (fot e.g.: id, class)
     * @returns {HTMLElement} the innermost nested HTML element
     * @throws {Error} -  if type is not an object
     * @see createSimpleHtmlElement
     */
    static createNestedHtmlElement(domType, parentHTMLElement, domParameters = {}) {
        //TODO test with object
        if (typeof domType !== "object")
            throw new Error('createHtmlNestedElement type must be an array');
        let param, temp;
        for (const key in domType) {
            param = {}
            if (parseInt(key) === domType.length - 1) param = domParameters;
            temp = this.createSimpleHtmlElement(domType[key], parentHTMLElement, param)
            parentHTMLElement = temp;
        }
        return temp;
    }

    /**
     * creates a select dom element, and it's options
     * @param parentHTMLElement {HTMLElement} parent DOM element, in which the element is created
     * @param domParameters {object} parameters of the SELECT element (fot e.g.: id, class)
     * @param selectOptions {object | array} possible options (see addOptionToSelect)
     * @param addValueToOptions {boolean} - options get value? (see addOptionToSelect)
     * @param filterable {boolean} - if true adds an empty option (see addOptionToSelect)
     * @returns {HTMLSelectElement} created SELECT DOM element
     * @see addOptionToSelect
     */
    static createSelectWithOptions(parentHTMLElement, domParameters = {}, selectOptions = [], addValueToOptions = true, filterable = false) {
        const newDiv = document.createElement("select");
        if ('innerHTML' in domParameters) {
            newDiv.innerHTML = domParameters.innerHTML
            delete domParameters.innerHTML
        }
        if ('selectedIndex' in domParameters) {
            newDiv.selectedIndex = domParameters.selectedIndex
            delete domParameters.selectedIndex
        }
        for (const key in domParameters)
            newDiv.setAttribute(key, domParameters[key]);
        parentHTMLElement.appendChild(newDiv);
        HtmlElementCreator.addOptionToSelect(newDiv, selectOptions, addValueToOptions, filterable);
        return newDiv
    };

    /**
     * creates a non-nested HTML element
     * @param domType {string} - html DOM type
     * @param parentHTMLElement {string | HTMLElement|null} parent DOM element, in which the element is created
     * @param domParameters {object} parameters of the element (fot e.g.: id, class)
     * @returns {HTMLElement} the created HTML element
     * @throws {Error} if type is not string
     */
    static createSimpleHtmlElement(domType, parentHTMLElement, domParameters = {}) {
        //TODO test if parent is HTMLDOMELEMENT
        if (parentHTMLElement !== null) {
            if (typeof parentHTMLElement === "string")
                parentHTMLElement = document.getElementById(parentHTMLElement)
            if (parentHTMLElement.nodeName === undefined)
                throw new Error('createHtmlSimpleElement - parent must be DOM element');
        }
        if (typeof domType !== "string")
            throw new Error('createHtmlSimpleElement type must be a string');
        const newDiv = document.createElement(domType);
        if ('innerHTML' in domParameters) {
            newDiv.innerHTML = domParameters.innerHTML
            delete domParameters.innerHTML
        }
        for (const key in domParameters)
            newDiv.setAttribute(key, domParameters[key]);
        if (parentHTMLElement !== null)
            parentHTMLElement.appendChild(newDiv);
        return newDiv
    };

    /**
     * empties an element recursively
     * @param htmlDOMElement {HTMLElement | ChildNode} element to empty
     */
    static emptyDOMElement(htmlDOMElement) {
        while (htmlDOMElement.firstChild) {
            this.emptyDOMElement(htmlDOMElement.firstChild)
            htmlDOMElement.removeChild(htmlDOMElement.firstChild);
        }
    }
}

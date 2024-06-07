/**
 * static class
 * assistant class for creating HTML elements
 */
class HtmlElementCreator {
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
     * creates a non-nested HTML element
     * @param type {string} - html DOM type
     * @param parent {string | HTMLElement|null} parent DOM element, in which the element is created
     * @param params {object} parameters of the element (fot e.g.: id, class)
     * @returns {HTMLElement} the created HTML element
     * @throws {Error} if type is not string
     */
    static createSimpleHtmlElement(type, parent, params = {}) {
        //TODO test if parent is HTMLDOMELEMENT
        if (parent !== null) {
            if (typeof parent === "string")
                parent = document.getElementById(parent)
            if (parent.nodeName === undefined)
                throw new Error('createHtmlSimpleElement - parent must be DOM element');
        }
        if (typeof type !== "string")
            throw new Error('createHtmlSimpleElement type must be a string');
        const newDiv = document.createElement(type);
        if ('innerHTML' in params) {
            newDiv.innerHTML = params.innerHTML
            delete params.innerHTML
        }
        for (const key in params)
            newDiv.setAttribute(key, params[key]);
        if (parent !== null)
            parent.appendChild(newDiv);
        return newDiv
    };

    /**
     * crates a nested element (multilevel)
     * @param type {string[]} html DOM types for e.g.: [td, input]
     * @param parent {string | HTMLElement}parent DOM element, in which the element is created
     * @param params {object} parameters of the element (fot e.g.: id, class)
     * @returns {HTMLElement} the innermost nested HTML element
     * @throws {Error} -  if type is not an object
     * @see createSimpleHtmlElement
     */
    static createNestedHtmlElement(type, parent, params = {}) {
        //TODO test with object
        if (typeof type !== "object")
            throw new Error('createHtmlNestedElement type must be an array');
        let param, temp;
        for (const key in type) {
            param = {}
            if (parseInt(key) === type.length - 1) param = params;
            temp = this.createSimpleHtmlElement(type[key], parent, param)
            parent = temp;
        }
        return temp;
    }

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
     * creates a select dom element, and it's options
     * @param parent {HTMLElement} parent DOM element, in which the element is created
     * @param params {object} parameters of the SELECT element (fot e.g.: id, class)
     * @param options {object | array} possible options (see addOptionToSelect)
     * @param addOptionValue {boolean} - options get value? (see addOptionToSelect)
     * @param filterable {boolean} - if true adds an empty option (see addOptionToSelect)
     * @returns {HTMLSelectElement} created SELECT DOM element
     * @see addOptionToSelect
     */
    static createSelectWithOptions(parent, params = {}, options = [], addOptionValue = true, filterable = false) {
        const newDiv = document.createElement("select");
        if ('innerHTML' in params) {
            newDiv.innerHTML = params.innerHTML
            delete params.innerHTML
        }
        if ('selectedIndex' in params) {
            newDiv.selectedIndex = params.selectedIndex
            delete params.selectedIndex
        }
        for (const key in params)
            newDiv.setAttribute(key, params[key]);
        parent.appendChild(newDiv);
        HtmlElementCreator.addOptionToSelect(newDiv, options, addOptionValue, filterable);
        return newDiv
    };

    /**
     * adds options to a select
     * @param element {HTMLSelectElement} select DOM element
     * @param options {object | array} options [key: label][]
     * @param addOptionValue {boolean} if true: options key will be select values and option values will be select labels
     *                                  if false: select labels and values will be the same - the option's values
     * @param filterable {boolean} if true, the first option will be an empty option
     */
    static addOptionToSelect(element, options, addOptionValue = true, filterable = false) {
        if (addOptionValue === undefined)
            addOptionValue = true;
        if (filterable)
            element.add(document.createElement("option"));
        for (const option in options) {
            const newOption = document.createElement("option");
            if (addOptionValue)
                newOption.value = option;
            newOption.text = options[option];
            element.add(newOption);
        }
    };

    /**
     * empties an element recursively
     * @param element {HTMLElement | ChildNode} element to empty
     */
    static emptyDOMElement(element) {
        while (element.firstChild) {
            this.emptyDOMElement(element.firstChild)
            element.removeChild(element.firstChild);
        }
    }
}

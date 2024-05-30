class ViewParent {
    _components = {};

    _windowContentMainContainer
    set windowContentMainContainer(value) {
        this._windowContentMainContainer = value;
    }

    get windowContentMainContainer() {
        return this._windowContentMainContainer;
    }

    addComponent(name, component) {
        this._components[name] = component;
    }

    getComponent(name) {
        return this._components[name];
    }

    destruct(prioritizedComponentNames = []) {
        prioritizedComponentNames.forEach((name) => {
            this._components[name].destruct()
            delete this._components[name];
        })
        Object.keys(this._components).forEach(name => {
            console.log(name)
            this._components[name].destruct()
            delete this._components[name];
        })
        // HtmlElementCreator.emptyDOMElement(this._windowTab)
        // this.windowTab.remove()
    }
}

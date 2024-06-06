class WindowContentViewParent {
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

    destructor(prioritizedComponentNames = []) {
        prioritizedComponentNames.forEach((name) => {
            this._components[name].destructor?.()
            delete this._components[name];
        })
        for (name in this._components){
            console.log(name)
            this._components[name].destructor?.()
            delete this._components[name];
        }
        // HtmlElementCreator.emptyDOMElement(this._windowTab)
        // this.windowTab.remove()
    }
}

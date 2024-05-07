class ViewParent {
    _components = {};

    addComponent(name, component) {
        this._components[name] = component;
    }

    getComponent(name) {
        return this._components[name];
    }
}

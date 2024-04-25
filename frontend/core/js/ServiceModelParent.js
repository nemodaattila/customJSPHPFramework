class ServiceModelParent {
    _loaded = false

    set loaded(value) {
        this._loaded = value;
    }

    _attributeOrder = undefined

    setAttributeOrder() {
        if (this._attributes !== undefined) {
            this.attributeOrder = Object.keys(this._attributes)
        }
    }
}

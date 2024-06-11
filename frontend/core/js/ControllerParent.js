/**
 * parent class of all constructor classes
 */
class ControllerParent {
    _model
    _view

    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }

    get view() {
        return this._view;
    }

    set view(value) {
        this._view = value;
    }

    destructor() {
        this.model?.destructor?.()
        this.model = null
        this.view?.destructor?.()
        this.view = null
    }
}

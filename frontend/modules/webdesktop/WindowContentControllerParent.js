class WindowContentControllerParent extends ControllerParent{

    _service
    get service() {
        return this._service;
    }

    set service(value) {
        this._service = value;
    }

    setWindowMainContentContainer(container)
    {
        this._view.windowContentMainContainer=container
    }

    getWindowContentMainContainer()
    {
        return this._view.windowContentMainContainer
    }

    getTitle() {
        return this._service.getTitle(this._type)
    }

}

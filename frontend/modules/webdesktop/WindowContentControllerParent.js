class WindowContentControllerParent extends ControllerParent{

    setWindowMainContentContainer(container)
    {
        this._view.windowContentMainContainer=container
    }

    getWindowContentMainContainer()
    {
        return this._view.windowContentMainContainer
    }

    getTitle() {
        return this.service.getTitle(this._type)
    }

}

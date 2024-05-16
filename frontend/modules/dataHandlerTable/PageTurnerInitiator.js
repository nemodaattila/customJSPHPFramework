class PageTurnerInitiator {
    static async init(pageTurnerName, container, listerControllerPointer) {
        await Includer.loadFileSource(pageTurnerName)
        return new (eval(pageTurnerName[0].toUpperCase() + pageTurnerName.slice(1) + "Controller"))(container, listerControllerPointer)
    }
}

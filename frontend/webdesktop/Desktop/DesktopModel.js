class DesktopModel {

    /**
     * megjelenített ablakok objektumai
     * @type {{string: DesktopWindow}}
     */
    windows = {}
    /**
     * aktív ablak objektuma
     * @type {DesktopWindow | undefined}
     */
    activeWindow = undefined
    /**
     * az előző aktív ablak objektuma
     * @type {DesktopWindow | undefined}
     */
    previousWindow = undefined
}

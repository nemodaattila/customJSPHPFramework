class DesktopModel {
    /**
     * az ablakkezelő DOM elementje
     * @type HTMLDivElement
     */
    static desktopElement
    /**
     * a fül sáv DOM elementje
     * @type HTMLDivElement
     */
    static tabsBarElement
    /**
     * megjelenített ablakok objektumai
     * @type {{string: DesktopWindow}}
     */
    static windows = {}
    /**
     * aktív ablak objektuma
     * @type {DesktopWindow | undefined}
     */
    static activeWindow = undefined
    /**
     * az előző aktív ablak objektuma
     * @type {DesktopWindow | undefined}
     */
    static previousWindow = undefined
}

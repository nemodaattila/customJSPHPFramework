class DesktopWindowTabView {

    createElements(container)
    {

        this.windowTab = HtmlElementCreator.createHtmlElement('div', container, {
            class: 'windowTab',
        })
        this.windowTab.addEventListener('mousedown', () => Desktop.switchActiveWindow(this))
        HtmlElementCreator.createHtmlElement('div', this.windowTab, {
            class: 'titleDiv'
        })
        let resetIcon = HtmlElementCreator.createHtmlElement('div', this.windowTab, {
            title: 'Ablak alapméretre állítása', class: 'resetWindowIcon'
        })
        resetIcon.addEventListener('click', () => {
            if (this.windowSize !== undefined)
                this.maximalizeWindow()
            this.windowDiv.style.left = '0'
            this.windowDiv.style.top = '25px'
            this.windowDiv.style.width = '500px'
            this.windowDiv.style.height = '250px'
            this.contentObject.setTableZoom('1', false)
            this.zoomWindow('1')
        })
        let closeIcon = HtmlElementCreator.createHtmlElement('div', this.windowTab, {
            title: 'Bezárás', class: 'close'
        })
        closeIcon.addEventListener('click', () => this.closeWindow())
        closeIcon.style.top = '0'
    }

}

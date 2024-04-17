class Main {
    static async init() {
        Includer.init()
        //DO Auth
        await this.loadCoreFiles()
        this.initComponents()
    }

    static async loadCoreFiles() {
        Includer.addFilesToLoad(
            [{
                directory: CORE_FILE_DIR,
                fileNames: ['Messenger.js', 'HtmlElementCreator.js'],
            },
                {
                    directory: WEB_DESKTOP_DIR,
                    fileNames: ['filesToInclude.js'],
                }, {
                directory: './alertPopup',
                fileNames: ['filesToInclude.js']
            }]
        );
        await Includer.startLoad()
        await Includer.loadFileSources('alertPopup')
        Messenger.setObject(new AlertPopup())
        await Includer.loadFileSources('desktop')
        console.dir(Includer)
    }

    static initComponents() {
        Desktop.init()
    }
}

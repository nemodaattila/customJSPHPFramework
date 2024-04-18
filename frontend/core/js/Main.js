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
                directory: './core/css/',
                fileNames: ['global.css'],
            },
                {
                directory: CORE_FILE_DIR,
                fileNames: ['Messenger.js', 'HtmlElementCreator.js','ModuleLoader.js'],
            },
                {
                    directory: WEB_DESKTOP_DIR,
                    fileNames: ['filesToInclude.js'],
                }, {
                directory: MODULE_FILE_DIR+'alertPopup',
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
        DesktopController.init()
        ModuleLoader.loadModule('companies','companyLister')
    }
}

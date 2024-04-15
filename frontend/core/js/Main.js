class Main {
    static init() {
        Includer.init()
        //DO Auth
        this.loadCoreFiles()
    }

    static async loadCoreFiles() {
        Includer.addFilesToLoad(
            [{
                directory: WEB_DESKTOP_DIR,
                fileNames: ['filesToInclude.js'],

            },{
                directory: './alertPopup',
                fileNames: ['filesToInclude.js']
            }]
        );
        await Includer.startLoad()
        await Includer.loadFileSources('alertPopup')
        await Includer.loadFileSources('desktop')
            console.dir(Includer)
    }
}

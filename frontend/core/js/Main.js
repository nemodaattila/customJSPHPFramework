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
                fileNames: ['filesToInclude.js']
            }]
        );
        await Includer.startLoad()
        console.dir(Includer)
    }
}

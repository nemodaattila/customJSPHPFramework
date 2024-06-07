/**
 * class Includer
 * loads javascript/css files in runtime, synchronously
 */
class Includer {
    /**
     * @type IncluderModel
     * @private
     */
    static _model

    static init() {
        this._model = new IncluderModel()
    }

    /**
     * returns module files to be loaded (directory and filenames) based on module name
     * @param {string} modulName module name
     * @returns {boolean|*} module files or false if module not exists
     */
    static getIncludableModuleSource(modulName) {
        return this._model.getIncludableModuleSource(modulName);
    }


    /**
     * saves module file parameters in model
     * @param {string} modulName module name
     * @param {{directory: string, fileNames: string[]}[]} files file parameters {directory: string, fileNames: string[]}[]
     */
    static setIncludableModuleSource(modulName, files) {
        this._model.setIncludableModuleSource(modulName, files);
    }

    /**
     * loads a module
     * @param moduleName module name
     * @returns {Promise<void>}
     */
    static async loadModuleSource(moduleName) {
        this.addFilesToLoad(this._model.getIncludableModuleSource(moduleName))
        await this.startLoad()
    }

    /**
     * prepares files to load
     * @param filesToLoad {{directory: string, fileNames: string[]}[]|{directory: string, fileNames: string[]}} files to load
     */
    static addFilesToLoad(filesToLoad) {
        if (!filesToLoad) {
            Messenger.showAlert('file load error - addFilesToLoad param type not correct')
            return;
        }
        if (!Array.isArray(filesToLoad))
            filesToLoad = [filesToLoad]
        filesToLoad.forEach((group) => {
            group.fileNames.forEach((file) => {
                if (!this._model.searchInLoadedFiles(group.directory + '/' + file))
                    this._model.setFilesToLoad(group.directory + '/' + file)
            })
        })
    };

    /**
     * starts file loading, calls files to load one by one, stops on error
     * @returns {Promise<unknown>}
     */
    static async startLoad() {
        return new Promise(async (resolve, reject) => {
            const filesToLoad = this._model.filesToLoad
            if (filesToLoad.length === 0)
                resolve(true)
            for (const file of filesToLoad) {
                try {
                    await this.loadScript(file)
                } catch (e) {
                    Messenger.showAlert('file load failed: ' + e)
                    this.stopLoad()
                    reject(false)
                    break;
                }
            }
            this.stopLoad()
            resolve(true)
        })
    }

    /**
     * loads a file (javascript/css)
     * @param file {string} file path
     * @returns {Promise<unknown>}
     */
    static loadScript(file) {
        const extension = file.split('.').pop().toLowerCase()
        if (extension === 'js')
            return new Promise((resolve, reject) => {
                const script = document.createElement("script");
                script.type = "text/javascript";
                script.src = file;
                document.getElementsByTagName("head")[0].appendChild(script);
                script.onload = () => {
                    this._model.loadedFiles = file
                    resolve(true)
                }
                script.onerror = () => reject(file)
            })
        if (extension === 'css')
            return new Promise((resolve, reject) => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = file;
                link.media = 'all';
                document.getElementsByTagName("head")[0].appendChild(link);
                link.onload = () => {
                    this._model.loadedFiles = file
                    resolve(true)
                }
                link.onerror = () => reject(file)
            })
    }

    /**
     * stops file load
     */
    static stopLoad() {
        this._model.emptyFilesToLoad();
    }
}

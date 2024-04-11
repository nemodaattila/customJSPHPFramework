/**
 * class Includer
 * futásidőben hozzáadott JS fájlokat tölti be , egymás után
 */
class Includer {
    static _model

    static init() {
        this._model = new IncluderModel()
    }

    static getIncludeFileSources(name) {
        return this._model.getIncludeFileSources(name);
    }

    static setIncludeFileSources(name, value) {
        this._model.setIncludeFileSources(name, value);
    }

    static addFilesToLoad(filesToLoad) {
        console.log(filesToLoad)
        if (!Array.isArray(filesToLoad))
            filesToLoad = [filesToLoad]
        console.log(filesToLoad)
        filesToLoad.forEach((group) => {
            group.fileNames.forEach((file) => {
                if (this._model.searchInLoadedFiles(group.directory + '/' + file))
                    this._model.setFilesToLoad(group.directory + '/' + file)
            })
            console.dir(this)
        })
    };

    /**
     * fájlbetöltések elindítéása
     */
    static async startLoad() {
        return new Promise(async (resolve, reject) => {
            let filesToLoad = this._model.filesToLoad
            if (filesToLoad.length === 0)
                return
            let res
            for (const file of filesToLoad) {
                try {
                    res = await this.loadScript(file)
                } catch (e) {
                    MessageHandler.showAlert()
                    // AlertPopup.showAlert('file load failed: ' + e)
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
     * fájl (konkrét) betöltése, load eseményhívás
     */
    static loadScript(file) {
        console.log(file)
        return new Promise((resolve, reject) => {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = file;
            document.getElementsByTagName("head")[0].appendChild(script);
            script.onload = () => {
                this._model.loadedJSFiles = file
                resolve(true)
            }
            script.onerror = () => reject(file)
        })
    }

    /**
     * fájltöltés lezárása
     */
    static stopLoad() {
        this._model.resetFilesToLoad();
    }
}

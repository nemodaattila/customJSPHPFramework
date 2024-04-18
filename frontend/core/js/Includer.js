/**
 * class Includer
 * futásidőben hozzáadott JS fájlokat tölti be , egymás után
 */
class Includer {
    static _model

    static init() {
        this._model = new IncluderModel()
    }

    static getIncludableFileSource(name) {
        return this._model.getIncludableFileSource(name);
    }

    static setIncludableFileSource(name, value) {
        this._model.setIncludableFileSource(name, value);
    }

    static async loadFileSource(name) {
        console.log(name)
        this.addFilesToLoad(this._model.getIncludableFileSource(name))
        await this.startLoad()
    }

    static addFilesToLoad(filesToLoad) {
        if (filesToLoad === undefined) {
            Messenger.showAlert('file load error - addFilesToLoad param undefined')
            return
        }
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
                    Messenger.showAlert('file load failed: ' + e)
                    // alertPopup.showAlert('file load failed: ' + e)
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
        let extension = file.split('.').pop().toLowerCase()
        if (extension === 'js') {
            return new Promise((resolve, reject) => {
                let script = document.createElement("script");
                script.type = "text/javascript";
                script.src = file;
                document.getElementsByTagName("head")[0].appendChild(script);
                script.onload = () => {
                    this._model.loadedFiles = file
                    resolve(true)
                }
                script.onerror = () => reject(file)
            })
        } else if (extension === 'css') {
            return new Promise((resolve, reject) => {
                let link = document.createElement('link');
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
    }

    /**
     * fájltöltés lezárása
     */
    static stopLoad() {
        this._model.resetFilesToLoad();
    }
}

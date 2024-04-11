/**
 * class Includer
 * futásidőben hozzáadott JS fájlokat tölti be , egymás után
 */
class Includer {
    /**
     * betöltési folyamat aktív-e , ha igen új indítást nem lehet kezdeményezni
     * @type {boolean}
     */
    static active = false
    /**
     * betöltendő fájlok listája, objectek tömbje
     * @type [] - [{ callWord: string, id: string, files: []},{},...]
     */
    static filesToLoad = []

    /**
     * fájl betöltés indítása, objectek tömbje
     * @type {[{directory: string, fileNames: Array}]}
     */
    static addFilesToLoad(filesToLoad) {
        if (!Array.isArray(filesToLoad))
            filesToLoad = [filesToLoad]
        filesToLoad.forEach((group) => {
            let newGroup = {
                id: group.id,
                files: []
            }
            group.files.forEach((fileGroup) =>
                fileGroup.fileNames.forEach((file) => {
                    if (App.loadedJSFiles.find(file => file === fileGroup.directory + '/' + file) !== -1)
                        newGroup.files.push(fileGroup.directory + '/' + file)
                }))
            this.filesToLoad.push(newGroup)
        })
    };

    /**
     * fájlbetöltések elindítéása
     */
    static async startLoad() {
        return new Promise(async (resolve, reject) => {
            if (this.active === true)
                return;
            if (this.filesToLoad.length === 0)
                return
            this.active = true;
            let res
            for (const level of this.filesToLoad) {
                if (level === undefined) {
                    AlertPopup.showAlert('Includer Level Error')
                    this.stopLoad()
                    return
                }
                for (const file of level.files) {
                    try {
                        res = await this.loadScript(file)
                    } catch (e) {
                        AlertPopup.showAlert('file load failed: ' + e)
                        this.stopLoad()
                        reject(false)
                        break
                    }
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
        return new Promise((resolve, reject) => {
            let script = document.createElement("script");
            script.type = "text/javascript";
            script.src = file;
            document.getElementsByTagName("head")[0].appendChild(script);
            script.onload = () => {
                App.loadedJSFiles.push(file)
                resolve(true)
            }
            script.onerror = () => reject(file)
        })
    }

    /**
     * fájltöltés lezárása
     */
    static stopLoad() {
        this.filesToLoad = []
        this.active = false;
    }
}

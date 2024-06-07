/**
 * model for Include class
 */
class IncluderModel {
    /**
     *
     * @type {{string: {directory: string, fileNames: string[]}[]}}
     * @private
     */
    _includableModuleSources = {};
    /**
     * returns files to be loaded
     * @type {string[]} file paths
     * @private
     */
    _filesToLoad = []
    get filesToLoad() {
        return this._filesToLoad;
    }

    /**
     * already loaded files
     * @type {string[]}
     * @private
     */
    _loadedFiles = []
    /**
     * adds a file to load !IMPORTANT adds, not sets
     * @param {string} file filename
     */
    set loadedFiles(file) {
        this._loadedFiles.push(file);
    }

    /**
     * adds a file to loaded files !IMPORTANT, adds not sets
     * @param {string} file filename
     */
    setFilesToLoad(file) {
        this._filesToLoad.push(file);
    }

    /**
     * empties filesToLoad array
     */
    emptyFilesToLoad() {
        this._filesToLoad = [];
    }

    /**
     * returns module files to be loaded (directory and filenames) based on module name
     * @param {string} moduleName module name
     * @returns {boolean|*} module files or false if module not exists
     */
    getIncludableModuleSource(moduleName) {
        if (this._includableModuleSources[moduleName])
            return this._includableModuleSources[moduleName];
        Messenger.showAlert('fileSource not included: ' + moduleName);
        return false;
    }

    /**
     * saves module file parameters
     * @param {string} moduleName module name
     * @param {{directory: string, fileNames: string[]}[]} files file parameters {directory: string, fileNames: string[]}[]
     */
    setIncludableModuleSource(moduleName, files) {
        if (!this._includableModuleSources[moduleName]) {
            this._includableModuleSources[moduleName] = files;
        } else Messenger.showAlert('moduleName already exists')
    }

    /**
     * checks if a file already loaded
     * @param fileName {string}} file name
     * @returns {boolean}
     */
    searchInLoadedFiles(fileName) {
        return this._loadedFiles.findIndex(file => file === fileName) !== -1
    }
}

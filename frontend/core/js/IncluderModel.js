class IncluderModel {
    _includableFileSources = [];
    _filesToLoad = []
    get filesToLoad() {
        return this._filesToLoad;
    }

    _loadedFiles = []
    set loadedFiles(value) {
        this._loadedFiles.push(value);
    }

    setFilesToLoad(file) {
        this._filesToLoad.push(file);
    }

    resetFilesToLoad() {
        this._filesToLoad = [];
    }

    getIncludableFileSource(name) {
        if (this._includableFileSources[name] === undefined) {
            Messenger.showAlert('fileSource not included: '+name);
            return false;
        }
            return this._includableFileSources[name];
    }

    setIncludableFileSource(name, value) {
        if (this._includableFileSources[name] === undefined)
            this._includableFileSources[name] = value;
    }

    searchInLoadedFiles(fileName) {
        return this._loadedFiles.findIndex(file => file === fileName) !== -1
    }

    // loadedModuleFiles = {}
}

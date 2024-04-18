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
        return this._includableFileSources[name];
    }

    setIncludableFileSource(name, value) {
        console.log(value)
        console.log(name)
        if (this._includableFileSources[name] === undefined)
            this._includableFileSources[name] = value;
    }

    searchInLoadedFiles(fileName) {
        return this._loadedFiles.find(file => file === fileName) !== -1
    }

    // loadedModuleFiles = {}
}

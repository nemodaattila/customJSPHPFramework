class IncluderModel {
    _filesToLoad = []
    get filesToLoad() {
        return this._filesToLoad;
    }

    setFilesToLoad(file) {
        this._filesToLoad.push(file);
    }

    resetFilesToLoad() {
        this._filesToLoad = [];
    }

    _includableFileSources = [];

    getIncludableFileSources(name) {
        return this._includableFileSources[name];
    }

    setIncludableFileSources(name, value) {
        console.log(value)
        console.log(name)

        if (this._includableFileSources[name] === undefined)
            this._includableFileSources[name] = value;
    }

    _loadedJSFiles = []
    set loadedJSFiles(value) {
        this._loadedJSFiles.push(value);
    }

    searchInLoadedFiles(fileName) {
        return this._loadedJSFiles.find(file => file === fileName) !== -1
    }

    modules = []
}

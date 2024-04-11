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

    _includeFileSources = [];

    getIncludeFileSources(name) {
        return this._includeFileSources[name];
    }

    setIncludeFileSources(name, value) {
        console.log(value)
        console.log(name)

        if (this._includeFileSources[name] === undefined)
            this._includeFileSources[name] = value;
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

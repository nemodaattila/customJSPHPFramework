/**
 * loading MVC modules; module groups: entity lister, and handlers (creator, editor), service in a pack
 */
class ModuleLoader {
    /**
     * searches for mvc component in module files (filenames) (for e.g. : View)
     * @param files {{}[]} module files
     * @param componentName {string} name of the component (for e.g. : View)
     * @returns {*[]|false}
     */
    static getComponent(files, componentName) {
        let fileIndex
        const groupIndex = files.findIndex((group) => {
            if (group.fileNames.length === 0)
                return false
            fileIndex = group.fileNames.findIndex((file) => {
                return file.includes(componentName)
            })
            return fileIndex >= 0
        })
        if (groupIndex === -1) return false
        return [files[groupIndex].directory, files[groupIndex].fileNames[fileIndex]]
    }

    /**
     * adds file to Includer and loads it, returns fileName without exception
     * @param directory {string} file path
     * @param fileName {string} filename
     * @returns {Promise<*>} fileName without exception
     */
    static async loadFile([directory, fileName]) {
        Includer.addFilesToLoad(
            [{
                directory: directory,
                fileNames: [fileName]
            }]
        )
        await Includer.startFileLoad()
        return fileName.split('.')[0]
    }

    /**
     * loads an MVC module controller, model, view + service and serviceModel if exists
     * @param moduleGroupName {string} name of the module group - for e.g. companies
     * @param module {string} name of the module for e.g. CompanyCreator
     * @param connectedParams not used as yet
     * @returns {Promise<*|boolean>} returns the controller or false, if module group not exists
     */
    static async loadModule(moduleGroupName, module, connectedParams = null) {
        const moduleFiles = await this._loadModuleFiles(moduleGroupName, module)
        const controller = await this._loadController(moduleFiles)
        if (!controller) {
            Messenger.showAlert('controller file missing from: ' + moduleGroupName)
            return false
        }
        controller.service = await this._loadService(moduleFiles, moduleGroupName)
        console.log(controller)
        if (controller.service) {
            if (!controller.service.model)
                controller.service.model = await this._loadServiceModel(moduleFiles)
            await controller.service.init()
        }
        controller.view = await this._loadView(moduleFiles)
        controller.model = await this._loadModel(moduleFiles)
        await controller.init();
        return controller
    }

    static async _loadModuleFiles(moduleGroupName, module) {
        console.log(MODULE_FILE_DIR + moduleGroupName)
        Includer.addFilesToLoad(
            [{
                directory: MODULE_FILE_DIR + moduleGroupName,
                fileNames: ['filesToInclude.js']
            }]
        );
        await Includer.startFileLoad()
        return Includer.getIncludableModuleSource(module)
    }

    static async _loadController(moduleFiles, moduleGroupName) {
        const controllerName = await this.getComponent(moduleFiles, 'Controller')
        return !controllerName ? false : new (eval(await this.loadFile(controllerName)))(moduleGroupName)
    }

    static async _loadService(moduleFiles) {
        const serviceName = await this.getComponent(moduleFiles, 'Service')
        return !serviceName ? undefined : new (eval(await this.loadFile(serviceName)))()
    }

    static async _loadServiceModel(moduleFiles) {
        const serviceModelName = await this.getComponent(moduleFiles, 'ServiceModel')
        return !serviceModelName ? undefined : new (eval(await this.loadFile(serviceModelName)))()
    }

    static async _loadView(moduleFiles) {
        const view = await this.getComponent(moduleFiles, 'View')
        return !view ? new WindowContentViewParent() : new (eval(await this.loadFile(view)))()
    }

    static async _loadModel(moduleFiles) {
        const model = await this.getComponent(moduleFiles, 'model')
        return !model ? undefined : new (eval(await this.loadFile(model)))()
    }
}

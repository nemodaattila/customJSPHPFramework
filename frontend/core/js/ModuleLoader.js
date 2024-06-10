/**
 * loading MVC modules; module groups: entity lister, and handlers (creator, editor), service in a pack
 */
class ModuleLoader {
    /**
     * loads an MVC module controller, model, view + service and serviceModel if exists
     * @param moduleGroupName {string} name of the module group - for e.g. companies
     * @param module {string} name of the module for e.g. CompanyCreator
     * @param connectedParams not used as yet
     * @returns {Promise<*|boolean>} returns the controller or false, if module group not exists
     */
    static async loadModule(moduleGroupName, module, connectedParams = null) {
        Includer.addFilesToLoad(
            [{
                directory: MODULE_FILE_DIR + moduleGroupName,
                fileNames: ['filesToInclude.js']
            }]
        );
        await Includer.startLoad()
        const moduleFiles = Includer.getIncludableModuleSource(module)
        let controllerName = await this.getComponent(moduleFiles, 'Controller')
        if (!controllerName) {
            Messenger.showAlert('controller file missing from: ' + moduleGroupName)
            return false
        }
        const controller = new (eval(await this.loadFile(controllerName)))(moduleGroupName)
        let serviceName = await this.getComponent(moduleFiles, 'Service')
        if (serviceName) {
            const service = new (eval(await this.loadFile(serviceName)))() //TODO nicer solution?
            if (service.model === undefined) {
                let serviceModel = undefined
                let serviceModelName = await this.getComponent(moduleFiles, 'ServiceModel')
                if (serviceModelName)
                    serviceModel = new (eval(await this.loadFile(serviceModelName)))()
                if (serviceModel)
                    service.model = serviceModel
                await service.init()
            }
            controller.service = service
        }
        let viewFileName = await this.getComponent(moduleFiles, 'View')
        controller.view = viewFileName ? new (eval(await this.loadFile(viewFileName)))() : new WindowContentViewParent()
        controller.init();
        return controller
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
        await Includer.startLoad()
        return fileName.split('.')[0]
    }

    /**
     * searches for mvc component in module files (filenames) (for e.g. : View)
     * @param files {{}[]} module files
     * @param componentName {string} name of the component (for e.g. : View)
     * @returns {*[]|boolean}
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
}

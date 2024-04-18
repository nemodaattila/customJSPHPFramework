/**
 * MVC modul betöltése
 */
class ModuleLoader {
    /**
     * a betöltendő modul paraméterei - module: modulnév, object: meghivó object: App, task: végrehajtandó almodul neve
     * @type {{module: string, object: Object, task: string, params: Object|null}}
     */
    static moduleToLoad
    /**
     *  ModulInitiator példány
     *  @type {ModuleInitiator}
     */
    static initiator

    /**
     * modul betöltés elindítása, ha még nincs betöltve, egyébként aktívvá tétel
     * @param module {{}} modul paraméterei
     * @param connectedParams {{}} megnyitást kezdeményező objekttől származó paraméterek
     */
    static async loadModule(moduleGroupName, module, connectedParams = null) {
        Includer.addFilesToLoad(
            [{
                directory: MODULE_FILE_DIR + moduleGroupName,
                fileNames: ['filesToInclude.js']
            }]
        );
        await Includer.startLoad()
        //
        let moduleFiles = Includer.getIncludableFileSource(module)
        console.log(moduleFiles)
        let fileName
        let directory
        let className
        let temp = await this.getComponent(moduleFiles, 'Controller')
        if (!temp) {
            Messenger.showAlert('controller file missing: ' + className)
            return false
        }
        // let controllerName =
        // console.log(controllerName)
        let controller =  new (eval ( await this.loadFile(temp)))()
        let serviceModel = undefined
        temp = await this.getComponent(moduleFiles, 'ServiceModel')
        if (temp) {
            serviceModel =  new (eval ( await this.loadFile(temp)))()
        }

        temp = await this.getComponent(moduleFiles, 'Service')
        if (temp) {

            let service = new (eval ( await this.loadFile(temp)))() //DO nicer solution?
            service.init()
            if (serviceModel !== undefined)
                service.model = serviceModel
            controller.service =service

        }
        console.dir(controller)
        // let index = moduleFiles.findIndex(file => file.includes('Service'))
        //
        // let controllerFile = moduleFiles[index]
        //
        //
        // index = moduleFiles.findIndex(file => file.includes('Service'))
        // console.log(index)
        // if (index !== -1)
        // {
        //     let serviceFile = moduleFiles[index]
        //
        // }
        //
        // let moduleName = module.module
        // if (!moduleName.includes('Service'))
        //     moduleName = moduleName + 'Service'
        // if (App.loadedJSFiles.indexOf('modules/service/' + moduleName + '.js') === -1) {
        //     Includer.addFilesToLoad({
        //         callWord: 'moduleServiceLoaded',
        //         id: moduleName,
        //         files: [{
        //             directory: 'modules/service',
        //             fileNames: [moduleName + '.js']
        //         }]
        //     })
        //     try {
        //         await Includer.startLoad()
        //     } catch (e) {
        //         console.log('Includer error')
        //         return false
        //     }
        // }
        // let service = eval(moduleName)
        // if (service.init === undefined) {
        //     AlertPopup.showAlert(this.moduleToLoad.module + 'Service' + ' has no init function')
        //     return
        // }
        // try {
        //     await service.init()
        // } catch (e) {
        //     console.log('servive init error')
        //     return false
        // }
        // this.initiator = new ModuleInitiator(module)
        // let files = this.initiator.getFilesToLoad()
        // if (files === undefined) {
        //     AlertPopup.showAlert('Module task files definition missing: ' + module.task)
        //     return
        // }
        // Includer.addFilesToLoad({
        //     callWord: 'moduleFilesLoaded',
        //     id: module.module + '.' + module.task,
        //     files: files
        // })
        // try {
        //     await Includer.startLoad()
        // } catch (e) {
        //     console.log('Includer startload error')
        //     return false
        // }
        // let controller = this.initiator.initController(module.window, connectedParams)
        // App.addSubModule(controller)
        // return true
    }

    static async loadFile(tempData)
    {
        let [directory, fileName] = tempData
        Includer.addFilesToLoad(
            [{
                directory: directory,
                fileNames: [fileName]
            }]
        )
        await Includer.startLoad()
        console.log(fileName)
        return  fileName.split('.')[0]
    }

    static getComponent(files, componentName) {
        let fileIndex
        let groupIndex = files.findIndex((group) => {
            fileIndex = group.fileNames.findIndex((file) => {
                console.log(file)
                return file.includes(componentName)
            })
            return fileIndex >= 0
        })
        if (groupIndex === -1) return false
        let data = [files[groupIndex].directory, files[groupIndex].fileNames[fileIndex]]
        delete files[groupIndex].fileNames[fileIndex];
        console.log(files)
        return data
    }
}

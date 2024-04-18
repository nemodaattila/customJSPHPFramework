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
        await Includer.loadFileSources(module)
        //
        // let moduleFiles = Includer.getIncludableFileSources(module)
        //
        // console.log(moduleFiles)
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
}

Includer.setIncludableModuleSource(
    'entityHandlerTable', [{
        directory: MODULE_FILE_DIR + 'entityHandler/entityHandlerTable',
        fileNames: [
            'EntityHandlerTableController.js',
            'EntityHandlerTableView.js',
            'EntityHandlerTable.css',
            'EntityHandlerControllerParent.js',
            'EntityCreatorControllerParent.js',
            'EntityEditorControllerParent.js',
            'EntityHandlerViewParent.js'
        ]
    }])
Includer.setIncludableModuleSource(
    'listerTable', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/entityListerTable',
            fileNames: [
                'EntityListerTableController.js',
                'EntityListerTableView.js',
                'EntityListerTable.css',
                'SearchAndOrderParameters.js',
                'EntityListerControllerParent.js'
            ]
        }])
Includer.setIncludableModuleSource(
    'pageTurner', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/entityListerTable',
            fileNames: [
                'PageTurnerController.js',
                'PageTurner.css',
            ]
        }])
Includer.setIncludableModuleSource(
    'listerTableSearchConnector', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/entityListerTable',
            fileNames: [
                'EntityListerTableSearchConnector.js',
            ]
        }])
Includer.setIncludableModuleSource(
    'infinityScroller', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/entityListerTable',
            fileNames: [
                'InfinityScrollerController.js',
                'InfinityScroller.css',
            ]
        }])
Includer.setIncludableModuleSource(
    'entityServiceParent', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/entityServiceParent',
            fileNames: [
                'EntityServiceControllerParent.js',
                'EntityServiceModelParent.js',
            ]
        }])


Includer.setIncludableModuleSource(
    'entityHandlerInputObjects', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/entityHandlerInputObjects',
            fileNames: [
                'TableInputParent.js',
                'NumberTableInput.js',
                'StringTableInput.js',
                'SelectTableInput.js',
            ]
        }])

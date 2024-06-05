Includer.setIncludableFileSource(
    'entityHandlerTable', [{
        directory: MODULE_FILE_DIR + 'entityHandler/entityHandlerTable',
        fileNames: [
            'EntityHandlerTableController.js',
            'EntityHandlerTableView.js',
            'EntityHandlerTable.css',
            // 'SearchAndOrderParameters.js',
            'EntityHandlerControllerParent.js',
            'EntityHandlerViewParent.js'
        ]
    }])
Includer.setIncludableFileSource(
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
Includer.setIncludableFileSource(
    'pageTurner', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/entityListerTable',
            fileNames: [
                'PageTurnerController.js',
                'PageTurner.css',
            ]
        }])
Includer.setIncludableFileSource(
    //DO rename
    'listerTableSearchConnector', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/entityListerTable',
            fileNames: [
                'EntityListerTableSearchConnector.js',
            ]
        }])
Includer.setIncludableFileSource(
    'infinityScroller', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/entityListerTable',
            fileNames: [
                'InfinityScrollerController.js',
                'InfinityScroller.css',
            ]
        }])
Includer.setIncludableFileSource(
    'entityServiceParent', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/entityServiceParent',
            fileNames: [
                'EntityServiceParent.js',
                'EntityDataServiceModelParent.js',
            ]
        }])

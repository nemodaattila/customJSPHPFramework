Includer.setIncludableFileSource(
    'dataHandlerTable', [{
        directory: MODULE_FILE_DIR + 'entityHandler/dataHandlerTable',
        fileNames: [
            'HandlerTable.js',
            'HandlerTableView.js',
            'HandlerTable.css',
            // 'SearchAndOrderParameters.js',
            'HandlerControllerParent.js',
            'HandlerViewParent.js'
        ]
    }])
Includer.setIncludableFileSource(
    'listerTable', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/dataListerTable',
            fileNames: [
                'ListerTable.js',
                'ListerTableView.js',
                'ListerTable.css',
                'SearchAndOrderParameters.js',
                'ListerControllerParent.js'
            ]
        }])
Includer.setIncludableFileSource(
    'pageTurner', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/dataListerTable',
            fileNames: [
                'PageTurnerController.js',
                'PageTurner.css',
            ]
        }])
Includer.setIncludableFileSource(
    //DO rename
    'listerTableSearchConnector', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/dataListerTable',
            fileNames: [
                'ListerTableSearchConnector.js',
            ]
        }])
Includer.setIncludableFileSource(
    'infinityScroller', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/dataListerTable',
            fileNames: [
                'InfinityScrollerController.js',
                'InfinityScroller.css',
            ]
        }])
Includer.setIncludableFileSource(
    'dataServiceParent', [
        {
            directory: MODULE_FILE_DIR + 'entityHandler/dataServiceParent',
            fileNames: [
                'ServiceParent.js',
                'DataServiceModelParent.js',
            ]
        }])

Includer.setIncludableFileSource(
    'listerTable', [
        {
            directory: MODULE_FILE_DIR + 'dataHandlerTable',
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
            directory: MODULE_FILE_DIR + 'dataHandlerTable',
            fileNames: [
                'PageTurnerController.js',
                'PageTurner.css',
            ]
        }])
Includer.setIncludableFileSource(
    'pageTurnerInitiator', [
        {
            directory: MODULE_FILE_DIR + 'dataHandlerTable',
            fileNames: [
                'PageTurnerInitiator.js',
            ]
        }])

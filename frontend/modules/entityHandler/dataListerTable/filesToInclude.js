Includer.setIncludableFileSource(
    'listerTable', [
        {
            directory: MODULE_FILE_DIR + 'dataListerTable',
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
            directory: MODULE_FILE_DIR + 'dataListerTable',
            fileNames: [
                'PageTurnerController.js',
                'PageTurner.css',
            ]
        }])
Includer.setIncludableFileSource(
    //DO rename
    'listerTableSearchConnector', [
        {
            directory: MODULE_FILE_DIR + 'dataListerTable',
            fileNames: [
                'ListerTableSearchConnector.js',
            ]
        }])
Includer.setIncludableFileSource(
    'infinityScroller', [
        {
            directory: MODULE_FILE_DIR + 'dataListerTable',
            fileNames: [
                'InfinityScrollerController.js',
                'InfinityScroller.css',
            ]
        }])

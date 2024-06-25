Includer.setIncludableModuleSource(
    'billLister', [
        {
            directory: MODULE_FILE_DIR + 'bills',
            fileNames: [
                'BillService.js',
                'BillServiceModel.js',
            ]
        },
        {
            directory: MODULE_FILE_DIR + 'bills/BillLister',
            fileNames: [
                'BillListerController.js',
            ]
        },
    ])
Includer.setIncludableModuleSource(
    'billCreator', [
        {
            directory: MODULE_FILE_DIR + 'bills',
            fileNames: [
                'BillService.js',
                'BillServiceModel.js',
            ]
        },
        {
            directory: MODULE_FILE_DIR + 'bills/BillCreator',
            fileNames: [
                'BillCreatorController.js',
            ]
        },
    ])
Includer.setIncludableModuleSource(
    'billEditor', [
        {
            directory: MODULE_FILE_DIR + 'bills',
            fileNames: [
                'BillService.js',
                'BillServiceModel.js',
            ]
        },
        {
            directory: MODULE_FILE_DIR + 'bills/BillEditor',
            fileNames: [
                'BillEditorController.js',
            ]
        },
    ])
Includer.setIncludableModuleSource(
    'multipleBillEditor', [
        {
            directory: MODULE_FILE_DIR + 'bills',
            fileNames: [
                'BillService.js',
                'BillServiceModel.js',
            ]
        },
        {
            directory: MODULE_FILE_DIR + 'bills/BillMultipleEditor',
            fileNames: [
                'BillMultipleEditorController.js',
            ]
        },
    ])

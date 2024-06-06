Includer.setIncludableFileSource(
    'companyLister', [
        {
            directory: MODULE_FILE_DIR + 'companies',
            fileNames: [
                'CompanyService.js',
                'CompanyServiceModel.js',
            ]
        },
        {
            directory: MODULE_FILE_DIR + 'companies/CompanyLister',
            fileNames: [
                'CompanyListerController.js',
            ]
        },
    ])
Includer.setIncludableFileSource(
    'companyCreator', [
        {
            directory: MODULE_FILE_DIR + 'companies',
            fileNames: [
                'CompanyService.js',
                'CompanyServiceModel.js',
            ]
        },
        {
            directory: MODULE_FILE_DIR + 'companies/CompanyCreator',
            fileNames: [
                'CompanyCreatorController.js',
            ]
        },
    ])
Includer.setIncludableFileSource(
    'companyEditor', [
        {
            directory: MODULE_FILE_DIR + 'companies',
            fileNames: [
                'CompanyService.js',
                'CompanyServiceModel.js',
            ]
        },
        {
            directory: MODULE_FILE_DIR + 'companies/CompanyEditor',
            fileNames: [
                'CompanyEditorController.js',
            ]
        },
    ])

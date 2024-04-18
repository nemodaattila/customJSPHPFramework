Includer.setIncludableFileSource(
    'companyLister',[
        {
            directory: MODULE_FILE_DIR+'companies',
            fileNames: [
                'CompanyService.js',
                'CompanyServiceModel.js',
            ]
        },
        {
        directory: MODULE_FILE_DIR+'companies/CompanyLister',
        fileNames: [
            'CompanyListerController.js',
            // 'CompanyListerView.js',
            // 'CompanyListerModel.js',
            // 'CompanyLister.css'
        ]
    }])

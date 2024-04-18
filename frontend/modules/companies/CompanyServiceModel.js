class CompanyServiceModel extends ServiceModelParent {
    _companyTypes = {0: 'Nem vevő'}
    set companyTypes(types) {
        Object.values(types).forEach(type =>
            this._companyTypes[type.id] = type.name)
    }
}

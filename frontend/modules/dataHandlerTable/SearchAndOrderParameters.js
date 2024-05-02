class SearchAndOrderParameters {
    get offset() {
        return this._offset;
    }

    set offset(value) {
        this._offset = value;
    }

    get actualSort() {
        return this._actualSort;
    }


    get limit() {
        return this._limit;
    }

    set limit(value) {
        this._limit = value;
    }
    _offset = 0;

    _actualSort = ['', 1];

    _limit


        setOrdering(attr, dir) {
        // if (dir === 1)
        //     dir = 'ASC'
        // if (dir === -1)
        //     dir = 'DESC'
        this._actualSort = [attr, (dir === 1 || dir.trim() === 'ASC' ? 1 : -1)]
    }
}

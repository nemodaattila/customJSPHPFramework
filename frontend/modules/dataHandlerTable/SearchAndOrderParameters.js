class SearchAndOrderParameters {
    _offset = 0;

    get offset() {
        return this._offset;
    }

    set offset(value) {
        this._offset = value;
    }

    _actualSort = ['', 1];

    get actualSort() {
        return this._actualSort;
    }

    _limit

    get limit() {
        return this._limit;
    }

    set limit(value) {
        this._limit = value;
    }

    setOrdering(attr, dir) {
        // if (dir === 1)
        //     dir = 'ASC'
        // if (dir === -1)
        //     dir = 'DESC'
        this._actualSort = [attr, (dir === 1 || dir.trim() === 'ASC' ? 1 : -1)]
    }

    getSearchParameters() {
        console.log({
            offset: this.offset,
            sort: this.actualSort,
            limit: this.limit
        })
        return {
            offset: this.offset,
            order: this.actualSort[0],
            orderDir: this.actualSort[1] === 1 ? 'ASC' : "DESC",
            limit: this.limit
        }
    }
}

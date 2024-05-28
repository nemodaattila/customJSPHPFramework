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
        console.dir([attr, dir])
        // if (dir === 1)
        //     dir = 'ASC'
        // if (dir === -1)
        //     dir = 'DESC'
        this._actualSort = [attr, (dir === 1 || isNaN(dir) && dir.trim() === 'ASC' ? 1 : -1)]
    }

        getSearchParameters(type) {
        console.log({
            offset: type === 'next'?this.offset+this.limit:this.offset,
            sort: this.actualSort,
            limit: type === 'next'?3:this.limit
        })
        return {
            offset: type === 'next'?this.offset+this.limit:this.offset,
            order: this.actualSort[0],
            orderDir: this.actualSort[1] === 1 ? 'ASC' : "DESC",
            limit: type === 'next'?3:this.limit
        }
    }

    changePageParams(num) {
        if (num === '+') {
            this.offset += this._limit
        } else if (num === '-') {
            this.offset -= this._limit
            if (this.offset < 0)
                this.offset = 0
        } else this.offset = num * this.limit
    }
}

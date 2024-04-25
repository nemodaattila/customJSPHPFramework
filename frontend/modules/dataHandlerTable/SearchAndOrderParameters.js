class SearchAndOrderParameters {
    offset = 0;

    actualSort = ['', 1];

    limit

        setOrdering(attr, dir) {
        // if (dir === 1)
        //     dir = 'ASC'
        // if (dir === -1)
        //     dir = 'DESC'
        this.actualSort = [attr, (dir === 1 || dir.trim() === 'ASC' ? 1 : -1)]
    }
}

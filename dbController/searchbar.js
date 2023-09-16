class searchbar {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keyword) {
            const keyword = {
                $regex: this.queryStr.keyword,
                $options: "i",
            };

            const searchByKeyword = {
                $or: [
                    { p_name: keyword },
                    { search_category: keyword },
                    { category: keyword },
                ],
            };

            this.query = this.query.find(searchByKeyword);
        }

        return this;
    }
}

module.exports = searchbar;
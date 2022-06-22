const searchInObjArr = (objArr, term) => {
    const searchRegex = new RegExp(term, "ig");
    const newArr = [...objArr];

    const searchResults =
        { term } !== ""
            ? newArr.filter((target) => searchRegex.test(target.name.common))
            : newArr;

    return searchResults;
};

export default searchInObjArr;

const searchInObjArr = (objArr, term) => {
    const searchRegex = new RegExp(term, "i");
    const newArr = [...objArr];

    const searchResults =
        { term } 
            ? objArr.filter((target) => searchRegex.test(target.name.common))
            : objArr;

    return searchResults;
};

export default searchInObjArr;

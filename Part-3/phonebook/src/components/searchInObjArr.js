const searchInObjArr = ( objArr, term, prop) => {
   const searchRegex = new RegExp(term, "ig")
   const newArr = [...objArr]

   // eslint-disable-next-line no-constant-condition
   const searchResults = {term} !== "" 
      ? newArr.filter(target => searchRegex.test(target[prop]))
      : newArr

   return (searchResults)
}

export default searchInObjArr
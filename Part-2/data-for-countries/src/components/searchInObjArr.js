const searchInObjArr = ( objArr, term, prop) => {
  const searchRegex = new RegExp(term, 'ig')
  const newArr = [...objArr]

  const searchResults = {term} !== "" 
  ? newArr.filter(target => searchRegex.test(target[prop]))
  : newArr

  return (searchResults)
}

export default searchInObjArr
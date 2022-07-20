const info = (...params) => {
   console.log(...params)
}

const error = (...params) => {
   console.eroor(...params)
}

module.exports = {
   info,
   error,
}

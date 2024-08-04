console.log(import.meta.url)

const url = new URL(import.meta.url)
const queryParams = new URLSearchParams(url.search)

console.log(queryParams.get('query'))

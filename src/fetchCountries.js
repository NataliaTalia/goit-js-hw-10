

function fetchCountries (searchQuery) {
    console.log(searchQuery);
 return fetch(`https://restcountries.com/v3.1/name/${searchQuery}?fields=name,flags,languages,capital,population`)
.then(response => response.json())
.then (data => data)
.catch(error => console.error(error))
}

export {fetchCountries}

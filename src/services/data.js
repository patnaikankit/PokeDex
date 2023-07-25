export async function getPokemon(url){
    // fetching all the data from the api endpoint
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
    })
}
export async function fetchData(url, page) {
    return await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            return data.results;
        });
}
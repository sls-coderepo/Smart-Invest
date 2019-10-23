const remoteURL = "https://cloud.iexapis.com/stable/stock"
const API_KEY = "pk_4c08428273b94f18bc36d3c411cdba99"
const APIIex = {
    get: (symbol) => {
        return fetch(`${remoteURL}/${symbol}/quote?token=${API_KEY}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        }).then(data => data.json())
        .then((parsedDate)=> {return parsedDate})
      },
}

export default APIIex
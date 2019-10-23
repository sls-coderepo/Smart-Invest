const remoteURL = "https://www.alphavantage.co/query"
const API_KEY = "KROSQN39FT2HC4FX"
const APIStock = {
    get: (symbol, functionType) => {
        return fetch(`${remoteURL}/query?symbol=${symbol}&function=${functionType}&apikey=${API_KEY}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        }).then(data => data.json())
        .then(parsedDate => parsedDate.results)
      },
    search:(keyword) => {
      return fetch(`${remoteURL}/query?keywords=${keyword}&function=SYMBOL_SEARCH&apikey=${API_KEY}`, {
        method:"GET",
        headers:{
          "Content-Type": "application/json"
        },
      }).then(data => data.json())
      .then((parsedData) => {return parsedData.bestMatches})
    }
}

export default APIStock
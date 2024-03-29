const remoteURL = "https://www.alphavantage.co/query"
//const API_KEY = "KROSQN39FT2HC4FX" used
const API_KEY = "NOC4XAL084ZYQSPM"
/* const API_KEY = "KCODD4BUO6XBOZ1L"  */
const APIStock = {
    get: (symbol, functionType) => {
        return fetch(`${remoteURL}/query?symbol=${symbol}&function=${functionType}&apikey=${API_KEY}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        }).then(data => data.json())
        .then((parsedDate) => { return parsedDate})
      },
       getGlobalQuote: (symbol) => {
        return fetch(`${remoteURL}/query?symbol=${symbol}&function=GLOBAL_QUOTE&apikey=${API_KEY}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          },
        }).then(data => data.json())
        .then((parsedDate) => { return parsedDate["Global Quote"]})
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
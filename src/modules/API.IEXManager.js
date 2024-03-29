const remoteURL = "https://cloud.iexapis.com/stable/stock"
const API_KEY = "pk_4c08428273b94f18bc36d3c411cdba99"
//const API_KEY = "pk_cb57d38032bf43aebcce73ba3edcc956" //new

const APIIex = {
    getQuote: (symbol) => {
        return fetch(`${remoteURL}/${symbol}/quote?token=${API_KEY}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(data => data.json())
        .then((parsedDate)=> {return parsedDate})
      },
      getDetailBatch:(symbol) => {
        return fetch(`${remoteURL}/${symbol}/batch?types=quote,news,chart,company,logo&range=1m&last=5&token=${API_KEY}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(data => data.json())
        .then((parsedDate)=> {return parsedDate})
      },
      getMarketBatch:(symbols) => {
        return fetch(`${remoteURL}/market/batch?types=quote&symbols=${symbols}&token=${API_KEY}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then(data => data.json())
        .then((parsedDate)=> {return parsedDate})
      }
     
}

export default APIIex
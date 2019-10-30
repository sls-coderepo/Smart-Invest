const remoteURL = "http://localhost:5003"
const APIStockManager = {
      getStocks: (keyword) => {
        return fetch(`${remoteURL}/stocks?name_like=${keyword}`).then(e => e.json())
      }
}

 export default APIStockManager

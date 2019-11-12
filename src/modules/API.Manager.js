const remoteURL = "http://localhost:5002"
const API = {
      getAll: (database,userId) => {
         return fetch(`${remoteURL}/${database}?userId=${userId}&_sort=date&_order=asc`).then(e => e.json())
       },

      get: (id, userId, database) => {
        return fetch(`${remoteURL}/${database}/${id}?userId=${userId}`).then(e => e.json())
      },

      getUserById: (id) => {
        return fetch(`${remoteURL}/users/${id}`).then(e => e.json())
      },

      getInvestments: (userId) => {
        return fetch(`${remoteURL}/investments/?parentId=0&userId=${userId}`).then(e => e.json())
      },

      getInvestmentBySymbol: (symbol, userId) => {
        return fetch(`${remoteURL}/investments/?symbol=${symbol}&userId=${userId}&parentId=0`).then(e => e.json())
      },

      post: (newObject, database) => {
        return fetch(`${remoteURL}/${database}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newObject)
        }).then(data => data.json())
      },

      getLoginUser: (credentials) =>
      {
        return fetch(`${remoteURL}/users/?userName=${credentials.userName}&password=${credentials.password}`)
                .then(response =>response.json())
      },

      delete: (id, database) => {
        return fetch(`${remoteURL}/${database}/${id}`, {
          method: "DELETE"
        })
          .then(result => result.json())
      },

      update: (editedObject, database) => {
        return fetch(`${remoteURL}/${database}/${editedObject.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedObject)
        }).then(data => data.json());
      },

      updatePartial: (editedObject, database) => {
        return fetch(`${remoteURL}/${database}/${editedObject.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedObject)
        }).then(data => data.json());
      },

      getAlternateStocks: (investmentId, userId) =>
      {
        return fetch(`${remoteURL}/investments/?parentId=${investmentId}&userId=${userId}`).then(e => e.json())
      },
       
      getWatchListBySymbol: (symbol, userId) => {
        return fetch(`${remoteURL}/watchlists/?symbol=${symbol}&userId=${userId}`).then(e => e.json())
      }
}

 export default API

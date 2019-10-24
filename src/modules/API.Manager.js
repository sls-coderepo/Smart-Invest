const remoteURL = "http://localhost:5002"
const API = {
      getAll: (database) => {
         return fetch(`${remoteURL}/${database}?_sort=date&_order=asc`).then(e => e.json())
       },
      get: (id, database) => {
        return fetch(`${remoteURL}/${database}/${id}`).then(e => e.json())
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
        return fetch(`${remoteURL}/users/?$where=userName=${credentials.userName}&password=${credentials.password}`)
                .then(response =>response.json())
      }
     
    
}

 
 
export default API

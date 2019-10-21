const remoteURL = "http://localhost:5002"
const API = {
    post: (newObject, database) => {
        return fetch(`${remoteURL}/${database}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newObject)
        }).then(data => data.json())
      },
}

export default API

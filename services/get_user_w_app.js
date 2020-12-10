export function getUsersWApp() {
  return fetch('http://54.166.209.233/users/_find', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      selector : {
        active: true
      }
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson['docs'];
    })
    .catch(error => {
      console.error(error);
    });
}
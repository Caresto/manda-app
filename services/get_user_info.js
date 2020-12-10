export function getUserInfo(username) {
  return fetch('http://54.166.209.233/users/_find', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      selector : {
        name : username,
        active: true
      }
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      return responseJson['docs'][0];
    })
    .catch(error => {
      console.error(error);
    });
}
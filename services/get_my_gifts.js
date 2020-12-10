export function getListAsync(user) {
  return fetch('http://54.166.209.233/gifts/_find', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      selector : {
        to_email: user
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
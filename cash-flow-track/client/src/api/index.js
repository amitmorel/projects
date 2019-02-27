const baseUrl = 'https://cash-flow-server-9n0suhbpt.now.sh/records/'

async function getRecords() {
  const result = await fetch(baseUrl)
  return result.json()
}

function removeServer(id) {
  return fetch(baseUrl + '' + id, {
    method: 'DELETE',
    headers: {"Content-Type": "application/json"}
  })
}

function addServer(record_name, location, income, amount, details) {
  return fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify({
      'record_name': record_name,
      'location': location,
      'income': income,
      'amount': amount,
      'details': details
    }),
    headers: {"Content-Type": "application/json"}
  })

}

function editServer(id, record_name, location, income, amount, details) {
  return fetch(baseUrl + id, {
    method: 'PUT',
    body: JSON.stringify({
      'record_name': record_name || undefined,
      'location': location || undefined,
      'income': income || false,
      'amount': amount || 0,
      'details': details || undefined
    }),
    headers: {"Content-Type": "application/json"}
  })
}

const api = { getRecords, removeServer, addServer, editServer }
export default api

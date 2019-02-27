  import baseURL from './baseUrlToggle'
  // const baseURL = "https://abnb-clone-server-da91mqwyt.now.sh/houses/"; // ExpressJS Server
  // const baseURL = 'https://abnb-server-python-9n9c9w14m.now.sh/houses/' // Python Server

async function getAllData() {
  const response = await fetch(baseURL)
  return response.json()
}

async function getOneData(id) {
  const response = await fetch(baseURL + id)
  return response.json()
}

function postBooking(id, bookingsNewArray) {
  return fetch(baseURL + id, {
    method: "PUT",
    body: JSON.stringify({ bookings: bookingsNewArray }),
    headers: { "Content-Type": "application/json" }
  });
}
const api = { getAllData, getOneData, postBooking }
export default api;

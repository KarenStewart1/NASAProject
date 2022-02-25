// we specified port 8000 since the client is running on port 3000 and backend is runnign on 8000
const API_URL = "http://localhost:8000";
// Load planets and return as JSON.
async function httpGetPlanets() {
  // we use fetch function that's built into our browser. it returns a promise and is an async function so we use the await keyword.
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}
// Note that despite the method being named json(), the result is not JSON but is instead the result of taking JSON as input and parsing it to produce a JavaScript object.

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
  // JSON.stringify(converts JS object to JSON string)
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      body: JSON.stringify(launch),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return { ok: false };
  }
}

// Delete launch with given ID.
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch (err) {
    {
      console.log(err);
      return {
        ok: false,
      };
    }
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };

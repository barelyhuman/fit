export async function sendErrorResponse(response) {
  var error = new Error(response.statusText);
  error.response = response;
  error.error = await response.json();
  return Promise.reject(error);
}

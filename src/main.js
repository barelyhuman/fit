const isFetchAvailable = () => (window && window.fetch ? true : false);

const generateRange = (start, end) => {
  const length = Math.abs(end - start);
  const array = Array.from({ length }, (_, i) => {
    return i + start;
  });
  array.push(end);
  return array;
};

const rejectStatusCodes = []
  .concat(generateRange(400, 499))
  .concat(generateRange(500, 599));

const shouldReject = (statusCode) =>
  rejectStatusCodes.indexOf(statusCode) > -1 ? true : false;

function main(url) {
  if (!isFetchAvailable()) {
    throw new Error("Sorry bruh, can't run in a fetch-less environment.");
  }
  return createInstanceWithURL(url);
}

function createInstanceWithURL(url) {
  const config = { url: url };
  return {
    get: () => _get(config),
    post: () => _post(config, body),
    put: () => _put(config, body),
    delete: () => _delete(config),
  };
}

function _get(config) {
  return fetch(config.url, {
    method: "GET",
  }).then((res) => {
    if (shouldReject(res.status)) {
      return sendErrorResponse(res);
    }
    return res.json();
  });
}

function _post(config, body) {
  return fetch(config.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (shouldReject(res.status)) {
      return sendErrorResponse(res);
    }
    return res.json();
  });
}

function _put(config, body) {
  return fetch(config.url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (shouldReject(res.status)) {
      return sendErrorResponse(res);
    }
    return res.json();
  });
}

function _delete(config) {
  return fetch(config.url, {
    method: "DELETE",
  }).then((res) => {
    if (shouldReject(res.status)) {
      return sendErrorResponse(res);
    }
    return res.json();
  });
}

async function sendErrorResponse(response) {
  var error = new Error(response.statusText);
  error.response = response;
  error.error = await response.json();
  return Promise.reject(error);
}

export default main;

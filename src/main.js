import { isFetchAvailable } from "./isFetchAvailable";
import { generateRange } from "./generateRange";
import { sendErrorResponse } from "./sendErrorResponse";
import { decideContentTypeHeader } from "./decideContentTypeHeader";

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
    get: (options) => _get(config, options),
    post: (body, options) => _post(config, body, options),
    put: (body, options) => _put(config, body, options),
    patch: (body, options) => _patch(config, body, options),
    delete: (options) => _delete(config, options),
  };
}

function _get(config, options = {}) {
  const _options = Object.assign({}, options, {
    method: "GET",
  });
  return fetch(config.url, _options).then((res) => {
    if (shouldReject(res.status)) {
      return sendErrorResponse(res);
    }
    return res.json();
  });
}

function _post(config, body, options = {}) {
  const { body: _body, contentHeader } = decideContentTypeHeader(body);

  const _options = Object.assign({}, options, {
    method: "POST",
    headers: {
      "Content-Type": contentHeader,
    },
    body: _body,
  });
  return fetch(config.url, _options).then((res) => {
    if (shouldReject(res.status)) {
      return sendErrorResponse(res);
    }
    return res.json();
  });
}

function _put(config, body, options = {}) {
  const { body: _body, contentHeader } = decideContentTypeHeader(body);

  const _options = Object.assign({}, options, {
    method: "PUT",
    headers: {
      "Content-Type": contentHeader,
    },
    body: _body,
  });
  return fetch(config.url, _options).then((res) => {
    if (shouldReject(res.status)) {
      return sendErrorResponse(res);
    }
    return res.json();
  });
}

function _patch(config, body, options = {}) {
  const { body: _body, contentHeader } = decideContentTypeHeader(body);
  const _options = Object.assign({}, options, {
    method: "PATCH",
    headers: {
      "Content-Type": contentHeader,
    },
    body: _body,
  });
  return fetch(config.url, _options).then((res) => {
    if (shouldReject(res.status)) {
      return sendErrorResponse(res);
    }
    return res.json();
  });
}

function _delete(config, options = {}) {
  const _options = Object.assign({}, options, {
    method: "DELETE",
  });
  return fetch(config.url, _options).then((res) => {
    if (shouldReject(res.status)) {
      return sendErrorResponse(res);
    }
    return res.json();
  });
}

export default main;

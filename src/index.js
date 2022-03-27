import { generateRange } from "./generate-range";

const methods = ["get", "post", "put", "patch", "delete"];

/**
 * @description tail function based on http methods to trigger a network request
 * @callback RequestMethod
 * @param {Record<string,unknown>} [body]
 * @param {Record<string,unknown>} [overrideOptions]
 */

/**
 * @typedef {object} HTTPMethodFuncs
 * @property {RequestMethod} get
 * @property {RequestMethod} post
 * @property {RequestMethod} put
 * @property {RequestMethod} patch
 * @property {RequestMethod} delete
 */

const clamp = Object.assign;

const rejectStatusCodes = []
  .concat(generateRange(400, 499))
  .concat(generateRange(500, 599));

function decideContentTypeHeader(body) {
  const contentTypes = {
    json: "application/json",
    buffer: "application/octet-stream",
    text: "text/html",
  };

  let selectedContentType = "buffer";

  let _body = clamp({}, body);
  if (typeof body === "string") {
    selectedContentType = "text";
  } else if (
    typeof body === "object" ||
    typeof body === "boolean" ||
    typeof body === "number"
  ) {
    if (_body === null) {
      _body = "";
    }
    _body = JSON.stringify(_body);
    selectedContentType = "json";
  } else {
    selectedContentType = "text";
  }

  return {
    b: _body,
    h: contentTypes[selectedContentType],
  };
}

/**
 *
 * @param {any} options
 * @returns {Promise<any>}
 */
function createFetcher(options) {
  const url = options.url;
  const _fetch = options.fetch;

  // nullify extra props
  options.url = void 0;
  options.fetch = void 0;

  return _fetch(url, clamp({}, options)).then(async (res) => {
    if (rejectStatusCodes.indexOf(res.status) > -1) {
      /**
       * @type {any}
       */
      let err = new Error(res.statusText);
      err.response = res;
      err.error = await res.json();
      return Promise.reject(err);
    }
    return res.json();
  });
}

/**
 *
 * @returns {HTTPMethodFuncs}
 */
function methodFunctions(options) {
  const funcs = {};
  for (let i = 0; i < methods.length; i += 1) {
    const method = methods[i];
    funcs[method] = (_body, overrideOptions) => {
      const { b, h } = decideContentTypeHeader(_body);
      const _headers = clamp(options.headers || {}, {
        "content-type": h,
      });
      return createFetcher(
        clamp({}, options, overrideOptions, {
          method: method.toUpperCase(),
        })
      );
    };
  }

  // @ts-ignore
  return funcs;
}

/**
 *
 * @param {string} baseUrl
 * @param {any} [fetchInstance]
 * @returns
 */
export function create(baseUrl, fetchInstance = window.fetch) {
  /**
   * @param {string} appendedUrl
   * @param {Record<string,unknown>=} additionalFetchOptions
   */
  return (appendedUrl, additionalFetchOptions) => {
    const sharedOptions = clamp({}, additionalFetchOptions, {
      fetch: fetchInstance,
      url: baseUrl + appendedUrl,
    });
    return methodFunctions(sharedOptions);
  };
}

/**
 *
 * @param {string} url
 * @param {any} [fetchInstance]
 * @returns
 */
export function createImmediate(url, fetchInstance = window.fetch) {
  return methodFunctions({
    url: url,
    fetch: fetchInstance,
  });
}

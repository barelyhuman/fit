export function decideContentTypeHeader(body) {
  const contentTypes = {
    json: "application/json",
    buffer: "application/octet-stream",
    text: "text/html",
  };

  let selectedContentType = "buffer";

  let _body = body;
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
  }
  return {
    body: _body,
    contentHeader: contentTypes[selectedContentType],
  };
}

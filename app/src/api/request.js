import 'whatwg-fetch';

function handleJSON(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

function parseJSON(response) {
  return response.text().then(
    (text) => text ? handleJSON(text) : {}
  );
}

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  error.details = await parseJSON(response);

  throw error;
}

function makeXMLHttpRequest(url, options) {
  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener('progress', (event) => {
    if (event.lengthComputable) {
      options.reportProgress((event.loaded / event.total) * 100);
    }
  }, false);

  const promise = new Promise((resolve, reject) => {
    xhr.onload = () => resolve(JSON.parse(xhr.responseText));
    xhr.onerror = reject;
  });

  xhr.open(options.method, url);
  xhr.withCredentials = true;
  xhr.send(options.body);

  return promise;
}

export default function request(url, options = { method: 'GET' }) {
  if (options.reportProgress) {
    return makeXMLHttpRequest(url, {
      ...options,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
  const prepOptions = Object.assign(options, { credentials: 'include' });
  return fetch(url, prepOptions)
    .then(checkStatus)
    .then(parseJSON);
}

export function postRequest(url, body, extraHeaders, extraOptions) {
  const options = buildRequestOptionsJsonBody('POST', body, extraHeaders, extraOptions);
  return request(url, options);
}

export const buildRequestOptionsJsonBody = (method, body, extraHeaders, extraOptions) => ({
  method,
  body: JSON.stringify(body),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...extraHeaders,
  },
  ...extraOptions,
});

export function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

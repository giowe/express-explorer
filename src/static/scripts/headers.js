export const getRequestHeaders = (inputs) => {
  const headers = {};
  const headerKeys = [];
  const headerValues = [];

  for (let i = 0; i < inputs.length - 2; i++) {
    const input = inputs[i];

    if (input.getAttribute('target') == 'Headers') {
      if (input.getAttribute('placeholder') == 'key') {
        headerKeys.push(input.value);
      }
      else {
        headerValues.push(input.value);
      }
    }
  }

  for (let i = 0; i < headerKeys.length; i++) {
    headers[headerKeys[i]] = headerValues[i];
  }

  return headers;
};

export const getResponseHeader = (headers) => {
  const keys = [...headers.keys()];
  const values = [...headers.values()];
  const resHeader = {};

  keys.map((key, i) => resHeader[key] = values[i]);

  return resHeader;
};


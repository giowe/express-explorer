export const getRequestHeaders = (inputs) => {
  const headers = {};
  const headerKeys = [];
  const headerValues = [];

  for (let i = 0; i < inputs.length - 2; i++) {
    const input = inputs[i];
    let empty = false;

    if (input.getAttribute('target') === 'Headers') {
      if (input.getAttribute('placeholder') === 'key') {
        empty = !input.value;
        if (!empty) headerKeys.push(input.value);
      }
      else {
        if (!empty) headerValues.push(input.value);
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

export const mergeHeaders = (headers1 = {}, headers2 = {}) => {
  return Object.assign(headers1, headers2)
};

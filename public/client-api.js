function clientApi(baseUrl, fnErrorHandler) {
  const BASE_URL = `${baseUrl}${baseUrl.at(-1) === '/' ? '' : '/'}`;

  async function issueRequest(url, opts) {
    const response = await fetch(url, opts);
    const { status, statusText } = response;
    return response.ok
      ? await response.json()
      : fnErrorHandler({ status, statusText });
  }

  return {
    create(data) {
      return issueRequest(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    read(queryString = '') {
      return issueRequest(`${BASE_URL}${queryString}`, {
        method: 'GET',
      });
    },
    update(data) {
      return issueRequest(`${BASE_URL}${data.id ?? ''}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    modify(data) {
      return issueRequest(`${BASE_URL}${data.id ?? ''}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },
    delete(id) {
      return issueRequest(`${BASE_URL}${id}`, {
        method: 'DELETE',
      });
    },
  };
}

export default clientApi;

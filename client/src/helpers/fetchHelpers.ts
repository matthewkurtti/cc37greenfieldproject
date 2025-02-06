export const getData = async (url: string, endpoint: string) => {
  const response = await fetch(`${url}${endpoint}`);
  const result = await response.json();
  return result;
};

export const deleteData = async (id: number, url: string, endpoint: string) => {
  const response = await fetch(`${url}${endpoint}/${id}`, { method: 'DELETE' });
  const result = await response.json();
  return result;
};

export const postData = async (
  url: string,
  endpoint: string,
  contentType: string = 'application/json',
  objToPost: object
) => {
  const response = await fetch(`${url}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body: JSON.stringify(objToPost),
  });
  const result = await response.json();
  return result;
};

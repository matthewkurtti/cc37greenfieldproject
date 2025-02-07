export const getData = async (
  url: string,
  endpoint: string,
  id: number | null = null
) => {
  try {
    let response;
    if (id === null) {
      response = await fetch(`${url}${endpoint}`, { credentials: 'include' });
    } else {
      response = await fetch(`${url}${endpoint}/${id}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error getting data ', error);
  }
};

export const deleteData = async (url: string, endpoint: string, id: number) => {
  try {
    const response = await fetch(`${url}${endpoint}/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error deleting data ', error);
  }
};

export const postData = async (
  url: string,
  endpoint: string,
  objToPost: object,
  contentType: string = 'application/json'
) => {
  try {
    const response = await fetch(`${url}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': contentType },
      body: JSON.stringify(objToPost),
      credentials: 'include',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error posting data ', error);
  }
};

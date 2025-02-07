// Ensure the DOM is fully loaded before accessing elements
document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('uploadForm') as HTMLFormElement;
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  const messageDiv = document.getElementById('message') as HTMLDivElement;

  uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const file = fileInput.files?.[0];

    if (!file) {
      messageDiv.textContent = 'No file selected';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/user/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include' // Include cookies in the request
      });

      const data = await response.json();

      if (response.ok) {
        messageDiv.textContent = 'File uploaded successfully';
        console.log('Uploaded file:', data.stem);
      } else {
        messageDiv.textContent = data.message;
      }
    } catch (error) {
      console.error('Error:', error);
      messageDiv.textContent = 'An error occurred';
    }
  });
});
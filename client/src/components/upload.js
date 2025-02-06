document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        document.getElementById('message').textContent = 'No file selected';
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
            document.getElementById('message').textContent = 'File uploaded successfully';
            console.log('Uploaded file:', data.stem);
        } else {
            document.getElementById('message').textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred';
    }
});
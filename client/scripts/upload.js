document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', e.target.image.files[0]);

    fetch('/images/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('uploadStatus').innerHTML = `Upload successful! Image URL: <a href="${data.url}">${data.url}</a>`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('uploadStatus').textContent = 'Upload failed';
    });
});

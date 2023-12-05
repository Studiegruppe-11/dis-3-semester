// root/client/scripts/upload.js

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    const files = e.target.image.files;

    for(let i = 0; i < files.length; i++) {
        formData.append('image', files[i]);
    }

    fetch('/images/upload/images', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if (data.url) {
            document.getElementById('uploadStatus').innerHTML = `Upload successful! Image URL: <br>${data.url}`;
        } else {
            document.getElementById('uploadStatus').textContent = 'Upload successful but no URL returned.';
        }
    })
    .catch(error => {
        console.error('Error:', error, error.msg, error.stack);
        document.getElementById('uploadStatus').textContent = 'Upload failed: ' + error, error.msg, error.stack;
    });
});

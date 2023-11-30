const { response } = require("express");

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
        const uploadedUrls = data.urls.join('<br>');
        document.getElementById('uploadStatus').innerHTML = `Upload successful! Image URLs: <br>${uploadedUrls}`;
    })
    .catch(error => {
        console.error('Error:', error, error.msg, error.stack);
        console.log(response.json)
        document.getElementById('uploadStatus').textContent = 'Upload failed: ' + error, error.msg, error.stack;
    });
    
});

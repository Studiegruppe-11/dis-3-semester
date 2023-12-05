// root/client/scripts/upload.js

document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    const files = e.target.image.files;

    for(let i = 0; i < files.length; i++) {
        formData.append('image', files[i]); // 'image' should match the field name expected by multer
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
        if (data.urls && data.urls.length > 0) { 
            const uploadedUrls = data.urls.join('<br>');
            document.getElementById('uploadStatus').innerHTML = `Upload successful! Image URLs: <br>${uploadedUrls}`;
        } else {
            document.getElementById('uploadStatus').textContent = 'Upload successful but no URLs returned.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('uploadStatus').textContent = 'Upload failed: ' + error;
    });
});

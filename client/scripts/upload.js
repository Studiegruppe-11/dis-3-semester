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
    .then(response => response.json())
    .then(data => {
        const uploadedUrls = data.urls.join('<br>');
        document.getElementById('uploadStatus').innerHTML = `Upload successful! Image URLs: <br>${uploadedUrls}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('uploadStatus').textContent = 'Upload failed';
    });
});

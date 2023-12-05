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
            const links = data.urls.map(url => `<a href="${url}" target="_blank">${url}</a>`).join('<br>');
            document.getElementById('uploadStatus').innerHTML = `Upload successful! <br>${links}`;
        
            // Add a slight delay before fetching images
            setTimeout(fetchImagesFromCDN, 1000); // Delay of 1 second
        } else {
            document.getElementById('uploadStatus').textContent = 'Upload successful but no URLs returned.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('uploadStatus').textContent = 'Upload failed: ' + error;
    });
});

function fetchImagesFromCDN() {
    fetch('/images/fetch')
      .then(response => response.json())
      .then(urls => {
        const container = document.getElementById('cdnImages');
        container.innerHTML = ''; // Clear existing images before appending new ones
        urls.forEach(url => {
          const img = document.createElement('img');
          img.src = url;
          img.style.width = '100px'; // adjust as needed
          img.style.height = '100px'; // adjust as needed
          img.style.objectFit = 'cover';
          img.style.marginRight = '10px';
          img.style.borderRadius = '5px';
          container.appendChild(img);
        });
      })
      .catch(error => console.error('Error fetching images:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    fetchImagesFromCDN();
});

function previewImages() {
    var preview = document.getElementById('preview');
    var fileChosen = document.getElementById('file-chosen');
    preview.innerHTML = '';
    if (this.files) {
        fileChosen.textContent = `${this.files.length} file(s) chosen`;
        [].forEach.call(this.files, readAndPreview);
    } else {
        fileChosen.textContent = 'No files chosen';
    }

    function readAndPreview(file) {
        // Make sure `file.name` matches our extensions criteria
        if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
            return alert(file.name + " is not an image");
        } 

        var reader = new FileReader();

        reader.addEventListener("load", function() {
            var image = new Image();
            image.height = 100;
            image.title = file.name;
            image.src = this.result;
            preview.appendChild(image);
        });

        reader.readAsDataURL(file);
    }
}

document.getElementById('fileInput').addEventListener('change', previewImages);
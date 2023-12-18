window.addEventListener("DOMContentLoaded", async () => {
    // Tjekker login-status og viser brugerens navn
    try {
      const response = await fetch("/admins/show");
      const result = await response.json();
  
      if (result.adminUserId && result.adminName) {
        // Opdaterer brugergrænsefladen med admin-brugerens navn
        document.getElementById("usernameDisplay").innerHTML = "Logget ind som: " + result.adminName;
      }
      else {
        // Omdirigerer til login-siden, hvis brugeren ikke er logget ind
        window.location.href = "/admin/login";
      }
    } catch (error) {
        console.log(error);
        // Håndterer eventuelle fejl i forbindelse med brugeroplysninger
      }
    });  


// Håndtering af billedupload
document.getElementById('uploadForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData();
    const files = e.target.image.files;

    for(let i = 0; i < files.length; i++) {
        formData.append('image', files[i]);
    }

    // Sender billedfiler til serveren og håndterer respons
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
            // Viser links til de uploadede billeder
            const links = data.urls.map(url => `<a href="${url}" target="_blank" style="color: #f7c1d9; margin-top: 10px; margin-bottom: 10px;">${url}</a>`).join('<br>');
            document.getElementById('uploadStatus').innerHTML = `Upload successful! Her er dine links: <br>${links}`;
        
            // Forsinker visning af billeder for at sikre fuld upload
            setTimeout(fetchImagesFromCDN, 2000);
        } else {
            document.getElementById('uploadStatus').textContent = 'Upload successful but no URLs returned.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('uploadStatus').textContent = 'Upload failed: ' + error;
    });
});

// Indlæser og viser billeder fra CDN
function fetchImagesFromCDN() {
    fetch('/images/fetch')
      .then(response => response.json())
      .then(urls => {
        const container = document.getElementById('cdnImages');
        container.innerHTML = ''; // Renser containeren før nye billeder tilføjes
        urls.forEach(url => {
          // Opretter og tilføjer hvert billede til containeren
          const img = document.createElement('img');
          img.src = url;
          img.style.width = '100px'; 
          img.style.height = '100px';
          img.style.objectFit = 'cover';
          img.style.marginRight = '10px';
          img.style.borderRadius = '5px';
          container.appendChild(img);
        });
      })
      .catch(error => console.error('Error fetching images:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    // Indlæser billeder fra CDN ved sidenindlæsning
    fetchImagesFromCDN();
});

// Forhåndsvisning af valgte billedfiler
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

    // Læser og forhåndsviser hver fil
    function readAndPreview(file) {
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

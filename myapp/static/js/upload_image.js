import db from './db.js';

const uploadForm = document.getElementById('uploadForm');

// form submission
uploadForm.addEventListener('change', async function(event) {
    if (event.target.id == 'fileInput') {
        const file = event.target.files[0];

        try {
            const response = await fetch('.', {
                method: 'POST',
                body: new FormData(this),
            });
            
            if (response.ok) {
                const data = await response.json();
    
                if (data.status !== 302 && data.status !== 202) {
                    console.error(`Not a valid image ${data.error}`);
                } else {
                    if (data.status === 302) {
                        // If user is logged in, get image id from database
                        const fileWithId = {
                            file: file,
                            secondary: data.id
                        };
                        var imgId = await db.images.add(fileWithId);
                    } else {
                        // If user is not logged in
                        var imgId = await db.images.add(file);
                    }
                    window.location.href = `/workspace/${imgId}`;
                }
            } else {
                throw new Error(response.status);
            }
        } catch(error) {
            console.error(`Image upload was unsuccessful: ${error}`);
        }
    }
});

// if user is not logged in, get images from indexedDB
document.addEventListener('DOMContentLoaded', () => {
    async function displayImages() {
        let images = await db.images.toArray();
        images = images.slice(-3);

        const imageContainer = document.getElementById('imageContainer');
        images.forEach((image) => {
            // create frame for each image
            const frameElement = document.createElement('div');
            frameElement.id = image.id;
            imageContainer.appendChild(frameElement);
            
            frameElement.addEventListener('click', () => {
                window.location.href = `/workspace/${frameElement.id}`;
            });
            
            // fit image in each frame
            const imgElement = document.createElement('img');
            imgElement.src = URL.createObjectURL(image);
            frameElement.appendChild(imgElement);
        });

        const frameElement = document.createElement('div');
        frameElement.innerText = 'Login to access more images';
        imageContainer.appendChild(frameElement);
        
        frameElement.addEventListener('click', () => {
            // redirect to login or directory if logged in
        });
    }

    displayImages().catch((error) => {
        console.error('Failed to display images:', error);
    })
})

function openImage(id) {
    console.log(id);
}
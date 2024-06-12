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
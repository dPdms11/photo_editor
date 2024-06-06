const uploadForm = document.getElementById("uploadForm")
document.getElementById("fileInput").addEventListener("change", () => {
    console.log(indexedDB.open());
    // uploadForm.submit();
})

uploadForm.addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    try {
        const response = await fetch(".", {
            method: "POST",
            body: formData,
        });
        
        if (response.ok) {
            const data = await response.json();
            // User is logged in
            if (data.status === 302) {
                let img = data.id;
                window.location.href = `workspace/${img}/`;
            // User is NOT logged in
            }else if (data.status === 202) {
                // save to indexedDB
            }else {
                console.error("Not a valid image" + data.error);
            }
        } else {
            throw new Error(response.status);
        }
    } catch(error) {
        console.error(`Image upload was unsuccessful: ${error}`);
    }
});
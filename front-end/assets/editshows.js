function createShowElement(data) {
    const show = document.createElement("div");
    show.className = "show";

    const header = document.createElement("h2");
    header.textContent = data["name"];
    show.appendChild(header);

    const content = document.createElement("p");
    content.textContent = data["description"];
    show.appendChild(content);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
        const form = document.createElement("form");
        const textarea = document.createElement("textarea");
        textarea.textContent = data["show_description"];
        form.appendChild(textarea);

        const submitButton = document.createElement("button");
        submitButton.textContent = "Submit";
        form.appendChild(submitButton);

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const newContent = textarea.value;
            const options = {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    show_description: newContent
                })
            };
            const response = await fetch(`http://localhost:3000/plays/${data.show_id}`, options);
            if (response.status == 200) {
                window.location.reload();
            }
        });

        show.replaceChild(form, content);
    });
    show.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
        const options = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        const response = await fetch(`http://localhost:3000/plays/${data.show_id}`, options);
        if (response.status == 204) {
            show.remove();
        }
    });
    show.appendChild(deleteButton);

    return show;
}

document.getElementById("create-show").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            show_name: form.get("show_name"),
            show_description: form.get("show_description")
            // Add more form fields as required by the show creation
        })
    };

    const result = await fetch("http://localhost:3000/plays", options);

    if (result.status == 201) {
        window.location.reload();
    }
})

async function loadShows() {
    const response = await fetch("http://localhost:3000/plays");

    if (response.status == 200) {
        const shows = await response.json();

        const container = document.getElementById("shows");

        shows.forEach(s => {
            const elem = createShowElement(s);
            container.appendChild(elem);
        });
    } else {
        window.location.assign("./editshows.html");
    }
}

loadShows();

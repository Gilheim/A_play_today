window.onload = function () {
    // Get the playId from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const playId = urlParams.get('playId');

    // Fetch the play's data
    fetch(`http://localhost:3000/plays/${playId}`)
        .then(response => response.json())
        .then(play => {
            // Populate the form with the play's current data
            document.querySelector('#name').value = play.name;
            document.querySelector('#description').value = play.description;
            document.querySelector('#end_date').value = play.end_date;
            document.querySelector('#genre').value = play.genre;
            document.querySelector('#duration').value = play.duration;
            document.querySelector('#poster').value = play.poster;
            document.querySelector('#price').value = play.price;

            // Fetch all theatres
            fetch(`http://localhost:3000/theatres`)
                .then(response => response.json())
                .then(theatres => {
                    // Populate the theatre dropdown with the fetched theatre names
                    const theatreDropdown = document.querySelector('#theatre');
                    theatres.forEach(theatre => {
                        const option = document.createElement('option');
                        option.value = theatre.id;
                        option.text = theatre.name;
                        theatreDropdown.appendChild(option);
                    });

                    // Set the selected option to the play's current theatre
                    theatreDropdown.value = play.theatre_id;
                });
        });

    // Handle form submission
    document.querySelector('#edit-play-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Update the play's data
        fetch(`http://localhost:3000/plays/${playId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: document.querySelector('#name').value,
                description: document.querySelector('#description').value,
                end_date: document.querySelector('#end_date').value,
                genre: document.querySelector('#genre').value,
                duration: document.querySelector('#duration').value,
                poster: document.querySelector('#poster').value,
                price: document.querySelector('#price').value,
                theatre_name: document.querySelector('#theatre option:checked').text,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Redirect user back to the main page after the play has been updated
                window.location.href = `http://127.0.0.1:5500/front-end/editshows.html`;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    // Handle delete play button click
    document.querySelector('#delete-play-button').addEventListener('click', function () {
        // Ask for confirmation before deleting
        if (window.confirm("Are you sure you want to delete this play?")) {
            // If confirmed, send DELETE request
            fetch(`http://localhost:3000/plays/${playId}`, {
                method: 'DELETE'
            })
            .then(() => {
                // Redirect user back to the main page after the play has been deleted
                window.location.href = `http://127.0.0.1:5500/front-end/editshows.html`;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    });
};

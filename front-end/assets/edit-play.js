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
            document.querySelector('#theatre_id').value = play.theatre_id;
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
                theatre_id: document.querySelector('#theatre_id').value,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Redirect user back to the main page after the play has been updated
                window.location.href = `http://localhost:3000`;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
};

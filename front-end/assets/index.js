window.onload = function () {
    fetch("http://localhost:3000/plays")
        .then(response => response.json())
        .then(plays => {
            const showcase = document.querySelector("#showcase");

            for (let play of plays) {
                let flipCard = document.createElement("div");
                flipCard.classList.add("flip-card");

                let flipCardInner = document.createElement("div");
                flipCardInner.classList.add("flip-card-inner");

                let flipCardFront = document.createElement("div");
                flipCardFront.classList.add("flip-card-front");
                let img = document.createElement("img");
                img.src = play.poster;
                flipCardFront.appendChild(img);

                let flipCardBack = document.createElement("div");
                flipCardBack.classList.add("flip-card-back");

                let h2 = document.createElement("h2");
                h2.textContent = play.name;
                flipCardBack.appendChild(h2);

                let p1 = document.createElement("p");
                p1.classList.add("showing-at");
                p1.textContent = `Theatre ID: ${play.theatre_id}`; // replace with theatre name if available
                flipCardBack.appendChild(p1);

                let p2 = document.createElement("p");
                p2.classList.add("duration");
                p2.textContent = `Runtime: ${play.duration}`;
                flipCardBack.appendChild(p2);

                let p3 = document.createElement("p");
                p3.classList.add("on-until");
                p3.textContent = `On until: ${play.end_date}`;
                flipCardBack.appendChild(p3);

                let p4 = document.createElement("p");
                p4.textContent = play.description;
                flipCardBack.appendChild(p4);

                flipCardInner.appendChild(flipCardFront);
                flipCardInner.appendChild(flipCardBack);

                flipCard.appendChild(flipCardInner);

                showcase.appendChild(flipCard);
            }
        });
}

document.addEventListener('DOMContentLoaded', function () {

    // alla mina färger
    const colours = ['red', 'blue', 'pink', 'yellow']

    // där alla färgcirklar finns
    const circles = document.querySelector(".colours");

    // lådan jag vill byta färg på
    const box = document.querySelector('.svg1');


    // för varje färg in mina färger
    colours.map((colour) => {
        // skapa en ny DIV
        const colourCircle = document.createElement("div");
        // ge den class .circle
        colourCircle.classList = ["circle"]

        // sätt stil på den
        colourCircle.style = "background-color:" + colour;

        // ge den ett attribut som vi aänvänder när vi klickar på den
        colourCircle.setAttribute("data-colour", colour)

        // lägg till den i DOM så vi ser den
        circles.appendChild(colourCircle);

    })

    // för alla mina cirklar ...
    const circleElements = document.querySelectorAll(".circle")
    circleElements.forEach((circle) => {
        // när jag klickar på en
        circle.addEventListener('click', () => {
            // vill jag hämta färgen via dess attribut
            const color = circle.getAttribute("data-colour")
            // sätta den färgen
            box.style.fill = color

            // ta bort klassen .circle--active från ALLA circklar (här skuylle vi kunna ta bort den från bara dom jag INTE trycker på, men WHATEVS LIFE TO SHORT)
            circleElements.forEach((circle) => {
                circle.classList.remove("circle--active")
            })
            // lägg till klassen .circle--active på JUST DEN JAG KLICKAR PÅ (den som har variabel namn circle )
            circle.classList.add("circle--active")
        });
    });
}, false);
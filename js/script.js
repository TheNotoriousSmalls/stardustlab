const url = "https://keammd21-15ab.restdb.io/rest/products";
const options = {
    headers: {
        "x-apikey": "63297716bf647d0a5c19859e",
    },
};

fetch(url, options)
    .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    })

    .then((data) => {
        console.log(data);
        handleData(data);
    })
    .catch((e) => {
        // Error message
        console.error("An error occured:", e.message);
    });

function handleData(products) {
    products.forEach((product) => {
        //console.log(product);

        // 1. Make a template

        // 2. Grab it
        const template = document.querySelector("template").content;
        // 3. Clone it
        const clone = template.cloneNode(true);
        // 4. Populate with data
        clone.querySelector("div").textContent = product.productName;
        clone.querySelector("div").textContent = product.productName;
        clone.querySelector("div").textContent = product.productName;
        clone.querySelector("div").textContent = product.productName;
        clone.querySelector("div").textContent = product.productName;

        const mainEl = document.querySelector("main");
        mainEl.appendChild(clone);
        // 5. Append it to DOM 


    });
}
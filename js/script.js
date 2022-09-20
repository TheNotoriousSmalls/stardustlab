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

        // 1. Grab template
        const productTemplate = document.querySelector("#productTemplate").content;

        // 2. Create a clone
        const productClone = productTemplate.cloneNode(true);

        // 3. Change content
        productClone.querySelector("div").textContent = product.productName;
        productClone.querySelector("div").textContent = product.productName;
        productClone.querySelector("div").textContent = product.productName;
        productClone.querySelector("div").textContent = product.productName;
        productClone.querySelector("div").textContent = product.productName;

        // 4. Select parent element
        const mainEl = document.querySelector("main");

        // 5. Append it to DOM 
        mainEl.appendChild(clone);

    });
}
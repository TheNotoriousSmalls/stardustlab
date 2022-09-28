/* const DATA_PLACEHOLDER = [{
        "_id": "633054e85057d14f0003e5fa",
        "id": "1",
        "gender": "Women",
        "productcategory": "Bikinis",
        "producttype": "Contest Bikini",
        "productbasecolor": "Black",
        "productprice": 2000,
        "productname": "American Bikini",
        "productsecondarycolor": "Gold, navy",
        "productdescription": "American style bikini with connectors",
        "productimage1": ["633053425057d14f0003e5ed"],
        "productimage2": ["633053635057d14f0003e5ef"],
        "rental": false,
        "productsize": "",
        "bikinicupsize": "C/D",
        "b  ikinibottomsize": "Small"
    }, {
        "_id": "633056385057d14f0003e600",
        "id": "2",
        "gender": "Women",
        "productcategory": "Bikinis",
        "producttype": "Contest Bikini",
        "productbasecolor": "Blue",
        "productprice": 1900,
        "productname": "Russian Bikini",
        "productsecondarycolor": "Blue",
        "productdescription": "Russian style bikini",
        "productimage1": ["633056175057d14f0003e5fc"],
        "productimage2": ["633056285057d14f0003e5fe"],
        "rental": false,
        "productsize": "",
        "bikinicupsize": "C/D",
        "bikinibottomsize": "Large"
    }, {
        "_id": "633057345057d14f0003e606",
        "id": "3",
        "gender": "Women",
        "productcategory": "Bikinis",
        "producttype": "Practice Bikini",
        "productbasecolor": "Purple",
        "productprice": 1500,
        "productname": "Practice Bikini",
        "productsecondarycolor": "",
        "productdescription": "Practice bikini in velvet",
        "productimage1": ["633057065057d14f0003e602"],
        "productimage2": ["633057135057d14f0003e604"],
        "rental": false,
        "productsize": "",
        "bikinicupsize": "C",
        "bikinibottomsize": "Medium"
    },
    {
        "_id": "633057345057d14f0003e606",
        "id": "4",
        "gender": "Men",
        "productcategory": "Bikinis",
        "producttype": "Contest Bikini",
        "productbasecolor": "Red",
        "productprice": 599,
        "productname": "Dominic's Bikini",
        "productsecondarycolor": "",
        "productdescription": "Dominics bikini in velvet",
        "productimage1": ["633057065057d14f0003e602"],
        "productimage2": ["633057135057d14f0003e604"],
        "rental": true,
        "productsize": "",
        "bikinicupsize": "C",
        "bikinibottomsize": "Small"
    }
] */

let products = []
async function fetchData() {


    const url = "https://keammd21-15ab.restdb.io/rest/products";
    const options = {
        headers: {
            "x-apikey": "63297716bf647d0a5c19859e",
        },
    };


    return fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();

        })

        .then((data) => {
            products = data
            return data
        })
        .catch((e) => {
            // Error message
            console.error("An error occured:", e.message);
        });
}

const selectedFilters = {}

function toggleFilter(type, value) {
    console.log('toggleFilters', {
        type,
        value
    })
    selectedFilters[type] = value

    buildProductList()

}

/*

args
filterGroupName: string
filterData: string[] /// ["1", "2", "3"]

*/
function buildFiltersGroup(filterGroupTitle, filterGroupType, filterData) {

    // Find filter group template
    const filterGroupTemplate = document.querySelector("#filter-group-template").content;
    const filterGroup = filterGroupTemplate.cloneNode(true)

    filterGroup.querySelector('.filter-group-title').innerHTML = filterGroupTitle;
    ['All', ...filterData].forEach((filterValue) => {
        const filterItemTemplate = document.querySelector("#filter-item-template").content;
        const filterItem = filterItemTemplate.cloneNode(true)
        filterItem.querySelector('.filter-item-label').innerHTML = filterValue
        filterItem.querySelector('.filter-item').setAttribute('data-filter-type', filterGroupType)
        filterItem.querySelector('.filter-item').setAttribute('data-filter-value', filterValue)

        filterGroup.querySelector('.filter-group-content').appendChild(filterItem)
    })

    return filterGroup
}

function buildFilters() {

    const filtersWrapper = document.querySelector("#filters");

    // Build gender filters
    const genders = products.map((product) => product.gender)
    const uniqueGenders = [...new Set(genders)]
    const gendersFilterGroup = buildFiltersGroup("Gender", "gender", uniqueGenders)


    // Build size filters
    const Bikinibottomsize = products.map((product) => product.bikinibottomsize)
    const uniqueBikinibottomsize = [...new Set(Bikinibottomsize)]
    const BikinibottomsizeFilterGroup = buildFiltersGroup("Size", "bikinibottomsize", uniqueBikinibottomsize)


    // Build color filters
    const basecolor = products.map((product) => product.productbasecolor)
    const uniqueColors = [...new Set(basecolor)]
    const colorfilterGroup = buildFiltersGroup("Color", "productbasecolor", uniqueColors)


    // Add to DOM
    filtersWrapper.appendChild(gendersFilterGroup)
    filtersWrapper.appendChild(BikinibottomsizeFilterGroup)
    filtersWrapper.appendChild(colorfilterGroup)


}
// Function to populate the page based on filters applied
function buildProductList() {

    // Grab template
    const productTemplate = document.querySelector("#product-template").content;
    const mainEl = document.querySelector("main");


    mainEl.innerHTML = ''

    // Check if filter exists
    console.log('buildProductList', {
        selectedFilters
    }) // Return 
    const filteredProducts = products.filter(product => {
        let filterMatch = false
        const filterTypes = Object.keys(selectedFilters)

        filterTypes.forEach(filterType => {
            if (product[filterType] === selectedFilters[filterType]) {
                filterMatch = true
            }
            if (selectedFilters[filterType] === 'All') {
                filterMatch = true
            }
        })

        return filterTypes.length === 0 ? true : filterMatch
    })

    filteredProducts.forEach((product) => {

        // Create a clone
        const productClone = productTemplate.cloneNode(true);

        // Change content
        productClone.querySelector(".product-name").textContent = product.productname;
        productClone.querySelector(".product-type").textContent = product.producttype;
        productClone.querySelector(".product-category").textContent = product.productcategory;
        productClone.querySelector(".product-price").textContent = product.productprice + "DKK";
        productClone.querySelector(".product-size").textContent = "Bottom size: " + product.bikinibottomsize;
        productClone.querySelector(".product-description").textContent = product.productdescription;
        productClone.querySelector("img.product-image").src = ""; //productimage1;
        productClone.querySelector("img.product-image").alt = product.productname;


        // 5. Append it to DOM 
        mainEl.appendChild(productClone);

    });
}

function renderContent() {
    // Hide contentloader
    document.querySelector("#loading-indicator").style = "display:none;"

    // Show content
    buildProductList()
    buildFilters()
}



// Wait for DOM to load, then start app
document.addEventListener('DOMContentLoaded', async function () {

    await fetchData()
    renderContent()

    const filterItemElements = document.querySelectorAll(".filter-item")
    filterItemElements.forEach((filter) => {
        // When I click
        filter.addEventListener('click', () => {
            // Get attributes 
            const filterType = filter.getAttribute("data-filter-type")
            const filterValue = filter.getAttribute("data-filter-value")
            toggleFilter(filterType, filterValue)

        });
    });
}, false);
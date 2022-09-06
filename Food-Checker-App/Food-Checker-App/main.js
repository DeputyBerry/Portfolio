function getFetch(){
    let inputValue = document.getElementById('food').value;
    const url = `https://world.openfoodfacts.org/api/v0/
    product/${inputValue}.json`

    if(inputValue.length !== 12){
        alert('Please enter a valid barcode');
        return;
    }

    fetch(url)
    .then(response => response.json()) // parse response as JSON
    .then(data => {
        console.log(data)
        if(data.status === 1){
            const item = new ProductInfo(data.product)
            item.displayInfo()
            item.listIngredients()
        } else if(data.status === 0){
            alert(`Product ${inputValue} not found`)
        }
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}

class ProductInfo {
    constructor(productData) { //pass in data.product
        this.name = productData.product_name
        this.ingredients = productData.ingredients
        this.image = productData.image_url
    }

    displayInfo() {
        document.getElementById('foodImage').src = this.image
        document.getElementById('product-name').innerText = this.name
    }

    listIngredients() {
        let tableList = document.getElementById('ingredient-table')
        // clear rows below header
        for (let i = 1; i < tableList.rows.length;){
            tableList.deleteRow(i)
        }

        if(!(this.ingredients == null)){
        for(let key in this.ingredients) {
                let newRow = tableList.insertRow(-1)
                let newICell = newRow.insertCell(0)
                let newVegetarianCell = newRow.insertCell(1)
                let newVeganCell = newRow.insertCell(2)
                let newIText = document.createTextNode(
                    this.ingredients[key].text
                )
                let vegetarianStatus = this.ingredients[key].vegetarian == null ?
                    'Unknown' : this.ingredients[key].vegetarian 
                let newVegetarianText = document.createTextNode(vegetarianStatus)
                let veganStatus = this.ingredients[key].vegan == null ?
                    'Unknown' : this.ingredients[key].vegan
                let newVeganText = document.createTextNode(veganStatus)

                newICell.appendChild(newIText)
                newVegetarianCell.appendChild(newVegetarianText)
                newVeganCell.appendChild(newVeganText)

                if(vegetarianStatus === 'yes'){
                    newVegetarianCell.classList.add('vegetarian-item')
                    newVegetarianCell.style.backgroundColor = 'green'
                } else if(vegetarianStatus === 'no'){
                    newVegetarianCell.classList.add('non-vegetarian-item')
                    newVegetarianCell.style.backgroundColor = 'red'
                } else {
                    newVegetarianCell.classList.add('unknown-item')
                    newVegetarianCell.style.backgroundColor = 'yellow'
                }

                if(veganStatus === 'yes'){
                    newVeganCell.classList.add('vegan-item')
                    newVeganCell.style.backgroundColor = 'green'
                }
                else if(veganStatus === 'no'){
                    newVeganCell.classList.add('non-vegan-item')
                    newVeganCell.style.backgroundColor = 'red'
                } else {
                    newVeganCell.classList.add('unknown-item')
                    newVeganCell.style.backgroundColor = 'yellow'
                }
            }
        }
    }
}
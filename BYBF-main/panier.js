let carts = document.querySelectorAll(".Ajouterpanier");

let products = [
     {
         name: "T-Shirt Noir Logo Vert",
         tag: "Logo vert",
         price: 25,
         inCart: 0
     },
     {
        name: "T-Shirt Blanc Logo Rouge",
        tag: "Logo rouge",
        price: 25,
        inCart: 0
    },
    {
        name: "T-Shirt Noir Logo Bleu",
        tag: "Logo bleu",
        price: 25,
        inCart: 0
    },
    {
        name: "T-Shirt Blanc Logo Noir",
        tag: "Logo noir",
        price: 20,
        inCart: 0
    }
];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener("click", () => {
        numeroCartes(products[i]);
        prixAchat(products[i])
    })

}

function chargeCartes(){
    let productNumbers = localStorage.getItem("numeroCartes");

    if(productNumbers){
        document.querySelector(".cart span").textContent = productNumbers;

    }

}

function numeroCartes(product) {
   
    let productNumbers = localStorage.getItem("numeroCartes");


    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem("numeroCartes", productNumbers + 1);
        document.querySelector(".cart span").textContent = productNumbers + 1;
    } else{
        localStorage.setItem("numeroCartes", 1);
        document.querySelector(".cart span").textContent = 1;

    }

   setItems(product);


}

function prixAchat(product) {
    let cartCost = localStorage.getItem('prixAchat');
    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );
    if( cartCost != null) {
        cartCost = parseInt(cartCost);

        localStorage.setItem('prixAchat',cartCost + product.price);
    } else {
        localStorage.setItem("prixAchat", product.price);
    }
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    console.log("Ma carte est", cartItems);

    if(cartItems != null) {


        if(cartItems[product.tag] == undefined){
            cartItems = {

                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        
        product.inCart = 1;
        cartItems = {
            [products.tag]: product
        }
    

    }

  

    localStorage.setItem("productsInCart", JSON.stringify(cartItems) );
}

function displayCartes() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('prixAchat');

    // console.log(cartItems);
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <img src="./photo/${item.tag}.jpg">
                <span>${item.name}</span>
                <div class="imprime"> <h4>T-shirt imprimé homme</h4> </div>
                <div class="quantity">
                <span class= "chiffre">${item.inCart}</span>
                <ion-icon ios="ios-arrow-dropdown" md="md-arrow-dropdown"></ion-icon>
                </div>
                <div class="price">  $${item.inCart * item.price},00</div>
                <ion-icon ios="ios-trash" md="md-trash"></ion-icon>
               
              
                
             </div>
           
            `;
        });

        productContainer.innerHTML += `
            <div class="total">
                    $${cartCost},00
            </div>

        `;
        productContainer.innerHTML += `
        <div class="favoris">
        <h3>Favoris</h3>
        <img class ="linge"src="./Images/Noir-Shirt.png" alt="T-Shirt">
        <img src="./Images/Noir-Shirt.png" alt="T-Shirt">
        </div>

    `;

    }

    poubelle();
}

function poubelle(){

    let poubelleButtons = document.querySelectorAll(".product ion-icon");
    let nomproduit;
    let nombreproduit = localStorage.getItem("numeroCartes");
    let cartItems = localStorage.getItem("productsInCart");
    cartItems= JSON.parse(cartItems);
    // let cartesAchat = localStorage.getItem("prixAchat");
    


    for(let i=0; i< poubelleButtons.length; i++){
        poubelleButtons[i].addEventListener("click" , () => {
            
            nomproduit = poubelleButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, "");
            console.log(nomproduit);
            console.log(cartItems[nombreproduit].name + "" + cartItems[nombreproduit].inCart);
            // console.log("il y a " + nombreproduit + "carte");

            // localStorage.setItem("numeroCartes", nombreproduit - cartItems[nomproduit].inCart);
            localStorage.setItem("prixAchat", cartesAchat  - (cartItems[nomproduit].price * cartItemsS[nomproduit].inCart));

             delete nombreacrticle[nomproduit];
             localStorage.setItem("productInCart", JSON.stringify(cartItems));

            // displayCartes(); 
            // chargeCartes();

        });
    }
}


chargeCartes();
displayCartes();
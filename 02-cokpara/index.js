
let totalMoney=Number.MAX_SAFE_INTEGER;

const productList = [
    { id: 1, name: 'Kola', price: 4, img: 'https://i.sozcu.com.tr/wp-content/uploads/2016/01/19/diyet-kola.jpg' },
    { id: 2, name: 'Iskender', price: 30, img: 'https://i.lezzet.com.tr/images-xxlarge-recipe/ev-yapimi-iskender-33bd7089-fa36-4398-95f8-02c6463ea27c.jpg' },
    { id: 3, name: 'Yat', price: 450000, img: 'https://i.ytimg.com/vi/9BCZpcgsAb8/maxresdefault.jpg'  },
    { id: 4, name: 'Bahceli Ev', price: 9500000, img: 'https://www.neredekal.com/res/blog/1582812421_7.jpg' },
    { id: 5, name: 'Araba Fabrikası', price: 120000000, img: 'https://i.ytimg.com/vi/rfMkp55oTv0/maxresdefault.jpg' },
    // ... Kendi örneklerinizi eklemeye çekinmeyin.
]

const amount=document.getElementById('jsAmount');
amount.innerHTML=`Harcanabilecek Toplam Para : ${totalMoney}`;
const loadProducts=()=>{   

    productList.forEach(element => {
        
        const maxProduct=Math.round(totalMoney/element.price);
        const cart=document.getElementById('jsCart');
      
        //image
        const newImage=document.createElement('img');
        const attributeSrc = document.createAttribute("src");
        attributeSrc.value=element.img; 
        newImage.setAttributeNode(attributeSrc);
        const attributeClassSrc = document.createAttribute("class");
        attributeClassSrc.value="card-img-top"; 
        newImage.setAttributeNode(attributeClassSrc);

        //cart body-div
        const cartBody=document.createElement('div');
        const attributeClassDiv = document.createAttribute("class");
        attributeClassDiv.value="card-body"; 
        cartBody.setAttributeNode(attributeClassDiv);
        
        //product name
        const cartName=document.createElement('div');
        const attributeClassName = document.createAttribute("class");
        attributeClassName.value="card-header "; 
        cartName.setAttributeNode(attributeClassName);
        //cartName.style="float:left;margin-right: 8px";
        cartName.innerHTML=`Ürün adı : ${element.name}`;

        cartBody.appendChild(cartName);

        

        //product price
        const cartPrice=document.createElement('p');
        const attributeClassPrice = document.createAttribute("class");
        attributeClassPrice.value="card-text"; 
        cartPrice.setAttributeNode(attributeClassPrice);
        cartPrice.style="float:right";

        const attributePriceId = document.createAttribute("id");
        attributePriceId.value=`jsPrice${element.id}`; 
        cartPrice.setAttributeNode(attributePriceId);
        
        cartPrice.innerHTML=`Fiyat : ${element.price}`;

        cartBody.appendChild(cartPrice);

        //max product amount
        const maxAmount=document.createElement('p');
        const attributeClassAmount = document.createAttribute("class");
        attributeClassAmount.value="card-text"; 
        maxAmount.setAttributeNode(attributeClassAmount);
        maxAmount.style="float:left";

        const attributeMaxAmountId = document.createAttribute("id");
        attributeMaxAmountId.value=`jsMaxAmount${element.id}`; 
        maxAmount.setAttributeNode(attributeMaxAmountId);

        maxAmount.innerHTML=`En fazla ${maxProduct} tane alabilirsiniz`;

        cartBody.appendChild(maxAmount);

        //added product div
        const addedProductDiv=document.createElement('div');
        const attributeAddedIdDiv = document.createAttribute("id");
        attributeAddedIdDiv.value=`jsAddedProduct${element.id}`; 
        addedProductDiv.setAttributeNode(attributeAddedIdDiv);
        
        //insert button
        const insertButton=document.createElement('button');
        const attributeClassButton = document.createAttribute("class");
        attributeClassButton.value="btn btn-primary"; 
        insertButton.setAttributeNode(attributeClassButton);
        insertButton.style.marginBottom="50px";
        insertButton.style.marginTop="5px";

        const attributeIdButton = document.createAttribute("id");
        attributeIdButton.value=`jsButton${element.id}`; 
        insertButton.setAttributeNode(attributeIdButton);
        insertButton.innerHTML="Ekle";
        
        
        if(element.price>totalMoney)
        {
            insertButton.disabled=true;
            maxAmount.innerHTML=`malesef paranız satın almak için yetersiz.Ürün alamazsınız üzgünüz!`;
        }

        cart.appendChild(newImage);
        cart.appendChild(cartBody);
        cart.appendChild(addedProductDiv);
        cart.appendChild(insertButton);     
    });
        
};

loadProducts();

const btns = document.querySelectorAll('button[id^=jsButton]')

btns.forEach(btn => {
    var count=1;
   btn.addEventListener('click', event => {
        
        let cutId=event.target.id;
        let productId=cutId.replace("jsButton","").trim();
        if(totalMoney<=0)
        {
            btn.disabled=true;
        }
        const maxAmountElement=document.getElementById(`jsMaxAmount${productId}`); 
        const PriceElement=document.getElementById(`jsPrice${productId}`);    
        const PriceProduct=PriceElement.innerHTML.replace("Fiyat : ","").trim();
        var addedProductAmount=event.target.value+1;
        if(PriceProduct>totalMoney)
        {
            btn.disabled=true;
            maxAmountElement.innerHTML=`malesef paranız satın almak için yetersiz.Ürün alamazsınız üzgünüz!`;
        }
        else
        {       
            const addedProduct=document.getElementById(`jsAddedProduct${productId}`);        
            addedProduct.innerHTML=`${count}tane eklendi.`;  
            
            let newTotalMoney=totalMoney-(addedProductAmount*PriceProduct);
            if(newTotalMoney<=0)
            {
                newTotalMoney=0;
            }
            totalMoney=newTotalMoney;
            amount.innerHTML=`Harcanabilecek Toplam Para : ${newTotalMoney}`;

            let updateMaxAmount=Math.floor(totalMoney/PriceProduct);
            if(updateMaxAmount==0)
            {
                maxAmountElement.innerHTML=`paranız bu ürünü daha fazla satın almak için yetersiz!`;
                btn.disabled=true;
            }
            else
            {
                maxAmountElement.innerHTML=`En fazla ${updateMaxAmount} tane alabilirsiniz`;
            }                 
        }
    
        addedProductAmount++;
        count++;
        //console.log( event.target );
       console.log(PriceProduct);
   });

});


/*
1) Uygulama açıldığında aşağıdaki ürünler ekrana gelsin ve ekranda her ürün için [fotoğraf, ürün, ekle butonu]içeren bir kart yer alsın.
2) Ekle butonunun üzerine geldiğımiz zaman o üründen kaç tane alabileceğimizi görelim
3) Ekle butonuna bastığımız zaman ürün kartının yanına bu üründen kaç tane eklediğimizi görelim.
4) Paramız bittiyse ürün ekleyemeyelim
5) Tüm kartların üzerinde ne kadar paramız kaldığını gösteren bir yazı yer alsın Kalan Para: xxxx
 */


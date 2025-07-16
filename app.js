let shop = ["다패삼겹", "대패삼겹살 야르", "가비", "카페"];

document.addEventListener('DOMContentLoaded', function(){
    for(i=0; i < shop.length; i=i+2){
        let httml = `<div class="sub"><a href="order.html?gage=` + shop[i] + `">
        <h2>` + shop[i] + `</h2>
        <span>` + shop[i + 1] + `</span>
        <br></a></div>`;
        document.getElementById('lis').innerHTML = document.getElementById('lis').innerHTML + httml    
    }
})  
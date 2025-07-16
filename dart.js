let menusiu = ["대패비빔면", "3500", "", "에이드", "2000", "청포도$$자몽$$레몬", "대패불닭", "3500", "", "컵화채", "3000", ""];
let copt = "";
let cart = [];
let amnt = 1;
let cost = 0;
let price = 0;
let o;
let forder;
let ok = false;
let email = "";

document.addEventListener('DOMContentLoaded', function(){
    for (i=0; i<menusiu.length; i=i+3){
        document.getElementById('daorl').innerHTML += 
            '<div class="menn" onclick="pop(' + i + ')">' +
            '<span><h3>' + menusiu[i] + '</h3><div>₩' + menusiu[i+1] + '</div></span></div>';
    }
});

function selop(p){
    let optElem = document.getElementById('opti' + p);
    let optName = optElem.innerText.replace(" - ✅", "").replace(" - 🟩", "");
    if (copt.includes(optName)) {
        optElem.innerText = optName + " - 🟩";
    } else {
        optElem.innerText = optName + " - ✅";
        copt += optName;
    }
    console.log(copt);
}

function addup(){
    document.getElementById('opt').style.display = 'none';
    for (i=0; i<amnt; i++){
        cart.push(menusiu[o] + copt);
        cost += price;
    }
    copt = "";
    amnt = 1;
}

function amntd(){
    if (amnt > 1){
        amnt--;
        document.getElementById('amntinp').value = amnt;
    }
}

function amntu(){
    amnt++;
    document.getElementById('amntinp').value = amnt;
}

function pop(k){
    o = k;
    document.getElementById('optt').innerHTML = menusiu[k];
    document.getElementById('prc').innerHTML = "₩" + menusiu[k+1];
    price = 3000;
    document.getElementById('opt').style.display = 'block';
    document.getElementById('opti').innerHTML = "";
    let options = menusiu[k+2].split('$$');
    for (i=0; i<options.length; i++){
        document.getElementById('opti').innerHTML += 
            '<span id="opti' + i + '" onclick="selop(' + i + ')">' + options[i] + " - 🟩</span><br>";
    }
}

function cashie(){
    ok = true;
    document.getElementById('cash').checked = true;
    document.getElementById('account').checked = false;
    document.getElementById('paytip').innerText = "바로 결제 완료 누르시고 배달기사님께 지불해 주세요";
}

function acnt(){
    ok = true;
    document.getElementById('cash').checked = false;
    document.getElementById('account').checked = true;
    document.getElementById('paytip').innerHTML = "계좌이체 후 결제완료 눌러주세요<br>농협 3021338907211";
}
function getGoogleEmailAndOrder() {
  google.accounts.id.initialize({
    client_id: "671092852945-06cb0vcctj58pjpf6gmcapk5voqc8h3e.apps.googleusercontent.com",
    callback: (response) => {
      const data = JSON.parse(atob(response.credential.split('.')[1]));
      email = data.email; // ✅ 전역 변수 email에 저장
      console.log("로그인된 이메일:", email);
      
      // ✅ 로그인 성공한 뒤 주문 실행
      finor();
    }
  });

  google.accounts.id.prompt(); // 로그인 창 띄우기
}
function opencrt(){
    //getGoogleEmailAndOrder();
    document.getElementById('crt').style.display = 'block';
    document.getElementById('costo').innerHTML = "₩" + cost;
}
    
function sendOrder(orderText, totalPrice) {
  fetch("https://api.sheetbest.com/sheets/405eb8dd-ca13-4ad5-8fd2-401c6346ae6d", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      order: orderText,
      timestamp: new Date().toLocaleString(),
      price: totalPrice
    })
  })
  .then(() => console.log("제출 성공!"))
  .catch((err) => console.log("에러 발생: " + err));
}
function finor() {
  if (document.getElementById('adres').value&&document.getElementById('reci').value){
    if (ok) {
      const result = Object.entries(
        cart.reduce((acc, cur) => ((acc[cur] = (acc[cur] || 0) + 1), acc), {})
      ).map(([item, count]) => count > 1 ? `${item}(${count}개)` : item);
      
      let forder = result.join(", ");
      forder = "[배달](" + document.getElementById('adres').value + document.getElementById('reci').value + ")" + forder
      const totalPrice = cost;

      console.log("주문 내용: " + forder + "\n가격: ₩" + totalPrice);
      sendOrder(forder, totalPrice);
      alert("주문이 완료되었습니다.")
      location.reload();
    }
  }
}
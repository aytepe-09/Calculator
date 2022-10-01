const display=document.querySelector('.calculator-input'); //rakam girilen input kısmı
const keys=document.querySelector('.calculator-keys');  //tüm buton alanını kapsayan class

let displayValue='0';  //Başlangıçta siyah ekranda yazan sayı

//Bu 3 değişkeni handleOperator için tanımlıyoruz.
let firstValue=null;  //girilen ilk value' yu yani displayValue' yı firstValue ' ye atar. Operatör girildikten sonra girilen ikinci sayıyı ise displayValue olarak tutar.
let operator_bilgisi=null;
let waitingForSecondValue=false; //ilk False atayalım. İlk value ve operatör girildikten sonra true ya dönecek
//Bu üç değişken operatör condition ı için tanımlandır.

updateDisplay(); //uygulama başladığı gibi updateDisplay çalışsın istiyorum

function updateDisplay() {  //her bir butona tıkladıktan sonra display value değerine ; uygulamada kaydettiğimiz displayValue değerini atamak.
    display.value = displayValue;  //Bu satırı yazmazsak siyah ekrandaki input kısmı güncellenmez. Arka planda işlemleri yapar.
    console.log("hi : " + displayValue);
}

//keys değişkeni butonlar dahil buton dışındaki alanları da kapsıyor. Çünki div:calculator-keys hepsinin kapsayıcısı
//Bu yüzden sadece butonlara tıklandığında çalışan bir function yazmalıyız (if ile )
keys.addEventListener('click',function(e){
    const element =e.target;
    //console.log(element);  //tüm elementi yazdırır.
    //console.log(element.value);  //etikeitn değerini yazdırır.
    if(!element.matches('button')) return; //eğer element button değilse, return et. Yani sonraki kodları ,işletme. (Yani console.log ile element 'i yazdırma )
    console.log(element);
    //if'teki return'i switch'teki break gibi düşünebiliriz. 
    //operatör ise operatör değerini, decimal ise decimal değerini, clear butonu ise clear değerini yazdır. Geri kalanlar zaten number'dır, number değerini yazdır
    if(element.classList.contains('operator')){
        //console.log('operator' ,element.value);
        handleOperator(element.value);
        updateDisplay(); //Ör; 10+20 = dedikten sonra siyah kısmı 30 olarak güncellememize yarayan method
        return;
    }

    //input kısmında gözükenler decimal ve number lar olduğu için orda update display () methodunu çağırmamız gerekir.
    if(element.classList.contains('decimal')){
        //console.log('decimal ',element.value);
        inputDecimal();  //. butonuna tıklandığında sonuna nokta yazdıran method
        updateDisplay();
        return;
    }
    if(element.classList.contains('clear')){
        //console.log('clear ',element.value);  //Burada value dediğimiz etiket'in value içerisne yazılan değerdir
        clear();
        updateDisplay();
        return;
    }
    
    //Hiçbiri değilse number butonlarından birine tıklamıştır. 
    //console.log('number ',element.value); konsola yazdırmak yerine fonksiyon ile çağırıp ekrana yazdıralım.
    inputNumber(element.value);  //number için yazdığımız değeri fonksiyonla çağırmamız lazım. 
    updateDisplay(); //Ve sonrasında da bu değerin update edilmesi lazım. Yani displayValue değişkeni güncelleniyor.
    
});

function inputNumber(num) {
    if(waitingForSecondValue ) { //waitingforSecondValue ===true ise
        displayValue=num;
        waitingForSecondValue=false;
    } else {
    displayValue = displayValue === '0' ? num : displayValue + num ; //Siyah ekrandaki sayı 0 ise kullanıcının girdiği num değerini yazdır, değilse ekrandaki sayının yanına num' u yaz. 
   }
   console.log(firstValue,displayValue,operator_bilgisi,waitingForSecondValue);
}

function inputDecimal(){
    if(!displayValue.includes('.')){  //displayvalue nokta içermiyorsa yani input kısmındaki yazılı olan şey nokta içermiyorsa nokta ekle sonuna
        displayValue += '.';
    }
}
function clear(){
    displayValue='0';
}

function handleOperator(nextOperator) { 

    const value = parseFloat(displayValue); //ilk değişkeni hem ondalık girilmişse düz'e çeviriyoruz hem de const sabit bir değişkene atıyoruz. Değişmemesi için
    if(operator_bilgisi && waitingForSecondValue){ //her ikisi de true ise yani her iki değer de bekleniyorsa 2. işleme devam edecek isem
        operator_bilgisi = nextOperator;   //Bu sayede eşittir operatörü taşınmmıyor ikinci yapacağım işlemde operatör üm değişebilir çünki
        return;
    }
    
    if(firstValue === null) { //firstValue daha önce atanmadıysa yani bir değer girilmediyse,  
        firstValue = value; //yedeğini aldık
    } else if(operator_bilgisi) {
        const result = calculate(firstValue, value, operator_bilgisi);

        displayValue = `${parseFloat(result.toFixed(7))}`;   //Result'ı string'e çeviriyorum ve ondalıklı kısmını 7 basamakta fix liyorum

        firstValue = result ; //Bu atamayı yapmamızın sebebi ör: 10+ 20 = 30 yaptık, toplama işlemine devam edersek 30 artık first value' mız olsun ve üstüne ekleyerek devam edelim.
    }
    waitingForSecondValue = true; //ilk değişken null değilse yukarıda yedeğini aldık ve waiting'i true'ya döndürdük.
    operator_bilgisi = nextOperator; //kullanıcının girdiği operatör ü de global tanımladığım operatörbilgisi değişkenine atadım
    console.log(firstValue,displayValue,operator_bilgisi,waitingForSecondValue);
}

function calculate(firstSayi,secondSayi,operator_bilgisi) {
    if(operator_bilgisi === '+'){
        return firstSayi + secondSayi;
    }
    else if(operator_bilgisi === '-'){
        return firstSayi - secondSayi;
    }
    else if(operator_bilgisi === '*'){
        return firstSayi * secondSayi;
    }
    else if(operator_bilgisi === '/'){
        return firstSayi / secondSayi;
    }
    return secondSayi;   //else durumu yukarıdaki herhangi bir koşula uymuyorsa 
}


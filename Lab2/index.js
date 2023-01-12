// const nextBtn = document.querySelector('#arrow-right')
// const prevBtn = document.querySelector('#arrow-left')

let counter = 2;

setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 5000);


document.getElementById("prevBtn").addEventListener("click", function(){
    if (counter === 1) {
        counter = 4;
    } else {
        counter--;
    }
    document.getElementById('radio' + counter).checked = true;
});

document.getElementById("nextBtn").addEventListener("click", function(){
    if (counter === 4) {
        counter = 1;
    } else {
        counter++;
    }
    document.getElementById('radio' + counter).checked = true;
});

setInterval(function(){
    if (counter === 4) {
        counter = 1;
    } else {
        counter++;
    }
    document.getElementById('radio' + counter).checked = true;
}, 5000);
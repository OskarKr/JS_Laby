const sldRight = document.querySelector('#arrow-right')
const sldLeft = document.querySelector('#arrow-left')

let counter = 2;

setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if (counter > 4) {
        counter = 1;
    }
}, 5000);

// sldRight.addEventListener('click', () => {
    
//     counter++;
// })
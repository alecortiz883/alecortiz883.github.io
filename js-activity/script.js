document.querySelector("button").addEventListener('click');
let OneC = document.getElementById('c');
function grade(){
    let answer1 = document.querySelector('#a')
    let answer = document.querySelector('#selection').value;
    if (answer === 75){
        answer1.textContent='C'
        answer1.style.color='red'
    }
}
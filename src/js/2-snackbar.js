import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    formEl: document.querySelector('.form'),
// refs.buttonFormEl.classList.add('active-button');
}

let delay;
let isPositive;

refs.formEl.addEventListener('submit', e => {
    e.preventDefault();
    delay = refs.formEl.elements.delay.value;
    // if (refs.formEl.elements.state.value === 'fulfilled') {
    //     isPositive = true;
    // } else {
    //     isPositive = false;
    // }
    isPositive = refs.formEl.elements.state.value === 'fulfilled';
    console.log(isPositive);
    

    const result = createPromise(delay, isPositive);
    result.then(res => iziToast.show({
        color: 'green',
        message: `Fulfilled promise in ${delay}ms`
    }))
        .catch(err => iziToast.show({
            color: 'red',
            message: `Rejected promise in ${delay}ms`
    }));
});


function createPromise(delay, isPositive) {
    const promise = new Promise((res, rej) => {
        setTimeout(() => {
            if (isPositive) {
                res();
            } else {
                rej();
            }
        }, delay);
    }) 
    return promise;
}



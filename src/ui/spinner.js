export default class Spinner {
    #spinnerElem
    
    constructor(idSpinner) {
        this.#spinnerElem = document.getElementById(idSpinner);
        
    }
    #startSpinner() {
        this.#spinnerElem.classList.add('position-absolute', 'top-50', 'start-50', 'translate-middle');        
        this.#spinnerElem.innerHTML = '<div class="spinner-border text-primary" style="width: 6rem; height: 6rem;" role="status"><span class="visually-hidden">Loading...</span></div>';
    }
    #stopSpinner () {
        this.#spinnerElem.removeAttribute("class");
        this.#spinnerElem.innerHTML = '';
    }
    async spinnerFn(promise) {
        this.#startSpinner();
        const res = await promise;
        this.#stopSpinner();
        return res;
    }

    
}
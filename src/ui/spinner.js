export default class Spinner {
    #spinnerElem
    
    constructor(idSpinner) {
        this.#spinnerElem = document.getElementById(idSpinner);
        
    }
    startSpinner() {
        const spin = this.#spinnerElem;
        spin.innerHTML = '<div class="spinner-border text-primary" style="width: 6rem; height: 6rem;" role="status"><span class="visually-hidden">Loading...</span></div>';
    }
    stopSpinner () {
        const spin = this.#spinnerElem;
        spin.innerHTML = '';
    }
    
}
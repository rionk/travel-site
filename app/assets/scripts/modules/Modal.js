class Modal {
    constructor(){
        this.insertHTML();
        //this.openModalButtons =  document.querySelectorAll(".open-modal");
        this.closeModalButton =  document.querySelector(".modal__close");
        this.modal =  document.querySelector(".modal");
        this.initEvent();
    }

    initEvent(){
        // this.openModalButtons.forEach(button => {
        //     button.addEventListener('click', this.openModal.bind(this));
        // })
        this.closeModalButton.addEventListener('click', this.closeModal.bind(this));
    }

    openModal(el){
        //el.preventDefault();
        this.modal.classList.add("modal--visible");
    }

    closeModal(el){
        el.preventDefault();
        this.modal.classList.remove("modal--visible");
    }

    insertHTML (){
        document.body.insertAdjacentHTML("beforeend", modalContent)
    }

}

const modalContent = `
<div class="modal">
    <div class="modal__inner">
        <h2 class="modal__title section-title section-title--blue">
            <img src="assets/images/icons/mail.svg" class="section-title__icon">
            Get in <strong>Touch</strong>
        </h2>

        <div class="wrapper wrapper--narrow">
            <p class="modal__description">We will have an online order system in place soon. Until then, connect with us on any of the platforms below!</p>
        </div>

        <div class="social-icons">
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/facebook.svg" alt="Facebook"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/twitter.svg" alt="Twitter"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/instagram.svg" alt="Instagram"></a>
            <a href="#" class="social-icons__icon"><img src="assets/images/icons/youtube.svg" alt="YouTube"></a>
        </div>
    </div>
    <div class="modal__close">X</div>
</div>`

export default Modal;
import "../scss/main.scss";
import MobileMenu from "./modules/MobileMenu.js";
import RevealOnScroll from "./modules/RevealOnScroll.js";
import StickyHeader from "./modules/StickyHeader.js";
//import Modal from "./modules/Modal.js";

new MobileMenu();
new RevealOnScroll(".feature-item");
new RevealOnScroll(".testimonial");
new StickyHeader();
//new Modal();
let modal;

/**
 * lazy loading
 * 당장 필요하지 않은 크고 복잡한 자바스크립트 모듈이 있는 경우,
 * 웹 사이트를 처음 방문할 때 모듯 것을 즉시 로드할 필요는 없다.
  */

document.querySelectorAll(".open-modal").forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        if(typeof modal === 'undefined'){
            import(/* webpackChunkName: "modal" */ "./modules/Modal.js").then(x => {
                modal = new x.default();

                // 브라우저가 객체를 생성하고 html을 dom에 주입하고 준비할 수 있도록 기다린다
                setTimeout(()=> {
                    modal.openModal();
                }, 20);

            }).catch(()=> console.log('There was a problem'))
        }else {
            modal.openModal();
        }
    });
})



if(import.meta.webpackHot) {
    import.meta.webpackHot.accept();
}
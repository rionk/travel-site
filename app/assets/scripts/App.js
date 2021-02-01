import "../scss/main.scss";
import MobileMenu from "./modules/MobileMenu.js";
import RevealOnScroll from "./modules/RevealOnScroll.js";

new MobileMenu();
new RevealOnScroll(".feature-item");

if(import.meta.webpackHot) {
    import.meta.webpackHot.accept();
}
import "../scss/main.scss";
import MobileMenu from "./modules/MobileMenu.js";

new MobileMenu();

if(import.meta.webpackHot) {
    import.meta.webpackHot.accept();
}
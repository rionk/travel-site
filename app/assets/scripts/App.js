import "../scss/main.scss";
import MobileMenu from "./modules/MobileMenu.js";
import RevealOnScroll from "./modules/RevealOnScroll.js";
import StickyHeader from "./modules/StickyHeader.js";

new MobileMenu();
new RevealOnScroll(".feature-item");
new RevealOnScroll(".testimonial");
new StickyHeader();


// if(import.meta.webpackHot) {
//     import.meta.webpackHot.accept();
// }
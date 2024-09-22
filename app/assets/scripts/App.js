import "../styles/main.scss";
import MobileMenu from "./modules/mobileMenu";

const mobileMenu = new MobileMenu();

if(module.hot){
	module.hot.accept();
}


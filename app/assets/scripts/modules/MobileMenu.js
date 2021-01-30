class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.site-header__menu-icon');
        this.menuContent = document.querySelector('.site-header__menu-content');
        this.siteHeader = document.querySelector('.site-header');
        this.toggleMenu = this.toggleMenu.bind(this)

        this.event();
    }
    
    event() {
        this.menuBtn.addEventListener('click', this.toggleMenu)
    }
    
    toggleMenu () {
        this.menuContent.classList.toggle("site-header__menu-content--visible");
        this.siteHeader.classList.toggle('site-header--expanded');
        this.menuBtn.classList.toggle('site-header__menu-icon--close')
    }
}

export default MobileMenu;
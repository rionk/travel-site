class MobileMenu {
    constructor() {
        this.menuButton = document.querySelector('.site-header__nav-btn');
        this.menuContent = document.querySelector('.site-header__nav-content');
        this.siteHeader = document.querySelector('.site-header');
        this.toggleMenu = this.toggleMenu.bind(this)
        this.isAnimate = false;

        this.events()
    }

    events() {
        this.menuButton.addEventListener('click', this.toggleMenu);

        /*
        const handleTransitionEnd = (e) => {
            if (e.target === this.menuContent) {
                this.isAnimate = false;
                if(!this.menuContent.classList.contains('is-visible')){
                    this.menuContent.style.display = 'none';
                }
            }
        }
        this.menuContent.addEventListener('transitionend', handleTransitionEnd);
        */
    }

    toggleMenu() {
        if (this.isAnimate) return
        this.isAnimate = true;

        if (this.menuContent.classList.contains('is-visible')) {
            this.hideMenu();
        } else {
            this.showMenu();
        }
    }

    showMenu() {
        this.menuContent.style.display = 'block';

        // 약간의 지연을 주어 애니메이션이 적용되도록
        /*
        setTimeout(()=> {
            this.menuContent.classList.add('is-visible');
            this.siteHeader.classList.add('site-header--is-expanded');
            this.menuButton.classList.add("site-header__nav-btn--is-open")

            setTimeout(() => {
                // 애니메이션이 완료된 후 isAnimate 상태를 false로 설정
                this.isAnimate = false
            }, 300);
        },10)
         */
        requestAnimationFrame(() => {
            this.menuContent.classList.add('is-visible');
            this.siteHeader.classList.add('site-header--is-expanded');
            this.menuButton.classList.add("site-header__nav-btn--is-open")

            // 애니메이션이 완료된 후 isAnimate 상태를 false 로 설정
            const that = this
            this.menuContent.addEventListener('transitionend', function handler() {
                that.isAnimate = false
                that.menuContent.removeEventListener('transitionend', handler)
                console.log('showMenu')
            });
        });
    }

    hideMenu() {
        this.menuContent.classList.remove('is-visible');
        this.siteHeader.classList.remove('site-header--is-expanded');
        this.menuButton.classList.remove("site-header__nav-btn--is-open")

        // 애니메이션이 끝난 후 display를 none으로 설정
        // 1. setTimeout
        /*
        setTimeout(() => {
            this.menuContent.style.display = 'none';
            this.isAnimate = false
        }, 300);
        */

        // 2. requestAnimationFrame
        /*
        animate(()=> {
            this.menuContent.style.display = 'none';
            this.isAnimate = false
        }, 300)
        */

        // 3. transitionend event
        // 문제점
        // removeEventListener 로 전달된 handler 는 원래의 함수 참조가 아니라 bind 가 적용된 새로운 함수. 
        //  따라서 removeEventListener 는 동일한 함수 참조를 찾지 못해 이벤트 리스너를 제거할 수 없다.
        /*
        this.siteHeader.addEventListener('transitionend', function handler(e) {
            if(e.currentTarget  === this.siteHeader){
                // 애니메이션이 완료된 후 menuContent 의 display 를 none 으로 설정
                if(!this.menuContent.classList.contains('is-visible')){
                    this.menuContent.style.display = 'none';
                    this.isAnimate = false;
                    console.log('hideMenu')
                }
            }
            this.siteHeader.removeEventListener('transitionend', handler);
        }.bind(this));
        */

        // 해결
        // handler 함수를 외부 변수에 저장하여 removeEventListener 에서 직접 참조.
        const handler = (e) => {
            if (e.currentTarget === this.siteHeader) {
                // 애니메이션이 완료된 후 menuContent 의 display 를 none 으로 설정
                this.menuContent.style.display = 'none';
                this.isAnimate = false;
                console.log('hideMenu')
            }
            this.siteHeader.removeEventListener('transitionend', handler);
        }
        this.siteHeader.addEventListener('transitionend', handler);
    }
}

function animate(callback, duration) {
    let animationFrameId, startTime;

    function start() {
        if (startTime === undefined) startTime = Date.now()
        const elapsed = Date.now() - startTime;
        console.log(duration, elapsed)
        /*
        if(duration  <= released){
            cancelAnimationFrame(animationFrameId);
            callback()
        }*/

        if (elapsed >= duration) {
            cancelAnimationFrame(animationFrameId);
            callback()
        } else {
            animationFrameId = requestAnimationFrame(start);
        }
    }
    start();
}

export default MobileMenu;
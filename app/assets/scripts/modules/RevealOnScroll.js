import {throttle, debounce} from "lodash";

class RevealOnScroll {
    constructor(selector){
        this.itemsToReveal = document.querySelectorAll(selector);
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.browserHeight = window.innerHeight;
        this.initHide();
        this.event();
    }

    event () {
        window.addEventListener('scroll', this.scrollThrottle);

        window.addEventListener('resize', debounce(()=> {
                this.browserHeight = window.innerHeight;
            }, 200)
        )
    }

    initHide () {
        this.itemsToReveal.forEach(item => {
            item.classList.add('reveal-item')
            item.isRevealed = false
        })
    }

    calcCaller () {
        this.itemsToReveal.forEach(item => {
            this.calculateIfScrolledTo(item)
        })
    }

    calculateIfScrolledTo(el){
        if(window.scrollY + this.browserHeight > el.offsetTop) {
            let scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100;

            if(scrollPercent < 70 && el.isRevealed === false) {
                el.classList.add('reveal-item--visible');
                el.isRevealed = true;
            }
        } else {
             if ( el.isRevealed === true){
                el.classList.remove('reveal-item--visible');
                el.isRevealed = false;
            }
        }
    }
}

export default RevealOnScroll;


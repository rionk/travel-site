import {throttle, debounce} from "lodash";
import $ from 'jquery';

class StickyHeader {
    constructor() {
        this.init();
        this.initEvent();
    }

    init(){
        this.siteHeader = document.querySelector(".site-header");
        this.pageSection = document.querySelectorAll(".page-section");
        this.headerLinks = document.querySelectorAll(".primary-nav li a");
        this.browserHeight = window.innerHeight;
        this.previousScrollY = window.scrollY
    }

    initEvent(){
        window.addEventListener('scroll', throttle(this.runOnScroll, 100).bind(this));

        this.headerLinks.forEach(el => {
            el.addEventListener("click", this.scrollToSection.bind(this,el));
        })

        window.addEventListener('resize', debounce(()=> {
            this.browserHeight = window.innerHeight;
        }, 200))
    }

    runOnScroll(){
        if(window.scrollY > 60 && !this.siteHeader.classList.contains('site-header--dark')) {
            this.siteHeader.classList.add('site-header--dark');
        }else if (window.scrollY <= 60 && this.siteHeader.classList.contains('site-header--dark')) {
            this.siteHeader.classList.remove('site-header--dark');
        }

        this.determineScrollDirection()
        this.pageSection.forEach(el => {
            this.calcSection(el);
        });
    }

    determineScrollDirection() {
        if (window.scrollY > this.previousScrollY) {
            this.scrollDirection = 'down'
        } else {
            this.scrollDirection = 'up'
        }
        this.previousScrollY = window.scrollY;
    }

    calcSection(el){
        const scrollY  = window.pageYOffset;
        const startY = el.offsetTop  - this.browserHeight;
        const endY = el.offsetTop + el.offsetHeight; 

        if( scrollY > startY  &&  scrollY < endY ) {
            const scrollPercent = el.getBoundingClientRect().top /  this.browserHeight * 100;
         
            if(scrollPercent < 18 && this.scrollDirection == 'down' 
                ||  scrollPercent < 33 && this.scrollDirection == 'up'
            ) {
              
                document.querySelectorAll(".primary-nav li a").forEach(item => {
                    if(item !== el) {
                        item.classList.remove("current")
                    }
                })
                document.querySelector(`[data-target= ${el.id}]`).classList.add("current");
            }
        }
    }

    scrollToSection(el, event) {
        event.preventDefault();
        const currentSection = document.querySelector(`#${el.getAttribute('data-target')}`)

        // $('html, body').stop().animate({
        //     scrollTop: currentSection.offsetTop
        // })

        // window.scrollTo({
        //     top: currentSection.offsetTop,
        //     left: 100,
        //     behavior: 'smooth'
        // })
        this.calcScrollTo(currentSection)
    }

    calcScrollTo(el){
        requestAnimation({
            start : window.pageYOffset,
            end :  el.offsetTop,
            duration: 1000,
            easingFn: easeInOutQuad,
            animate : x => {
                window.scrollTo(0, x)
            }
        });
    }
}

const requestAnimation = (param) =>{
    let requestId;
    const duration = param.duration || 1000;
    const easingFn = param.easingFn;
    let startY =  param.start;
    let targetY = param.end;
    let distance = targetY - startY;
    let percent;

    let start = null;

    const loop = (timestamp) => {
        if(!start) start = timestamp;
        let progress = timestamp - start;

        percent = Math.min(progress / duration, 1);

        param.animate(startY + (distance * easingFn(percent)));
       
        if (progress <= duration) {
            requestId = window.requestAnimationFrame(loop);
        }else{
            window.cancelAnimationFrame(requestId)
        }
    }

    requestId = window.requestAnimationFrame(loop);
}

const easeInQuart = x => {
    return x * x * x * x;
}
const easeInOutQuad = x => {
    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export default StickyHeader; 
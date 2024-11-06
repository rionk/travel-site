import { throttle } from "lodash"

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector('.site-header')
        this.navLinks = document.querySelectorAll('.primary-nav li a')
        this.pageSections = document.querySelectorAll('.page-section')
        this.scrollThrottle = throttle(this.runOnScroll.bind(this), 200)

        this.events()
    }

    events() {
        window.addEventListener('scroll', this.runOnScroll.bind(this))
    }

    runOnScroll() {
        const scrollY = window.scrollY
        this.toggleHeader(scrollY > 60)

        this.pageSections.forEach(section => {
            const isVisible = section.offsetTop < window.scrollY + window.innerHeight && section.offsetTop + section.offsetHeight > window.scrollY
            if (isVisible) {
                this.checkSectionPosition(section)
            }
        })
    }

    toggleHeader(flag) {
        //this.siteHeader.classList.toggle('site-header--dark')
    }

    checkSectionPosition(section) {
        const scrollPercent = (1 - section.getBoundingClientRect().top / window.innerHeight) * 100
        if (scrollPercent > 70) {
            const currentLink = document.querySelector(`a[href = "#${section.id}"]`)
            if (currentLink) {
                this.navLinks.forEach(link => {
                    if (link === currentLink) {
                        currentLink.classList.add('is-active')
                    } else {
                        link.classList.remove('is-active')
                    }
                })
            }
        }
    }
}

/**--------------------------------------
 * requestAnimationFrame
--------------------------------------*/
function animate(target, properties, duration = 300, easing = easeInCubic) {
    let startTime
    // startY = window.scrollY,
    // endY = section.offsetTop,
    // diff = endY - startY

    const start = {}, end = {}, diff = {}
    for (let prop in properties) {
        start[prop] = target instanceof HTMLElement ? window.getComputedStyle(target)[prop] : target[prop]
        end[prop] = properties[prop]
        diff[prop] = end[prop] - start[prop]
    }

    const step = (timestamp) => {
        startTime = startTime || timestamp
        const elipsed = timestamp - startTime
        const percent = easing(Math.min(1, elipsed / duration))

        for (let prop in properties) {
            const targetVal = start[prop] + (diff[prop] * percent)
            if (target === window) {
                window.scrollTo(0, targetVal)
            } else {
                target[prop] = properties[prop]
            }
        }

        if (percent < 1) {
            requestAnimationFrame(step)
        }
    }
    requestAnimationFrame(step)
}

function easeInCubic(x) {
    return x * x * x;
}

export default StickyHeader


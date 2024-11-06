//import { throttle } from "lodash"

const throttle = (callback, duration) => {
    let throttleId
    return () => {
        if (throttleId) return
        throttleId = setTimeout(() => {
            callback()
            throttleId = null
        }, duration)
    }
}

class StickyHeader {
    constructor() {
        this.siteHeader = document.querySelector('.site-header')
        this.navLinks = document.querySelectorAll('.primary-nav li a')
        this.pageSections = document.querySelectorAll('.page-section')
        this.scrollThrottle = throttle(this.runOnScroll.bind(this), 200)

        this.browserHeight = window.innerHeight
        this.previousScrollY = 0;
        this.scrollDirection;

        this.events()
    }

    events() {
        window.addEventListener('scroll', this.scrollThrottle.bind(this))
        this.navLinks.forEach(link => link.addEventListener('click', this.scrollToSection.bind(this)))

        //this.createObserver()
    }

    createObserver() {
        const options = {
            root: null, // 뷰포트를 기준으로 관찰
            // 상단 마진: 스크롤을 올릴 때
            // 하단 마진: 스크롤을 내릴 때
            rootMargin: '-70% 0px -70% 0px', // 뷰포트 중앙을 기준으로 마진 설정
            threshold: 0
        }

        this.observer = new IntersectionObserver(this.observerSection.bind(this), options)

        this.pageSections.forEach(section => {
            this.observer.observe(section)
        })
    }

    observerSection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry.target);
                const currentLink = document.querySelector(`a[href = "#${entry.target.id}"]`)
                if (currentLink) {
                    this.setActiveNavLink(currentLink)
                }
            }
        })
    }

    runOnScroll() {
        const scrollY = window.scrollY
        this.toggleHeader(scrollY > 60)


        // if (scrollY > 60) {
        //     this.siteHeader.classList.add('site-header--dark')
        // } else {
        //     this.siteHeader.classList.remove('site-header--dark')
        // }

        this.determinScrollDirection();

        this.pageSections.forEach(section => {
            this.checkSectionPosition(section)
        })

        // this.pageSections.forEach(section => {
        //     const currentLink = document.querySelector(`a[href = "#${section.id}"]`)
        //     if (section.offsetTop <= scrollY + 60) {
        //         this.navLinks.forEach(link => {
        //             if (link === currentLink) {
        //                 currentLink.classList.add('is-active')
        //             } else {
        //                 link.classList.remove('is-active')
        //             }
        //         })
        //     } else {
        //         currentLink.classList.remove('is-active')
        //     }
        // })
    }

    determinScrollDirection() {
        if (this.previousScrollY < window.scrollY) {
            this.scrollDirection = "down"
        } else if (this.previousScrollY > window.scrollY) {
            this.scrollDirection = "up"
        }
        this.previousScrollY = window.scrollY
    }

    toggleHeader(flag) {
        this.siteHeader.classList.toggle('site-header--dark', flag)
    }

    checkSectionPosition(section) {
        const isVisible = section.offsetTop < window.scrollY + this.browserHeight && section.offsetTop + section.offsetHeight > window.scrollY;

        if (isVisible) {
            this.updateNavLink(section)
        }
    }

    updateNavLink(section) {
        const scrollPercent = (1 - section.getBoundingClientRect().top / this.browserHeight) * 100
        const matchingLink = document.querySelector(`a[href = "#${section.id}"]`)

        if ((this.scrollDirection === "down" && scrollPercent > 70) || (this.scrollDirection === "up" && scrollPercent > 30)) {
            if (matchingLink) {
                this.navLinks.forEach(link => {
                    link.classList.toggle('is-current-link', link === matchingLink)
                })
            }
        }

        if (this.scrollDirection === "up" && window.scrollY < 100) {
            this.navLinks[0].classList.remove('is-current-link')
        }
    }

    scrollToSection(e) {
        e.preventDefault()
        const sectionId = e.target.getAttribute('href')
        const section = document.querySelector(sectionId)

        // 1) scrollTo
        // window.scrollTo({
        //     top: section.offsetTop,
        //     left: 0,
        //     behavior: 'smooth'
        // })

        // 2) scrollIntoView
        // section.scrollIntoView({
        //     behavior: "smooth"
        // })

        // 3) RequestAnimationFrame
        animate(window, { scrollY: section.offsetTop }, 300)
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


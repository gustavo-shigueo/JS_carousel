export default class Carousel {
  constructor (element, { usesBubbles, usesArrows, timer } = { }) {
    this.carousel = element instanceof HTMLElement ? element : document.querySelector(element)
    this.carouselItems = this.carousel.querySelectorAll('.carousel-item')
    this.itemsContainer = this.carousel.querySelector('.carousel-wrapper')
    this.numberOfItems = this.carouselItems.length
    this.itemSize = this.carousel.clientWidth
    this.counter = 1
    this.usesBubbles = usesBubbles ?? true
    this.usesArrows = usesArrows ?? true
    this.timer = timer ?? 5000
    this.labels = []
    this.nextBtn = null
    this.prevBtn = null
    window.addEventListener('resize', () => {
      this.itemSize = this.carousel.clientWidth
      this.slideItems()
      if (this.usesBubbles) this.activateBubble()
    })
    this.init()
  }

  init() {
    this.cloneFirstAndLastItems()
    if (this.usesBubbles) this.addBubbles()
    if (this.usesArrows) this.addArrows()

    this.timeOut = this.timer ? setInterval(() => this.handleTime(), this.timer) : undefined

    this.itemsContainer.addEventListener('transitionend', () => {
      this.cicle()
      if (this.usesArrows) {
        this.prevBtn.removeAttribute('disabled')
        this.nextBtn.removeAttribute('disabled')
      }
    })
  }

  cloneFirstAndLastItems() {
    const first = this.carouselItems[0]
    const last = this.carouselItems[this.numberOfItems - 1]
    const firstItemClone = first.cloneNode(true)
    const lastItemClone = last.cloneNode(true)

    this.itemsContainer.insertBefore(lastItemClone, first)
    this.itemsContainer.appendChild(firstItemClone)
    this.itemsContainer.style.transform = `translateX(-${this.itemSize}px)`
  }

  handleTime() {
    if (this.usesArrows) {
      this.prevBtn.setAttribute('disabled', true)
      this.nextBtn.setAttribute('disabled', true)
    }
    this.counter++
    this.slideItems()
  }

  resetTimer() {
    clearInterval(this.timeOut)
    this.timeOut = setInterval(() => this.handleTime(), this.timer);
  }

  slideItems() {
    const amount = this.counter * this.itemSize
    this.itemsContainer.style.transition = 'transform 400ms ease-in-out'
    this.itemsContainer.style.transform = `translateX(-${amount}px)`
    if (this.usesBubbles) this.activateBubble()
  }

  cicle() {
    if (this.counter > this.numberOfItems) {
      const amount = this.itemSize
      this.counter = 1
      this.itemsContainer.style.transition = 'none'
      this.itemsContainer.style.transform = `translateX(-${amount}px)`
    }
    if (this.counter <= 0) {
      const amount = this.itemSize * this.numberOfItems
      this.counter = this.numberOfItems
      this.itemsContainer.style.transition = 'none'
      this.itemsContainer.style.transform = `translateX(-${amount}px)`
    }
  }

  /**
   * Bubble buttons code (the ones that show wich item you are seeing, idk what they are
   * actually called so I called them bubbles)
   */
  addBubbles() {
    const bubblesContainer = document.createElement('div')
    bubblesContainer.className = 'bubbles'

    for (let i = 1; i <= this.numberOfItems; i++) {
      const label = document.createElement('label')
      label.setAttribute('class', `bubble${i}`)
      bubblesContainer.append(label)
    }

    bubblesContainer.firstChild.classList.add('active')

    const labels = bubblesContainer.querySelectorAll('label')
    this.carousel.appendChild(bubblesContainer)
    labels.forEach(elem => elem.addEventListener('click', e => this.bubbleClick(e)))

    this.labels = labels
  }

  bubbleClick(e) {
    const bubble = e.target
    if (this.timer) this.resetTimer()
    this.labels.forEach(el => el.classList.remove('active'))
    this.counter = Number(bubble.className.split('bubble')[1])
    this.slideItems()
    e.target.classList.add('active')
  }

  activateBubble() {
    const len = this.labels.length
    this.labels.forEach(label => {
      const { className } = label
      const number = Number(className.split('bubble')[1])
      label.classList.remove('active')
      if (this.counter === number || (this.counter > len && number === 1)) label.classList.add('active')
      if (this.counter <= 0 && number === len) label.classList.add('active')
    })
  }

  // Arrow buttons code
  addArrows() {
    const divBtn = document.createElement('div')
    const btn = document.createElement('button')

    divBtn.className = 'arrows'

    const svg = this.generateSVG()
    btn.appendChild(svg)

    this.prevBtn = btn
    this.nextBtn = btn.cloneNode(true)
    this.prevBtn.className = 'prevBtn'
    this.nextBtn.className = 'nextBtn'

    this.prevBtn.addEventListener('click', () => this.arrowClick(this.prevBtn))
    this.nextBtn.addEventListener('click', () => this.arrowClick(this.nextBtn))

    divBtn.append(this.prevBtn, this.nextBtn)
    this.carousel.appendChild(divBtn)
  }

  arrowClick(btn) {
    if (this.timer) this.resetTimer()
    btn.setAttribute('disabled', true)
    if (this.counter <= 0 || this.counter > this.numberOfItems) return this.cicle()
    this.counter += btn.className === 'nextBtn' ? 1 : -1
    console.log(btn.className)
    this.slideItems()
  }

  generateSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    svg.classList.add('svg')
    svg.setAttribute('viewBox', '0 0 448 512')

    // Link for the SVG: https://fontawesome.com/icons/arrow-right?style=solid
    path.setAttribute('fill', 'white')
    path.setAttribute('d', 'M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z')

    svg.appendChild(path)

    return svg
  }
}
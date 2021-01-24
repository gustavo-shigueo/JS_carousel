# Vanilla Javascript carousel

This is just a small package of files to create a JS carousel.

To use this, you must download the Carousel.js file and one of the following files:

* style.css
* style.min.css
* style.scss (which you must compile to CSS to use)

## How to use it
```html
<head>
  <script type="module">
    import Carousel from './js/Carousel.js'
    // This can be either an HTML element or a CSS selector (string)
    // that only applies to one element carousel element
    const element = '.carousel-container'
    // or: const element = document.querySelector('.carousel-container')
    
    const options = {
      // Insert a number, if not sent or null it'll default to 5000,
      // if 0 or false it'll create a manual carousel.
      // Value in miliseconds
      timer: 5000,

      // Insert a boolean, if not sent or null it'll default to true.
      usesArrows: true

      // Insert a boolean, if not sent or null it'll default to true.
      usesBubbles: true
    }
    new Carousel(element, options)
  </script>
  <link rel="stylesheet" href="./css/style.min.css">
</head>
<body>
  <div class="carousel-container">
    <div class="carousel-wrapper">

      <!-- Insert divs and/or imgs with the class "carousel-item" -->
      <img class="carousel-item" src="IMAGE_URL">

      <div class="carousel-item">
        <!-- Div Content -->
      </div>

    </div>
  </div>
</body>
```

## Using more than one carousel:
```html
<head>
  <script type="module">
    import Carousel from './js/Carousel.js'
    const options = { /* insert options here */ }
    const carousels = document.querySelectorAll('.carousel-container')
    carousels.forEach(element => new Carousel(element, options))
  </script>
  <link rel="stylesheet" href="./css/style.min.css">
</head>
<body>
  <!-- Carousel 1 -->
  <div class="carousel-container">
    <div class="carousel-wrapper">

      <!-- Insert divs and/or imgs with the class "carousel-item" -->
      <img class="carousel-item" src="IMAGE_URL">

      <div class="carousel-item">
        <!-- Div Content -->
      </div>

    </div>
  </div>

  <!-- Carousel 2 -->
  <div class="carousel-container">
    <div class="carousel-wrapper">

      <!-- Insert divs and/or imgs with the class "carousel-item" -->
      <img class="carousel-item" src="IMAGE_URL">

      <div class="carousel-item">
        <!-- Div Content -->
      </div>

    </div>
  </div>
</body>
```
## Using more than one carousel with different options for each one:
```html
<head>
  <script type="module">
    import Carousel from './js/Carousel.js'
    const options1 = {
      timer: 5000
    }

    const options2 = {
      timer: 3000,
      usesArrows: false
    }
    new Carousel('.carousel-1', options1)
    new Carousel('.carousel-2', options2)
  </script>
  <link rel="stylesheet" href="./css/style.min.css">
</head>
<body>
  <!-- Carousel 1 -->
  <div class="carousel-container carousel-1">
    <div class="carousel-wrapper">

      <!-- Insert divs and/or imgs with the class "carousel-item" -->
      <img class="carousel-item" src="IMAGE_URL">

      <div class="carousel-item">
        <!-- Div Content -->
      </div>

    </div>
  </div>

  <!-- Carousel 2 -->
  <div class="carousel-container carousel-2">
    <div class="carousel-wrapper">

      <!-- Insert divs and/or imgs with the class "carousel-item" -->
      <img class="carousel-item" src="IMAGE_URL">

      <div class="carousel-item">
        <!-- Div Content -->
      </div>

    </div>
  </div>
</body>
```
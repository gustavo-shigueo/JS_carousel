# Vanilla Javascript carousel

This is just a small package of files to create a JS carousel.

To use this, you must download the Carousel.js file and one of the following files:

* style.css
* style.min.css
* style.scss (which you must compile to CSS to use)

## How to use it
```html
<head>
  <script src="./js/Carousel.js"></script>
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

  <script defer>
    const options = {
      // Insert a number, if not sent or null it'll default to 5000
      // If 0 or false it'll create a manual carousel
      // value in miliseconds
      timer: 5000,

      // Insert a boolean, if not sent or null it'll default to true
      usesArrows: true

      // Insert a boolean, if not sent or null it'll default to true
      usesBubbles: true
    }
    const carousel = new Carousel('.carousel-container', options)
  </script>
</body>
```

## Using more than one carousel:
```html
<head>
  <script src="./js/Carousel.js"></script>
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

  <script defer>
    const options1 = {
      timer: 5000
    }

    const options2 = {
      timer: 3000,
      usesArrows: false
    }
    const carousel1 = new Carousel('.carousel-1', options1)
    const carousel2 = new Carousel('.carousel-2', options2)
  </script>
</body>
```
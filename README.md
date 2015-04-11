# graffiti-js

graffiti-js is a JavaScript library which uses canvas for drawing.
It consists of two parts: core and example of it's usage.

## Graffiti-Core

Graffiti-Core is a base for graffiti application. It provides drawing and JavaScript API.

### <a href="http://speranskydanil.github.io/graffiti-js/demo/Graffiti-Core/index.html">DEMO</a>

```html
<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="js/graffiti-core.js"></script>

<div id="graffiti"></div>
```

```javascript
// Initialization

gc = new GraffitiCore({
  selector: '#graffiti',

  width: 600,
  height: 300,

  brush: {
    width: 40,
    color: 'rgba(200, 200, 50, 0.75)'
  }
});

// API

gc.prev();
gc.next();
gc.clear();
alert(gc.data());
gc.setBrush({ 
  width: 40, 
  color: 'rgba(200, 200, 50, 0.75)'
});
```

![screen](https://raw.github.com/speranskydanil/Simple-Graffiti/master/screen-core.png)

## Graffiti-App

Graffiti-App is an example of using the core.

### <a href="http://speranskydanil.github.io/graffiti-js/demo/Graffiti-App/index.html">DEMO</a>

```html
<link rel="stylesheet" href="css/graffiti-app.css">

<script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script src="js/graffiti-core.js"></script>
<script src="js/graffiti-app.js"></script>

<div class="ga"></div>
```

```javascript
new GraffitiApp({
  selector: '.ga',

  width: 600,
  height: 300,

  brush: {
    width: 40,
    color: 'rgba(200, 200, 50, 0.75)'
  }
});
```

![screen](https://raw.github.com/speranskydanil/Simple-Graffiti/master/screen-app.png)

**Author (Speransky Danil):**
[Personal Page](http://dsperansky.info) |
[LinkedIn](http://ru.linkedin.com/in/speranskydanil/en) |
[GitHub](https://github.com/speranskydanil?tab=repositories) |
[StackOverflow](http://stackoverflow.com/users/1550807/speransky-danil)

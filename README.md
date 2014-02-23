# Simple-Graffiti

Simple-Graffiti is a JavaScript library which uses canvas.
It consists of two parts: core and example of it's usage.

## Graffiti-Core

Graffiti-Core is a base for graffiti application. It provides drawning and JavaScript API.

```
<script src="js/jquery.js"></script>
<script src="js/graffiti-core.js"></script>

<div id="graffiti"></div>

// initialization

gc = new GraffitiCore({
  selector: '#graffiti',

  width: 600,
  height: 300,

  brush: {
    width: 40,
    color: 'rgba(200, 200, 50, 0.75)'
  }
});

// api

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

## Graffiti-Application

Graffiti-Application is an example of using the core.

```
<link rel="stylesheet" href="css/graffiti-application.css">

<script src="js/jquery.js"></script>
<script src="js/graffiti-core.js"></script>
<script src="js/graffiti-application.js"></script>

new GraffitiApplication({
  selector: '.ga',

  width: 600,
  height: 300,

  brush: {
    width: 40,
    color: 'rgba(200, 200, 50, 0.75)'
  }
});
```

![screen](https://raw.github.com/speranskydanil/Simple-Graffiti/master/screen-application.png)

**Author (Speransky Danil):**
[Personal Page](http://dsperansky.info) |
[LinkedIn](http://ru.linkedin.com/in/speranskydanil/en) |
[GitHub](https://github.com/speranskydanil?tab=repositories) |
[StackOverflow](http://stackoverflow.com/users/1550807/speransky-danil)

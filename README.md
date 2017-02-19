# isVisible.js
Check if element is visible by the user<br />
** 90% of the screen (10% from the bottom)

## init
```javascript
var elem = document.getElementById('<ELEM>');
elem.isVisible();

// with callback function
elem.isVisible(function(){
  // Do somethings
});

// jQuery
$('.class').isVisible(callback);
```


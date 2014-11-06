;(function(document, window, undefined){

  /* CONSTRUCTOR METHOD ***************************************************** */

  var CoverFlow = function(element, options){

    options = options || {};

    // Capture a reference to the element within the object instance
    this.element = element;
    this.interval = options.interval || 1000;
    this.slideshowTimer = null;

    // Capture a reference to the object instance within the element
    this.element.coverFlow = this;

    // Initialize the component
    init(this);

  };


  /* PUBLIC API METHODS ***************************************************** */

  CoverFlow.prototype.next = function(){
    goto(this, 'next');
  };

  CoverFlow.prototype.prev = function(){
    goto(this, 'prev');
  };

  CoverFlow.prototype.goto = function(dest){
    goto(this, dest);
  };

  CoverFlow.prototype.play = function(){
    startSlideshow(this);
  };

  CoverFlow.prototype.stop = function(){
    stopSlideshow(this);
  };


  /* PRIVATE METHODS ******************************************************** */

  var init = function(coverFlow){

    createDomElements(coverFlow);
    assignEventListeners(coverFlow);

  };

  var createDomElements = function(coverFlow){

    // Add a class to the primary element
    addClass(coverFlow.element, 'coverflow');

    prepareImages(coverFlow);
    createNavigation(coverFlow);

  };

  var prepareImages = function(coverFlow){
    var images = coverFlow.querySelectorAll('img');
    var image;

    // Loop over each photo and add classes
    for (var i=0, l=images.length; i<l; i++) {
      image = images[i];

      if (i === 0) {
        addClass(image, 'center');
      } else if (i === 1 && l > 2) {
        addClass(image, 'right');
      } else if (i === l-1 && l > 2) {
        addClass(image, 'left');
      }

    }

  };

  var createNavigation = function(coverFlow){

    var nextButton = document.createElement('button');

    addClass(nextButton, 'next');

    var prevButton = document.createElement('button');

    addClass(prevButton, 'prev');

    coverFlow.element.insertBefore(prevButton, coverFlow.element.firstChild);
    coverFlow.element.appendChild(nextButton);

  };

  var assignEventListeners = function(coverFlow){

    // Assign click handlers to navigation buttons
    var buttons = coverFlow.element.getElementsByTagName('button');

    var buttonClick = function(event){
        onNavClick.call(this, event, coverFlow);
    };

    for (var i=0, l=buttons.length; i<l; i++) {
      buttons[i].addEventListener('click', buttonClick, false);
    }

  };

  var goto = function(coverFlow, dest, callback){
    if (dest === 'next' || dest === 'prev') {
      gotoByDirection(coverFlow, dest, callback);
    } else if (!isNaN(dest)) {
      gotoByIndex(coverFlow, dest, callback);
    } else if (typeof dest == 'string' && (dest.indexOf('//') === 0 || dest.indexOf('://') > -1)) {
      gotoByUrl(coverFlow, dest, callback);
    } else if (dest instanceof HTMLImageElement) {
      gotoByReference(coverFlow, dest, callback);
    }

  };

  var gotoByDirection = function(coverFlow, direction, callback){
    var images = getImages(coverFlow);
    var currentImage =
    var target;

    gotoByReference(coverFlow, target, callback);

  };

    var gotoByIndex = function(coverFlow, index, callback){
        var images = getImages(coverFlow);
        var target;

        if (images[index]) target = images[index];

        gotoByReference(coverFlow, target, callback);

    };

    var gotoByUrl = function(coverFlow, url, callback){
        var images = getImages(coverFlow);
        var image, target;

        // Loop over the images looking for one with a matching URL
        for (var i=0, l=images.length; i<l; i++) {
            image = images[i];

            if (image.hasAttribute('src') && image.getAttribute('src') == url) {
                target = images[i];
                break;
            }

        }

        gotoByReference(coverFlow, target, callback);

    };

  var gotoByReference = function(coverFlow, target, callback){

    // Check if the target is already the current photo and exit the function if it is
    if (hasClass(target, 'center')) return;



    if (callback || typeof callback == 'function') {
      callback(coverFlow);
    }

  };

  var basicTransition = function(coverFlow, target, oldTarget){

  };

  var cssTransition = function(coverFlow, target, oldTarget){

  };

  var startSlideshow = function(coverFlow){

    // Stop any pre-existing slideshow timers
    stopSlideshow(coverFlow);

    // Create a timer which will go to the next item then callback to this function
    coverFlow.slideshowTimer = setTimeout(function(){
      goto(coverFlow, 'next', startSlideshow);
    }, coverFlow.interval);

  };

  var stopSlideshow = function(coverFlow){
    clearTimeout(coverFlow.slideshowTimer);
  };

  var addClass = function(element, classNames){
    var classes = element.className.split(' ');

    classNames = (typeof classNames == 'string') ? classNames.split(' ') : classNames;

    classes = classes.concat(classNames);

    element.className = classes.join(' ').replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');

    return element;

  };

  var removeClass = function(element, classNames){

    return element;

  };

  var hasClass = function(element, className){
    var regEx = new RegExp('(^| )' + className + '( |$)', 'gi');

    return regEx.test(element.className);

  };


  /* EVENT LISTENERS ******************************************************** */

  var onNavClick = function(event, coverFlow){

    if (hasClass(this, 'next')) {
      goto(coverFlow, 'next');
    } else if (hasClass(this, 'prev')) {
      goto(coverFlow, 'prev');
    }

  };


  // If the window variable is defined set a reference to the CoverFlow object
  if (window) window.CoverFlow = CoverFlow;


})(document, window);

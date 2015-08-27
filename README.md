# Slider

//the constructor wants a jquery list of slides, not the container  
**var slideshow = Slider.Create($("ul.Slideshow li"));**  

// configure buttons by passing in a list of jquery elements. These buttons MUST have the attribute "data-slider-absolute" set to an positive integer indicating the number of the slide you want to show  
**slideshow.ControlsAbsolute($(".Buttons"));**  

// configure previous/next type buttons by passing in a list of jquery elements. These buttons MUST have the attribute "data-slider-relative" set to an integer indicating the number of the slides you want to advance by. Using a negative number will make the show go backwards. Typical values for previous/next would be -1 and 1 respectively  
**slideshow.ControlsRelative($(".Prev, .Next"));**  

// run the slideshow on a timer. call Play and pass in a millisecond delay. a Stop method also exists.  
**slideshow.Play(3200);**  
**slideshow.Stop();**  

// get the current slide  
**slideshow.Index;**  

// slider is not a true event dispatcher, but the property ChangeHandler is a function that is called when a slide is changed. the old index and new index are passed as two arguments to the handler.  

**var container = $("ul.Slideshow");**  
**var slides = $("ul.Slideshow li");**  
**var slideshow = slider.Create(slides);**  
**slideshow.ChangeHandler = function(inOld, inNew){**  
   **contianer.stop(true, false);**  
   **container.animate({height:+slides.eq(slideshow.Index).outerHeight()+"px"}, 200);**  
**};**  



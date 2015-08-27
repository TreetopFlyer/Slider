var Slider = {};

Slider.Horizontal = {};
Slider.Horizontal.Start = {};
Slider.Horizontal.Start.left = "-100%";
Slider.Horizontal.Rest = {};
Slider.Horizontal.Rest.left = "0%";
Slider.Horizontal.Stop = {};
Slider.Horizontal.Stop.left = "100%";

Slider.Vertical = {};
Slider.Vertical.Start = {};
Slider.Vertical.Start.top = "-100%";
Slider.Vertical.Rest = {};
Slider.Vertical.Rest.top = "0%";
Slider.Vertical.Stop = {};
Slider.Vertical.Stop.top = "100%";

Slider.Attributes = {};
Slider.Attributes.Absolute = "data-slider-absolute";
Slider.Attributes.Relative = "data-slider-relative"
Slider.Attributes.Immediate = "data-slider-immediate"

Slider.Left = "everything to the left";
Slider.Right = "everything to the right";
Slider.Auto = "calculate direction based on request versus actual indicies";

Slider.Create = function (inSlides)
{
    var obj = this;
    obj.timer = false;

	obj.Transition = {};
	obj.Transition.Speed = 500;
	obj.Transition.Active = false;
	
    obj.CSS = Slider.Horizontal;

	obj.JQ = {};
	obj.JQ.Slides = inSlides;
	obj.JQ.Slides.css(obj.CSS.Stop);
	obj.JQ.Slides.eq(0).css(obj.CSS.Rest);
	
    obj.Index = 0;

    obj.ChangeHandler = function (inOldIndex, inNewIndex)
    {

    };
    obj.PlayHandler = function ()
    {
        obj.ShowNext();
    }
	obj.TransitionDone = function ()
    {
        obj.Transition.Active = false;
    };
    obj.Wrap = function (inIndex)
    {
        if (inIndex == -1)
            return obj.JQ.Slides.length - 1;

        if (inIndex == obj.JQ.Slides.length)
            return 0;

        return inIndex;
    };
	
	obj.ControlsAbsolute = function(inJQ)
	{
		inJQ.each(function(inIndex)
		{
			var jq = $(this);
			var attribute = jq.attr(Slider.Attributes.Absolute);
			var index;
			if(attribute !== undefined)
			{
				index = parseInt(attribute);
				jq.click(function(e)
				{
					if(jq.attr(Slider.Attributes.Immediate) === undefined)
						obj.ShowIndex(index, Slider.Auto);
					else
						obj.ForceIndex(index);
				});
			}
		});
	}
	obj.ControlsRelative = function(inJQ)
	{
		inJQ.each(function(inIndex)
		{
			var jq = $(this);
			var attribute = jq.attr(Slider.Attributes.Relative);
			var index;
			var direction;
			if(attribute !== undefined)
			{
				index = parseInt(attribute);
				jq.click(function(e)
				{
					if(index < 0)
						direction = Slider.Right;
					else
						direction = Slider.Left;
					
					if(jq.attr(Slider.Attributes.Immediate) === undefined)
						obj.ShowIndex(obj.Wrap(obj.Index + index), direction);
					else
						obj.ForceIndex(obj.Wrap(obj.Index + index));
				});
			}
		});
	}
	
    obj.ShowIndex = function (n, inDirection)
    {
        var goLeft = false;
		var indexOld, indexNew;
		indexOld = obj.Index;
		indexNew = n;
		
        if (obj.Index != n && !obj.Transition.Active)
        {
            switch (inDirection)
            {
                case Slider.Left:
                    goLeft = true;
                    break;

                case Slider.Right:
                    goLeft = false;
                    break;

                case Slider.Auto:
                    if (n > obj.Index)
                        goLeft = true;
                    break;
            }



            if (goLeft)
            {
                //slide everything to the LEFT
                obj.JQ.Slides.eq(obj.Index).animate(obj.CSS.Start, obj.Transition.Speed);
                obj.Index = n;
                obj.JQ.Slides.eq(obj.Index).css(obj.CSS.Stop);
            }
            else
            {
                //slide everything to the RIGHT
                obj.JQ.Slides.eq(obj.Index).animate(obj.CSS.Stop, obj.Transition.Speed);
                obj.Index = n;
                obj.JQ.Slides.eq(obj.Index).css(obj.CSS.Start);
            }

            obj.JQ.Slides.eq(obj.Index).animate(obj.CSS.Rest, obj.Transition.Speed, obj.TransitionDone);
            obj.Transition.Active = true;

			obj.ChangeHandler(indexOld, indexNew);			
			
            return true;
        }
		
		obj.ChangeHandler(indexOld, indexNew);	
		
        return false;
    };
    obj.ShowNextN = function (inJump)
    {
        obj.ShowIndex(obj.Index + inJump, Slider.Left);
    };
    obj.ShowNext = function ()
    {
        obj.ShowIndex(obj.Wrap(obj.Index + 1), Slider.Left);
    };
    obj.ShowPrev = function ()
    {
        obj.ShowIndex(obj.Wrap(obj.Index - 1), Slider.Right);
    };
    obj.ForceIndex = function (n)
    {
        obj.JQ.Slides.eq(obj.Index).stop(true, false);
        obj.JQ.Slides.eq(obj.Index).css(obj.CSS.Stop);
		obj.ChangeHandler(obj.Index, n);
        obj.Index = n;
        obj.JQ.Slides.eq(obj.Index).css(obj.CSS.Rest);
    };
    obj.Stop = function ()
    {
        clearInterval(obj.timer);
    };
    obj.Play = function (inDelay)
    {
        if (obj.JQ.Slides.length > 1)
        {
            obj.timer = setInterval(obj.PlayHandler, inDelay);
        }
    }
    return obj;
};

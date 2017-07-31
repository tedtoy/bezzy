# bezzy
A function to make drawing beziers easier.

# Why
I have found drawing beziers to be counterintuitive given their implementation in the current HTML SVGElement API for two reasons.

Reason 1:

In the current cartesian coordinate system, the Y-axis is "inverted" such that "0" starts at the top and y increases in value as you move downwards.
This is apparently a relic from much earlier times to facilitate drawing graphics on CRT screens.

Current work-arounds are hacks (eg: using css transformation to flip your SVG to reverse the coordinate system)

Reason 2:

The API is too low-level. Drawing the invisible control points that result in the curves of your lines requires specifying their exact coordinates, which requires one to calculate those points beforehand, a tedious and menial practice.

Ideally, you should be able to specify your start and end points and then supply additional variables that determine the amount of curving and the bezier should be able to calculate the necessary control points automatically.

# How

You need to know two things a priori: Your starting coordinates and your ending coordinates. 

Instead of calculating your control points, you supply a list of control points that are themselves lists of two items: [ percentage_a, percentage_b ]. The values of these items are relative to an invisible line drawn from your start to end points and are transformed into absolute coordinates by logic in the function.

(percentage_a and percentage_b) are values from 0-100.

percentage_a determines how far to the left or right of your line you want the control point to be.

percentage_b determines how far down the line you want the control point to be.



        //             /
        //            /    E
        //   G(x,y)  /___________
        //          /* .         |
        //         /|     * .    | D
        //      C / |      F    *.
        //       /  | B               H(x,y)  <- This is the control coordinate we need to calculate.
        //      /___|
        //        A

So you may call the function like this:
```
var startpoint = [0,0];
var endpoint = [100,100];
var controlpoint1 = [20, 40]
var controlpoint2 = [-20, 80]

var points = [startpoint, controlpoint1, controlpoint2, endpoint]

var path = bezzy(points);

// (now you can use your path on the d attribute of your <path svg)

var el = document.createElementNS("http://www.w3.org/2000/svg", 'path');
el.setAttribute("d", path);
el.setAttribute("fill", "transparent");
el.setAttribute("stroke", "blue");
el.setAttribute("stroke-width", "1");
el.setAttribute("stroke-opacity", "0.2");

YOUR_PARENT_SVG_ELEMENT.appendChild(el)


```

# todo'ing
I need to finish this write up and add live code examples.

# future
I would like to expand on this with the ability to draw lines from one html element to another.

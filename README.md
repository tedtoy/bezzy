# bezzy
Some functions to make drawing beziers a little easier

# why
I have found drawing beziers to be counterintuitive with the current svg API. 
For starters, the Y axis is inverted compared to the conception of charts that most people have. Having a y coordinate of 0 at the top of the chart which increases as you move down is, apparently, an archaic convention from earlier times to facilitate drawing lines on CRT screens. But when used in the context of web development, it seems that its primary purpose is to confer additional headache on a canvas eager individual while leaving a small barrier in the path of those who may attempt any svg undertakings, thus reducing innovation around this corner of web development in general.

Secondly, the API for drawing beziers is very literal to the points being drawn themselves. Specifically, the exact coordinates of your control points must be known as a condition for drawing the entire line. The difficulty with this is that A) given the unfamiliarity that many people have with beziers (seriously, how often do you encounter beziers in your daily routine?), one may not have a good idea of which control points to use and many attemps may be required for the desired effect and B) the excersize of determining the coordinates for your control point requires a mundane and menial amount of maths all of which is further complicated by a combination of the lines direction, the direction of the curve, as well as the inverted y axis described earlier.

So I wanted to see if getting rid of the two annoyances above would allow me more freedom in my ability to draw squiggly lines.

# how
For now, the implementation is straightforward and is simply a wrapper around the existing bezier API.

You need to know two things a priori: Your starting coordinates and your ending coordinates.

Instead of calculating your control points, you supply a list of control points that are themselves lists of two items: [ percentage_a, percentage_b ]. The values of these items are relative to an invisible line drawn from your start to end points and are transformed into absolute coordinates by logic in the function.

percentage_a and percentage_b are values from 0-100.

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

varr points = [startpoint, controlpoint1, controlpoint2, endpoint]

var path = bezzy(points);
// (now you can use your path on the d attribute of your <path svg)
```

# todo
I need to finish this write up and add live code examples.

# future
I would like to expand on this with the ability to draw lines from one html element to another.

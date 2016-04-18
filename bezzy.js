/*
 *  Bezzy - a user intuitive wrapper for the SVG API so you can make nice curving lines.
 *
 *
 **/

function bezzy(coords){

    var start = coords[0];                      // absolute, pixels
    var end = coords.slice(-1)[0];     // absolute, units of pixels
    var relative_controls = coords.slice(1,-1); // relative, units of percentage

    // calculate slope variables:
    var rise = -1 * (end[1] - start[1]);
    var run = end[0] - start[0];
    var _slope_ = rise / run;
    var _inv_slope_ = run / rise;
    var _distance_ = Math.sqrt( Math.pow(rise, 2) + Math.pow(run, 2));

    // convert relative control points -> absolute points
    var controlsf = [];
    for (var i = 0; i < relative_controls.length; i++){
        var c = relative_controls[i];
        

        // Triangle A,B,C is a right triangle under the slope of the control intersection.
        // Triangle D,E,F is a right triangle adjacent to the control point itself.
        // G is the coordinate denoted by a distance of % control_y * the length of the total distance
        // H is the coordinate denoted by a distance of % control_x * total distance at a perpendicular angle to 
        // the slope.
        //
        //             /
        //            /    E
        //   G(x,y)  /___________
        //          /* .         |
        //         /|     * .    | D
        //      C / |      F    *.
        //       /  | B               H(x,y)  <- This is the control coordinate we need to calculate.
        //      /___|
        //        A
        
        // Get angle:
        var theta = Math.asin(rise / _distance_)
        
        // Triangle A,B,C
        var length_C = Math.abs((c[1] / 100) * _distance_);
        var length_A = Math.abs(length_C * Math.cos(theta));
        var length_B = Math.abs(length_C * Math.sin(theta));
        
        // Triangle D,E,F
        var length_F = Math.abs((c[0] / 100) * _distance_);
        var length_E = Math.abs(length_F * Math.sin(theta));
        var length_D = Math.abs(length_F * Math.cos(theta));

        // Determine direction of lines so we know if we need to add or subtract
        var dcx, dx, dy;
        dx = (end[0] > start[0])
            ? 1
            : 0;
        dy = (end[1] > start[1])
            ? 0
            : 1;
        dcx = (c[0] > 0) 
            ? 1
            : 0;

        // Apply translations:
        //   * There must be a more mathematically elegant way. 
        //     If you know - tell me!!                            
        var translateA, translateD;
        if (dx && dy && !dcx){           // 1
            translateA = [ 1, 1];
            translateD = [-1, 1];
        } else if (dx && dy && dcx){     // 2
            translateA = [ 1, 1];
            translateD = [ 1,-1];
        } else if (dx && !dy && !dcx){   // 3
            translateA = [ 1,-1];
            translateD = [ 1, 1];
        } else if (dx && !dy && dcx) {   // 4
            translateA = [ 1,-1];
            translateD = [-1,-1];

        } else if (!dx && !dy && dcx) {  // 1
            translateA = [-1,-1];
            translateD = [-1, 1];
        } else if (!dx && !dy && !dcx) { // 2
            translateA = [-1,-1];
            translateD = [ 1,-1];
        } else if (!dx && dy && dcx) {   // 3
            translateA = [-1, 1];
            translateD = [ 1, 1];
        } else if (!dx && dy && !dcx) {  // 4
            translateA = [-1, 1];
            translateD = [-1,-1];
        }

        // invert y axis:
        translateD = [translateD[0], (translateD[1] * -1)];
        translateA = [translateA[0], (translateA[1] * -1)];
        
        var coords_G, coords_H;

        var Gx = start[0] + translateA[0] * length_A;
        var Gy = start[1] + translateA[1] * length_B;

        var Hx = Gx + translateD[0] * length_E;
        var Hy = Gy + translateD[1] * length_D;

        coords_G = [Gx, Gy];
        coords_H = [Hx, Hy];

        controlsf.push(coords_H);

        /*
        var debug = true;
        if(debug){
            console.log(" # debugging control points "+(i+1))
            console.log(c)
            console.log("    start: " + start)
            console.log("      end: " + end)
            console.log("       dx: " + dx)
            console.log("       dy: " + dy)
            console.log("      dcx: " + dcx)
            console.log("    slope: " + _slope_)
            console.log("     rise: " + rise)
            console.log("      run: " + run)
            console.log(" distance: " + _distance_)
            console.log("    theta: " + theta)
            console.log(" length_A: " + length_A)
            console.log(" length_B: " + length_B)
            console.log(" length_C: " + length_C)
            console.log(" length_D: " + length_D)
            console.log(" length_E: " + length_E)
            console.log(" length_F: " + length_F)
            console.log("       Gx: " + Gx )
            console.log("       Gy: " + Gy )
            console.log("       Hx: " + Hx )
            console.log("       Hy: " + Hy )
        }
        */
    }
    
    // path: absolute, units in pixels.
    var path = "M"+start.join() + " C " + controlsf.join(" ") + " " + end.join();

    return path;
}



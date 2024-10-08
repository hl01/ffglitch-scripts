// dd_RandomDamage(sliceHB).js
// disrupt bottom of frame if threshold met

let threshold = 95;

var DISPLACE = 0;
var MAGNITUDE = 500;

export function setup(args)
{
    args.features = [ "mv" ];
}

export function glitch_frame(frame)
{
    var do_or_not = Math.random() * 100;
    // only do the glitch if our random number crosses the threshold
    if(do_or_not > threshold){
        DISPLACE = (Math.random() * MAGNITUDE) - (MAGNITUDE*0.5);
        // bail out if we have no motion vectors
        let mvs = frame["mv"];
        if ( !mvs )
            return;
        // bail out if we have no forward motion vectors
        let fwd_mvs = mvs["forward"];
        if ( !fwd_mvs )
            return;

        var M_H = fwd_mvs.length/2;
        // clear horizontal element of all motion vectors
        for ( let i = 0; i < fwd_mvs.length; i++ )
        {
            // loop through all rows
            let row = fwd_mvs[i];
            var M_W = row.length/2;

            for ( let j = 0; j < row.length; j++ )
            {
                // loop through all macroblocks
                let mv = row[j];

                // THIS IS WHERE THE MAGIC HAPPENS
                // MULTIPLY X & Y VECTORS
                if(i>=M_H){
                    mv[0] = mv[0] + DISPLACE;
                    mv[1] = mv[1];
                }


            }
        }
    }
}

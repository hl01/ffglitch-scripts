// dd_rot8_180.js

// clean buffer :
var buffer = [ ];

var ZOOM = -20;

export function setup(args)
{
    args.features = [ "mv" ];
}

export function glitch_frame(frame)
{
    // bail out if we have no forward motion vectors
    const fwd_mvs = frame.mv?.forward;
    if ( !fwd_mvs )
        return;

    // set motion vector overflow behaviour in ffedit to "truncate"
    frame.mv.overflow = "truncate";

    // note that we perform a deep copy of the clean motion
    // vector values before modifying them.
    let json_str = JSON.stringify(fwd_mvs);
    let deep_copy = JSON.parse(json_str);
    // stick em in the buffer
    buffer = deep_copy;

    var M_H = fwd_mvs.length/2;
    // VERTICALLY
    for ( let i = 0; i < fwd_mvs.length; i++ )
    {

        // loop through all rows

        let row = fwd_mvs[i];
        var row2 = buffer[(fwd_mvs.length-1)-i];
        //var row2 = fwd_mvs[(fwd_mvs.length-1)-i];

        var M_W = row.length/2;

        // HORIZONTALLY
        for ( let j = 0; j < row.length; j++ )
        {
            // loop through all macroblocks
            let mv = row[j];
            var mv2 = row2[(row.length - 1) - j];
            // THIS IS WHERE THE MAGIC HAPPENS
            mv[0] = 0-mv2[0];
            mv[1] = 0-mv2[1];
        }
    }
}

$(document).ready(function(){
    setTimeout(function(){
    $('.live-tile').liveTile({
        playOnHover:true,
        startNow: false,
        initDelay: 0,
        repeatCount: 0,
        onHoverDelay: 400,
        delay: 2000,
        animationComplete: function(tileData, $front, $back){
            /*
            console.log('tile has animated ' + tileData.loopCount + ' times');
            console.log($front);
            console.log($($front));
            if(tileData.loopCount > 2){
                $($front).parent().liveTile("restart",0);
                $($front).parent().liveTile("stop",0);
            } else {
                $($front).parent().liveTile("play",{
                    delay: 1000
                });
            }
            console.log(tileData);
            */
        }
    })}, 100);
});


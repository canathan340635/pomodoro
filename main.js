
function pomodoro()
{
    document.getElementById("body").style.backgroundColor = "tomato";
    
    clearActive();
    document.getElementById("pomobtn").className +=  " active";
    
    var startsWith = "bg";
    var classes = document.getElementById("pomobtn").className.split(" ").filter(function(v) {
        return v.lastIndexOf(startsWith, 0) !== 0;
    });
    document.getElementById("pomobtn").className = classes.join(" ").trim();
    document.getElementById("pomobtn").classList += " bg-danger"

    var classes = document.getElementById("shortbtn").className.split(" ").filter(function(v) {
        return v.lastIndexOf(startsWith, 0) !== 0;
    });
    document.getElementById("shortbtn").className = classes.join(" ").trim();
    document.getElementById("shortbtn").classList += " bg-danger"
    
    var classes = document.getElementById("longbtn").className.split(" ").filter(function(v) {
        return v.lastIndexOf(startsWith, 0) !== 0;
    });
    document.getElementById("longbtn").className = classes.join(" ").trim();
    document.getElementById("longbtn").classList += " bg-danger"
    setTimer("pomodoro")
}
function shortBreak()
{
    document.getElementById("body").style.backgroundColor = "#99ffff";

    clearActive();
    document.getElementById("shortbtn").className +=  " active";
    
    var startsWith = "bg";
    var classes = document.getElementById("pomobtn").className.split(" ").filter(function(v) {
        return v.lastIndexOf(startsWith, 0) !== 0;
    });
    document.getElementById("pomobtn").className = classes.join(" ").trim();
    document.getElementById("pomobtn").classList += " bg-info"

    var classes = document.getElementById("shortbtn").className.split(" ").filter(function(v) {
        return v.lastIndexOf(startsWith, 0) !== 0;
    });
    document.getElementById("shortbtn").className = classes.join(" ").trim();
    document.getElementById("shortbtn").classList += " bg-info"
    
    var classes = document.getElementById("longbtn").className.split(" ").filter(function(v) {
        return v.lastIndexOf(startsWith, 0) !== 0;
    });
    document.getElementById("longbtn").className = classes.join(" ").trim();
    document.getElementById("longbtn").classList += " bg-info"

    setTimer("shortBreak")

}
function longBreak()
{
    document.getElementById("body").style.background = "#3385ff";

    clearActive();
    document.getElementById("longbtn").className +=  " active";
    
    var startsWith = "bg";
    var classes = document.getElementById("pomobtn").className.split(" ").filter(function(v) {
        return v.lastIndexOf(startsWith, 0) !== 0;
    });
    document.getElementById("pomobtn").className = classes.join(" ").trim();
    document.getElementById("pomobtn").classList += " bg-primary"

    var classes = document.getElementById("shortbtn").className.split(" ").filter(function(v) {
        return v.lastIndexOf(startsWith, 0) !== 0;
    });
    document.getElementById("shortbtn").className = classes.join(" ").trim();
    document.getElementById("shortbtn").classList += " bg-primary"
    
    var classes = document.getElementById("longbtn").className.split(" ").filter(function(v) {
        return v.lastIndexOf(startsWith, 0) !== 0;
    });
    document.getElementById("longbtn").className = classes.join(" ").trim();
    document.getElementById("longbtn").classList += " bg-primary"
    setTimer("longBreak")
}

function setTimer(timerType)
{
    if (timerType == "pomodoro")
    {
        timerMinutes = pomodoroTimer;
        timerSecond = seconds;
        type = "pomodoro";

    }
    else if (timerType == "shortBreak")
    {
        timerMinutes = shortBreakTimer;
        timerSecond = seconds;
        type = "shortBreak";
    }
    else if (timerType == "longBreak")
    {
        timerMinutes = longBreakTimer;
        timerSecond = seconds;
        type = "longBreak";
    }

    timer = timerMinutes * 60000 + timerSecond * 1000;
    resetCountdown();
}

function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    if (seconds == 60)
    {
        return minutes  + 1 + ":" + "00";
    }
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
function countdown()
{
    if (! counting)
    {         
        var dstart = new Date();
        var dend = new Date(dstart);
        dend.setMilliseconds(dend.getMilliseconds() +timerLeft );

        counting = true;
        document.getElementById("startcountdown").style.display = "none";
        document.getElementById("stopcountdown").style.display  = "inline";
        document.getElementById("resetcountdown").style.display = "inline";
        document.getElementById("endcountdown").style.display = "inline";

    }

    if (counting)
    {
        interval = setInterval(function(){
            timerLeft = dend - new Date();
            if (timerLeft <= 0)
            {
                endCountdown("auto");
            }
            document.getElementById("timerDisplay").innerHTML =millisToMinutesAndSeconds(timerLeft);
        },1000);
    }
}
function resetCountdown()
{
    
    counting = false;                  
    clearInterval(interval)
    interval = null;
    document.getElementById("resetcountdown").style.display = "none";
    document.getElementById("stopcountdown").style.display  = "none";
    document.getElementById("endcountdown").style.display = "none";
    document.getElementById("startcountdown").style.display = "inline";
    
    timerLeft = timer;
    document.getElementById("timerDisplay").innerHTML = millisToMinutesAndSeconds(timerLeft);
}
function stopCountdown()
{
    counting = false;
    clearInterval(interval);
    interval = null;
    document.getElementById("resetcountdown").style.display = "inline";
    document.getElementById("stopcountdown").style.display  = "none";
    document.getElementById("startcountdown").style.display = "inline";
    
}
function endCountdown(text)
{   
    if(text == "auto")
    {
        audio.play();
    }

    if (type == "pomodoro" && pomodoroCounter!=4)
    {
        type = "shortBreak"
        pomodoroCounter++;
        document.getElementById("pomodoroCount").innerHTML = "#" + (pomodoroCounter ) + "/4";
        shortBreak();
    }
    else if (type == "pomodoro" && pomodoroCounter == 4)
    {
        type = "longBreak"
        pomodoroCounter = 1;
        document.getElementById("pomodoroCount").innerHTML = "#" + (pomodoroCounter ) + "/4";
        totalCycles ++;
        if (totalCycles == 1)
        {
            document.getElementById("totalCycles").innerHTML = "Completed 1 cycle.";
        }
        else
        {
            document.getElementById("totalCycles").innerHTML = "Completed " + totalCycles  + " cycles."; 
        }

        longBreak();
    }
    else if (type == "shortBreak")
    {
        type = "pomodoro"
        pomodoro();
    }
    else if (type == "longBreak")
    {
        type = "pomodoro"
        pomodoro();
    }
}

function clearActive()
{
    document.getElementById("pomobtn").className= document.getElementById("pomobtn").className.replace("active","");
    document.getElementById("shortbtn").className= document.getElementById("shortbtn").className.replace("active","");
    document.getElementById("longbtn").className = document.getElementById("longbtn").className.replace("active","");
}
function playButtonSound()
{
    buttonAudio = new Audio("buttonClick.mp3");
    buttonAudio.play();
}
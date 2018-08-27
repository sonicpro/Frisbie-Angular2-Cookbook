/*global Zone, setInterval */

var button = document.getElementById("button");
var add = document.getElementById("add");
var remove = document.getElementById("remove");

Zone.current.fork({
    onScheduleTask: function (zoneDelegate, zone, targetZone, task) {
        console.log("schedule");
        zoneDelegate.scheduleTask(targetZone, task); // required for the below three callbacks (int setInterval and addEventListener x 2) to be scheduled.
    },
     onCancelTask: function (zoneDelegate, zone, targetZone, task) {
        console.log("cancel");
        // zoneDelegate.cancelTask(targetZone, task); // Is not required required in zone 0.8.26?
    },
    onInvokeTask: function (zoneDelegate, zone, targetZone, task, applyThis, applyArgs) {
        console.log("invoke");
        zoneDelegate.invokeTask(targetZone, task, applyThis, applyArgs); // required for any callback to work.
    },
    onHasTask: function (zoneDelegate, zone, targetZone, isEmpty) {
        console.log("hasTask");
        zoneDelegate.hasTask(targetZone, isEmpty); // isEmpty is a map of three booelan properties; each of those corresponds to the task type need to be checked.
    }
}).run(function() {
    var clickCallback = function() {
        console.log("click!");
    };

    // setInterval(function() {
    //     console.log("set interval!");
    // }, 1000);

    add.addEventListener("click", function () {
        button.addEventListener("click", clickCallback);
    });

    remove.addEventListener("click", function () {
        button.removeEventListener("click", clickCallback);
    });
});

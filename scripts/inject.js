(function (){
    console.log('hacker voice im injected');

    async function get_status(){
        return new Promise(resolve=>{
            function addlistener () {
                window.addEventListener("message", (event) => {
                    // We only accept messages from ourselves
                    if (event.source !== window) {
                        addlistener();
                    }
                    
                    if (event.data.type && (event.data.type === "FROM_CONTENT")) {
                        console.log("Page script received");
                        resolve(event.data.data);
                    } else {
                        addlistener();
                    }
                },{once:true});
            }
            addlistener();
            window.postMessage({type : "FROM_PAGE"}, "*");
        });
    }

    if(navigator.geolocation){
        console.log(navigator.geolocation.getCurrentPosition)
        navigator.geolocation.getCurrentPosition = async function(cb1, cb2, options) {
            const status = await get_status();
            console.log(status);
            cb1({coords: {latitude: status.latitude, longitude: status.longitude, altitude: null, accuracy: 1, altitudeAccuracy: null, heading: null, speed:status.speed}, timestamp: new Date().getTime()});
        };
        console.log(navigator.geolocation.getCurrentPosition)
        const handlers = {};

        navigator.geolocation.watchPosition = function(cb1, cb2, options) {
            console.log("watching...");
            const handler = Math.floor(Math.random()*10000);
            (async () => {
                while (1) {
                    console.log("watching...");
                    this.getCurrentPosition(cb1, cb2, options);
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }
            })();
            return handler;
        };

        navigator.geolocation.clearWatch = function (handler) {
            // nothing for now
        };
    }
})();

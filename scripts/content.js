(function (){
    var script = document.createElement('script');
	script.setAttribute('id', '__coi_script');
	script.setAttribute('src', chrome.runtime.getURL("scripts/inject.js"));

	// FF: there is another variables in the scope named parent, this causes a very hard to catch bug
	var _parent = document.head || document.body || document.documentElement;
	var firstChild = (_parent.childNodes && (_parent.childNodes.length > 0)) ? _parent.childNodes[0] : null;
	if(firstChild)
		_parent.insertBefore(script, firstChild);
	else
		_parent.appendChild(script);

    window.addEventListener("message", (event) => {
        // We only accept messages from ourselves
        if (event.source !== window) {
            return;
        }
        
        if (event.data.type && (event.data.type === "FROM_PAGE")) {
            console.log("Content script received");
            chrome.runtime.sendMessage({}).then((status)=>{
                window.postMessage({type: "FROM_CONTENT", data: status}, "*");
            });
        }
    }, false);
})();
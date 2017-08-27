var Includer = {
	importScript: function (nazwa) {
			var script = document.createElement('script');
			script.src = nazwa;
			document.head.appendChild(script);
		},
	importScripts: function (nazwy) {		
			for (i = 0; i < nazwy.length; i++) {
				this.importScript(nazwy[i]);
			}			
		},
	importLink: function (nazwa1) {
			var link = document.createElement('link');			
			link.href = nazwa1;
			link.rel = 'stylesheet';
			link.type = 'text/css';
			document.head.appendChild(link);
		},
	importLinks: function (nazwy2) {		
			for (i = 0; i < nazwy2.length; i++) {
				this.importLink(nazwy2[i]);
			}			
		}
};
/* http://www.kryogenix.org/code/browser/searchhi/ */
/* Modified 20021006 to fix query string parsing and add case insensitivity */
/* Modified 20061207 by J�rgen Gutsch (www.gutsch-online.de) 
		to add different colors for multiple search words */
		
function highlightWord(node, word, num) {
	// Iterate into this nodes childNodes
	if (node.hasChildNodes) {
		var hi_cn;
		for (hi_cn=0;hi_cn<node.childNodes.length;hi_cn++) {
			highlightWord(node.childNodes[hi_cn],word, num);
		}
	}
	// And do this node itself
	if (node.nodeType == 3) { // text node
		tempNodeVal = node.nodeValue.toLowerCase();
		tempWordVal = word.toLowerCase();
		if (tempNodeVal.indexOf(tempWordVal) != -1) {
			pn = node.parentNode;
			//alert(num);
			if (pn.className != "searchword"+num) {
				// word has not already been highlighted!
				nv = node.nodeValue;
				ni = tempNodeVal.indexOf(tempWordVal);
				// Create a load of replacement nodes
				before = document.createTextNode(nv.substr(0,ni));
				docWordVal = nv.substr(ni,word.length);
				after = document.createTextNode(nv.substr(ni+word.length));
				hiwordtext = document.createTextNode(docWordVal);
				hiword = document.createElement("span");
				hiword.className = "searchword"+num;
				hiword.appendChild(hiwordtext);
				pn.insertBefore(before,node);
				pn.insertBefore(hiword,node);
				pn.insertBefore(after,node);
				pn.removeChild(node);
			}
		}
	}
}
function googleSearchHighlight() {
	if (!document.createElement) return;
	ref = document.referrer;
	if (ref.indexOf('?') == -1 || ref.indexOf('http://www.gutsch-online.com/') != -1)
	{
		if (document.location.href.indexOf('PermaLink') != -1) {
			if (ref.indexOf('SearchView.aspx') == -1) return;
		}
		else {
			//Added by Scott Hanselman
			ref = document.location.href;
			if (ref.indexOf('?') == -1) return;
		}
	}
	qs = ref.substr(ref.indexOf('?')+1);
	qsa = qs.split('&');
	for (i=0;i<qsa.length;i++) {
		qsip = qsa[i].split('=');
        if (qsip.length == 1) continue;
    	if (qsip[0] == 'q' || qsip[0] == 'p') { // q= for Google, p= for Yahoo
			words = unescape(qsip[1].replace(/\+/g,' ')).split(/\s+/);
            for (var w=0;w<words.length;w++) {
				highlightWord(document.getElementsByTagName("body")[0], words[w], w);
        	}
		}
	}
}
window.onload = googleSearchHighlight;
//</script>
//<style type="text/css">
//.searchword{
//    background-color: yellow;
//}
//</style>
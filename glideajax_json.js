var GlideAjaxJsonExample = Class.create();
GlideAjaxJsonExample.prototype = Object.extendsObject(AbstractAjaxProcessor, {

  /**
   * From the script include definition
   * 1. Create a results array
   * 2. Create GlideRecord
   * 3. Filter the GlideRecord by the recieved parameter
   * 4. Loop over result set pushing results to the array
   * 5. Stringify the array and return it
   */
	getMyStuff: function(){
		var results = [];
		var gr = new GlideRecord("tableName");
		gr.addQuery("tableColumn", this.getParameter("sysparm_tableColumnValue"));
		gr.query();
		while(gr.next()){
			results.push(gr.user.name.toString());
		}
		return JSON.stringify(results);
	},

    type: 'GlideAjaxJsonExample'
});


/**
 * Calling the script include from the client side
 * 1. Instantiate the new GlideAjax object
 * 2. Set sysparm_name to the name of the script include function to run
 * 3. Create additional parameter values as necessary
 * 4. Call the script include with getXML()
 * 5. Process the response with a callback function
 * 6. Do something useful with each result
 */
var ga = new GlideAjax("GlideAjaxExample");
ga.addParam("sysparm_name", "getMyStuff");
ga.addParam("sysparm_tableColumnValue", "tableColumnValue");
ga.getXML(processResponse);

function processResponse(response){
  var jsonAnswer = response.responseXML.documentElement.getAttribute("answer");
  var results = JSON.parse(jsonAnswer);
  results.forEach(function(element) { doSmth(element); });
}

function doSmth(elem){
  //do something useful with each result
  console.log(elem);
}
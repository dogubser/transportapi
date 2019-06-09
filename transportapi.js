(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
		tableau.log("Hello WDC!");
    };

    myConnector.getData = function (table, doneCallback) {
		$.getJSON("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson", function(resp) {
			var feat = resp.features,
				tableData = [];

			// Iterate over the JSON object
			for (var i = 0, len = feat.length; i < len; i++) {
				tableData.push({
					"id": feat[i].id,
					"mag": feat[i].properties.mag,
					"title": feat[i].properties.title,
					"location": feat[i].geometry
				});
			}

			table.appendRows(tableData);
			doneCallback();
		});
    };

    tableau.registerConnector(myConnector);
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Get Transport Data";
        tableau.submit();
    });
});
	
})();
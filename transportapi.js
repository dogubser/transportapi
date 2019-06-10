(function () {
    var myConnector = tableau.makeConnector();

myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "id",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "name",
        alias: "name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "coordinate",
        dataType: tableau.dataTypeEnum.geometry
    }, {
        id: "departure",
        alias: "departure",
        dataType: tableau.dataTypeEnum.string
	}];

    var tableSchema = {
        id: "earthquakeFeed",
        alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
        columns: cols
    };

    schemaCallback([tableSchema]);
};

myConnector.getData = function(table, doneCallback) {
    $.getJSON("http://transport.opendata.ch/v1/stationboard?station=Glattbrugg&limit=10", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": feat[i].id,
                "name": feat[i].properties.name,
                "coordinate": feat[i].properties.coordinate,
                "departure": feat[i].departure
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);
	$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "testest";
        tableau.submit();
    });
});
	
})();
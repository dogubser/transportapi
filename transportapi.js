(function () {
    var myConnector = tableau.makeConnector();

myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "name",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "departure",
        alias: "departure",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "platform",
        dataType: tableau.dataTypeEnum.int
    }, {
        id: "to",
        alias: "to",
        dataType: tableau.dataTypeEnum.string
	}, {
        id: "number",
        alias: "number",
        dataType: tableau.dataTypeEnum.int
	}];

    var tableSchema = {
        id: "Transportapi",
        alias: "stationboard of coming stations in Switzerland",
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
                "name": feat[i].stationboard.stop.station.name,
                "departure": feat[i].stationboard.stop.departure,
                "platform": feat[i].stationboard.stop.platform,
                "to": feat[i].stationboard.to,
				"number": feat[i].stationboard.number
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
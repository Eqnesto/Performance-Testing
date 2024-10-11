/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6345890410958904, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.825, 500, 1500, "DELETE User"], "isController": false}, {"data": [0.52, 500, 1500, "UPDATE Books"], "isController": false}, {"data": [0.76, 500, 1500, "POST Books"], "isController": false}, {"data": [0.55, 500, 1500, "POST Activities"], "isController": false}, {"data": [0.5, 500, 1500, "UPDATE Cover"], "isController": false}, {"data": [0.315, 500, 1500, "GET Users"], "isController": false}, {"data": [0.0, 500, 1500, "GET Books"], "isController": false}, {"data": [0.45, 500, 1500, "POST Cover"], "isController": false}, {"data": [0.87, 500, 1500, "UPDATE Author"], "isController": false}, {"data": [0.75, 500, 1500, "GET User by ID"], "isController": false}, {"data": [0.24, 500, 1500, "GET Books by ID"], "isController": false}, {"data": [0.0, 500, 1500, "GET Activities"], "isController": false}, {"data": [0.65, 500, 1500, "GET Activities by ID"], "isController": false}, {"data": [0.73, 500, 1500, "POST Authors"], "isController": false}, {"data": [0.0, 500, 1500, "GET Cover"], "isController": false}, {"data": [0.95, 500, 1500, "DELETE Author"], "isController": false}, {"data": [0.5, 500, 1500, "DELETE Activities"], "isController": false}, {"data": [0.62, 500, 1500, "DELETE Books"], "isController": false}, {"data": [0.55, 500, 1500, "DELETE Cover"], "isController": false}, {"data": [0.745, 500, 1500, "POST User"], "isController": false}, {"data": [0.775, 500, 1500, "GET Author by ID"], "isController": false}, {"data": [0.76, 500, 1500, "PUT User"], "isController": false}, {"data": [0.5, 500, 1500, "UPDATE Activities"], "isController": false}, {"data": [0.625, 500, 1500, "GET Cover by ID"], "isController": false}, {"data": [0.71, 500, 1500, "GET Author Books by ID"], "isController": false}, {"data": [0.27, 500, 1500, "GET Authors"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1460, 0, 0.0, 856.5671232876704, 160, 4274, 630.5, 1710.7000000000003, 2661.8, 3854.0, 128.18261633011414, 870.4582555970148, 28.14883532704126], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["DELETE User", 100, 0, 0.0, 429.30999999999995, 161, 986, 277.0, 841.9, 953.95, 985.98, 18.56665428889714, 2.1939112978091346, 3.626299665800223], "isController": false}, {"data": ["UPDATE Books", 50, 0, 0.0, 867.8199999999998, 413, 1481, 880.0, 1049.3999999999999, 1073.35, 1481.0, 17.17032967032967, 5.801693423763736, 6.422105726304945], "isController": false}, {"data": ["POST Books", 50, 0, 0.0, 772.8399999999998, 243, 1494, 415.5, 1438.7, 1452.25, 1494.0, 16.056518946692357, 4.970621587989724, 5.519428387925498], "isController": false}, {"data": ["POST Activities", 10, 0, 0.0, 911.3, 269, 1637, 806.0, 1621.4, 1637.0, 1637.0, 6.075334143377886, 1.625626518833536, 1.80361482381531], "isController": false}, {"data": ["UPDATE Cover", 10, 0, 0.0, 913.3, 775, 1151, 889.0, 1141.4, 1151.0, 1151.0, 5.892751915144372, 1.3178126841484974, 1.46743333824396], "isController": false}, {"data": ["GET Users", 100, 0, 0.0, 1345.06, 508, 3232, 1167.0, 2525.2000000000003, 2930.5999999999995, 3230.8399999999992, 9.676795045480937, 6.803996516353783, 1.663199148442036], "isController": false}, {"data": ["GET Books", 50, 0, 0.0, 3466.4600000000005, 2112, 4274, 3546.5, 4044.5, 4155.2, 4274.0, 11.25112511251125, 1046.0395160609812, 1.9337871287128714], "isController": false}, {"data": ["POST Cover", 10, 0, 0.0, 1026.5, 676, 1512, 921.0, 1507.8, 1512.0, 1512.0, 6.108735491753207, 1.3661136988393403, 1.5152527489309713], "isController": false}, {"data": ["UPDATE Author", 100, 0, 0.0, 364.06, 162, 985, 266.0, 709.6000000000004, 826.4499999999998, 984.1999999999996, 18.70207593042828, 4.638991490555451, 5.132112633252291], "isController": false}, {"data": ["GET User by ID", 100, 0, 0.0, 625.5599999999996, 166, 1695, 492.0, 1379.0, 1401.95, 1693.299999999999, 14.708045300779526, 3.5333780703044564, 2.556671937049566], "isController": false}, {"data": ["GET Books by ID", 50, 0, 0.0, 1423.1000000000001, 793, 2017, 1505.0, 1809.0, 1896.2499999999998, 2017.0, 14.810426540284361, 9.616074403880331, 2.5744686759478674], "isController": false}, {"data": ["GET Activities", 10, 0, 0.0, 2774.8, 1898, 3735, 2780.0, 3724.7, 3735.0, 3735.0, 2.6028110359187924, 7.729128709005726, 0.46006718505986466], "isController": false}, {"data": ["GET Activities by ID", 10, 0, 0.0, 831.6, 253, 1430, 806.5, 1429.4, 1430.0, 1430.0, 6.12369871402327, 1.7222902633190447, 1.094371938150643], "isController": false}, {"data": ["POST Authors", 100, 0, 0.0, 665.8599999999999, 163, 1712, 514.0, 1410.5, 1421.0, 1709.9799999999989, 12.445550715619166, 3.0992338207840695, 3.4152341319228374], "isController": false}, {"data": ["GET Cover", 10, 0, 0.0, 2614.9, 2118, 3292, 2450.5, 3290.3, 3292.0, 3292.0, 2.941176470588235, 59.468922334558826, 0.5227481617647058], "isController": false}, {"data": ["DELETE Author", 100, 0, 0.0, 292.1499999999999, 161, 648, 232.0, 535.4000000000003, 587.8499999999999, 647.6999999999998, 22.099447513812155, 2.611360497237569, 4.35946132596685], "isController": false}, {"data": ["DELETE Activities", 10, 0, 0.0, 890.1999999999999, 707, 1091, 898.0, 1080.5, 1091.0, 1091.0, 5.892751915144372, 0.6963115055981143, 1.1797013111373011], "isController": false}, {"data": ["DELETE Books", 50, 0, 0.0, 550.42, 306, 791, 585.5, 662.5, 710.4499999999997, 791.0, 22.123893805309734, 2.6142491703539825, 4.321073008849558], "isController": false}, {"data": ["DELETE Cover", 10, 0, 0.0, 590.1999999999999, 356, 775, 598.0, 759.7, 775.0, 775.0, 8.841732979664014, 1.0447750884173297, 1.7787080017683465], "isController": false}, {"data": ["POST User", 100, 0, 0.0, 565.9600000000002, 175, 1698, 494.5, 976.4000000000001, 1424.5999999999995, 1696.7799999999993, 12.394645513138325, 2.9292033341596433, 3.159182108329202], "isController": false}, {"data": ["GET Author by ID", 100, 0, 0.0, 550.5199999999996, 167, 1457, 372.5, 1048.2000000000003, 1261.95, 1456.83, 15.130882130428205, 3.930483053412014, 2.6597253744893328], "isController": false}, {"data": ["PUT User", 100, 0, 0.0, 575.3100000000001, 163, 1524, 401.0, 1136.4000000000003, 1434.0, 1524.0, 14.907573047107931, 3.5230787865235538, 3.8142423225998807], "isController": false}, {"data": ["UPDATE Activities", 10, 0, 0.0, 1127.5, 829, 1496, 1099.0, 1484.2, 1496.0, 1496.0, 4.3763676148796495, 1.1710202407002188, 1.303507932166302], "isController": false}, {"data": ["GET Cover by ID", 20, 0, 0.0, 963.55, 219, 1494, 1031.0, 1453.0, 1492.05, 1494.0, 7.936507936507936, 2.2708953373015874, 1.476469494047619], "isController": false}, {"data": ["GET Author Books by ID", 100, 0, 0.0, 628.5200000000003, 160, 1675, 586.5, 1212.8000000000006, 1453.0, 1673.5899999999992, 14.547570555717195, 5.94035268766366, 2.7560827029386092], "isController": false}, {"data": ["GET Authors", 100, 0, 0.0, 1562.5099999999998, 661, 3753, 1412.0, 2717.0, 3203.249999999998, 3751.499999999999, 9.520182787509519, 443.7176834420221, 1.6548755236100534], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1460, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});

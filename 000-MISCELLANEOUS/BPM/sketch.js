import { p5 } from "https://cdn.skypack.dev/p5js-wrapper";

new p5((p5) => {
  p5.setup = () => {
    const canvas = p5.createCanvas(1144, 1640);
    canvas.style("display", "block");
    canvas.style("outline", "1px solid #000");

    //p5.fill("#E5E4E2") // Platinum
    p5.fill("#71797E"); // Steel Gray
    p5.strokeWeight(0);
    p5.strokeJoin(p5.ROUND);
  };

  p5.draw = () => {
    p5.background(255);
    // Bottom
    p5.beginShape();
    p5.vertex(484.9118, 1492.6909);
    p5.bezierVertex(
      513.99472,
      1521.7738000000002,
      543.07761,
      1550.8567,
      572.16053,
      1579.9397000000001,
    );
    p5.bezierVertex(
      601.2434499999999,
      1550.8567,
      630.32635,
      1521.7738000000002,
      659.40927,
      1492.6909,
    );
    p5.bezierVertex(
      766.60785,
      1492.6909,
      873.80643,
      1492.6909,
      981.00501,
      1492.6909,
    );
    p5.bezierVertex(
      1028.777,
      1540.463,
      1076.549,
      1588.2350000000001,
      1124.3211,
      1636.007,
    );
    p5.bezierVertex(
      756.2133499999999,
      1636.007,
      388.10559999999987,
      1636.007,
      19.9978779999999,
      1636.007,
    );
    p5.bezierVertex(
      67.7698089999999,
      1588.2350000000001,
      115.5417399999999,
      1540.463,
      163.3136699999999,
      1492.6909,
    );
    p5.bezierVertex(
      270.5130499999999,
      1492.6909,
      377.7124199999999,
      1492.6909,
      484.9117999999999,
      1492.6909,
    );
    p5.endShape();
    // Bottom-right
    p5.beginShape();
    p5.vertex(1072.8213, 831.2326);
    p5.bezierVertex(
      1093.1196,
      835.94861,
      1147.1688000000001,
      856.9424,
      1139.913,
      839.18393,
    );
    p5.bezierVertex(
      1139.913,
      1099.5946,
      1139.913,
      1360.0052,
      1139.913,
      1620.4159,
    );
    p5.bezierVertex(
      1092.1409,
      1572.6439,
      1044.3689,
      1524.8718,
      996.59691,
      1477.0998,
    );
    p5.bezierVertex(
      996.59691,
      1287.2188999999998,
      996.59691,
      1097.3381,
      996.59691,
      907.4572,
    );
    p5.bezierVertex(
      1022.005,
      882.0489699999999,
      1047.4134999999999,
      856.64096,
      1072.8213,
      831.2325999999999,
    );
    p5.endShape();
    // Right-bottom
    p5.beginShape();
    p5.vertex(974.54971, 1470.6432);
    p5.bezierVertex(
      941.59594,
      1470.6432,
      908.64219,
      1470.6432,
      875.68841,
      1470.6432,
    );
    p5.bezierVertex(
      805.74864,
      1319.5599,
      735.8088399999999,
      1168.4767,
      665.86907,
      1017.3933999999999,
    );
    p5.bezierVertex(
      665.86907,
      982.90068,
      665.86907,
      948.4078999999999,
      665.86907,
      913.9151499999999,
    );
    p5.bezierVertex(
      698.8228399999999,
      913.9151499999999,
      731.7765899999999,
      913.9151499999999,
      764.73037,
      913.9151499999999,
    );
    p5.bezierVertex(
      834.67014,
      1064.9984,
      904.60994,
      1216.0817,
      974.54971,
      1367.1649,
    );
    p5.bezierVertex(
      974.54971,
      1401.6577,
      974.54971,
      1436.1504,
      974.54971,
      1470.6432,
    );
    p5.endShape();
    // Bottom-middle
    p5.beginShape();
    p5.vertex(572.1608, 1548.7588);
    p5.bezierVertex(
      549.28363,
      1523.1296,
      518.66718,
      1500.7062,
      500.5029,
      1473.125,
    );
    p5.bezierVertex(
      500.5029,
      1284.5693,
      500.5029,
      1096.0137,
      500.5029,
      907.458,
    );
    p5.bezierVertex(
      524.38888,
      883.57202,
      548.27482,
      859.68607,
      572.1608,
      835.8000999999999,
    );
    p5.bezierVertex(
      595.03805,
      861.4291499999999,
      625.6546,
      883.85245,
      643.81896,
      911.43365,
    );
    p5.bezierVertex(
      643.81896,
      1099.9893,
      643.81896,
      1288.545,
      643.81896,
      1477.1006,
    );
    p5.bezierVertex(
      619.93291,
      1500.9867,
      596.04685,
      1524.8727,
      572.1608,
      1548.7588,
    );
    p5.endShape();
    // Left-bottom
    p5.beginShape();
    p5.vertex(168.59925, 1470.6432);
    p5.bezierVertex(
      170.91774,
      1434.0172,
      164.00563000000002,
      1395.3482,
      171.95466000000002,
      1359.9684,
    );
    p5.bezierVertex(
      241.16226,
      1211.2845,
      310.36985000000004,
      1062.6006,
      379.57747,
      913.9167399999999,
    );
    p5.bezierVertex(
      412.5367,
      913.9167399999999,
      445.49595,
      913.9167399999999,
      478.45517,
      913.9167399999999,
    );
    p5.bezierVertex(
      476.13668,
      950.5427199999999,
      483.04879,
      989.2117599999999,
      475.09975000000003,
      1024.5915,
    );
    p5.bezierVertex(
      405.89208,
      1173.2754,
      336.68439,
      1321.9593,
      267.47669,
      1470.6432,
    );
    p5.bezierVertex(
      234.51754000000003,
      1470.6432,
      201.5584,
      1470.6432,
      168.59925,
      1470.6432,
    );
    p5.endShape();
    // Bottom-left
    p5.beginShape();
    p5.vertex(71.501405, 831.2326);
    p5.bezierVertex(
      96.90960700000001,
      856.6407200000001,
      122.31781000000001,
      882.0488200000001,
      147.72601,
      907.45694,
    );
    p5.bezierVertex(
      147.72601,
      1097.3378,
      147.72601,
      1287.2187,
      147.72601,
      1477.0996,
    );
    p5.bezierVertex(
      99.95399,
      1524.8716,
      52.181972,
      1572.6436,
      4.409951500000005,
      1620.4156,
    );
    p5.bezierVertex(
      4.409951500000005,
      1357.3545,
      4.409951500000005,
      1094.2934,
      4.409951500000005,
      831.23233,
    );
    p5.bezierVertex(
      26.773683000000005,
      831.23252,
      49.138113000000004,
      831.23233,
      71.501405,
      831.23233,
    );
    p5.endShape();
    // Right-middle
    p5.beginShape();
    p5.vertex(587.75269, 820.20741);
    p5.bezierVertex(
      613.38174,
      797.33024,
      635.8050800000001,
      766.71377,
      663.38625,
      748.5495099999999,
    );
    p5.bezierVertex(
      769.2596100000001,
      748.5495099999999,
      875.13297,
      748.5495099999999,
      981.00634,
      748.5495099999999,
    );
    p5.bezierVertex(
      1004.8924000000001,
      772.43549,
      1028.7784,
      796.3214399999999,
      1052.6645,
      820.20741,
    );
    p5.bezierVertex(
      1027.0354,
      843.08469,
      1004.6119000000001,
      873.70118,
      977.0306800000001,
      891.8655699999999,
    );
    p5.bezierVertex(
      871.15732,
      891.8655699999999,
      765.28395,
      891.8655699999999,
      659.4105900000001,
      891.8655699999999,
    );
    p5.bezierVertex(
      635.52462,
      867.97952,
      611.63867,
      844.0934599999999,
      587.75269,
      820.20741,
    );
    p5.endShape();
    // Left-middle
    p5.beginShape();
    p5.vertex(91.658686, 820.20741);
    p5.bezierVertex(
      117.28773000000001,
      797.33024,
      139.71105,
      766.71377,
      167.29225000000002,
      748.5495099999999,
    );
    p5.bezierVertex(
      273.16560000000004,
      748.5495099999999,
      379.03897000000006,
      748.5495099999999,
      484.91233,
      748.5495099999999,
    );
    p5.bezierVertex(
      508.79838,
      772.43549,
      532.68444,
      796.3214399999999,
      556.57049,
      820.20741,
    );
    p5.bezierVertex(
      530.9413599999999,
      843.08469,
      508.51791999999995,
      873.70118,
      480.93666999999994,
      891.8655699999999,
    );
    p5.bezierVertex(
      375.06330999999994,
      891.8655699999999,
      269.18994999999995,
      891.8655699999999,
      163.31657999999993,
      891.8655699999999,
    );
    p5.bezierVertex(
      139.43061999999992,
      867.97952,
      115.54464999999993,
      844.0934599999999,
      91.65868599999993,
      820.20741,
    );
    p5.endShape();
    // Right-top
    p5.beginShape();
    p5.vertex(1072.8213, 809.18487);
    p5.bezierVertex(
      1047.4131,
      783.7766700000001,
      1022.0050000000001,
      758.36846,
      996.5969100000001,
      732.9602600000001,
    );
    p5.bezierVertex(
      996.5969100000001,
      543.0793900000001,
      996.5969100000001,
      353.1985200000001,
      996.5969100000001,
      163.31765000000007,
    );
    p5.bezierVertex(
      1044.3689000000002,
      115.54571000000007,
      1092.1409,
      67.77378100000007,
      1139.913,
      20.001851000000073,
    );
    p5.bezierVertex(
      1139.913,
      283.0629500000001,
      1139.913,
      546.1240300000001,
      1139.913,
      809.1851300000001,
    );
    p5.bezierVertex(
      1117.5491,
      809.1849500000001,
      1095.1846,
      809.1851300000001,
      1072.8213,
      809.18487,
    );
    p5.endShape();
    // Top-right
    p5.beginShape();
    p5.vertex(665.86828, 726.50258);
    p5.bezierVertex(
      668.17568,
      689.8675499999999,
      661.2962200000001,
      651.20925,
      669.20856,
      615.8086099999999,
    );
    p5.bezierVertex(
      738.0349100000001,
      467.1305899999999,
      806.8612700000001,
      318.45255999999995,
      875.68762,
      169.77453999999994,
    );
    p5.bezierVertex(
      908.64139,
      169.77453999999994,
      941.59514,
      169.77453999999994,
      974.5489200000001,
      169.77453999999994,
    );
    p5.bezierVertex(
      972.2415100000001,
      206.40956999999995,
      979.12097,
      245.06786999999994,
      971.2086300000001,
      280.46849999999995,
    );
    p5.bezierVertex(
      902.38228,
      429.14653,
      833.5559300000001,
      577.8245499999999,
      764.7295700000001,
      726.50258,
    );
    p5.bezierVertex(
      731.7758000000001,
      726.50258,
      698.8220500000001,
      726.50258,
      665.8682800000001,
      726.50258,
    );
    p5.endShape();
    // Top-middle
    p5.beginShape();
    p5.vertex(572.1608, 804.61816);
    p5.bezierVertex(
      549.28363,
      778.98903,
      518.66718,
      756.5655899999999,
      500.5029,
      728.98434,
    );
    p5.bezierVertex(
      500.5029,
      540.42869,
      500.5029,
      351.87302999999997,
      500.5029,
      163.31737999999996,
    );
    p5.bezierVertex(
      524.38888,
      139.43140999999997,
      548.27482,
      115.54544999999996,
      572.1608,
      91.65948299999995,
    );
    p5.bezierVertex(
      595.03805,
      117.28852999999995,
      625.6546,
      139.71184999999994,
      643.81896,
      167.29303999999996,
    );
    p5.bezierVertex(
      643.81896,
      355.84869,
      643.81896,
      544.40434,
      643.81896,
      732.96,
    );
    p5.bezierVertex(
      619.93291,
      756.84605,
      596.04685,
      780.73211,
      572.1608,
      804.61816,
    );
    p5.endShape();
    // Left-Top
    p5.beginShape();
    p5.vertex(478.45597, 726.50258);
    p5.bezierVertex(
      445.50219,
      726.50258,
      412.54843999999997,
      726.50258,
      379.59466999999995,
      726.50258,
    );
    p5.bezierVertex(
      309.6549,
      575.41933,
      239.71511,
      424.33606,
      169.77533,
      273.25281,
    );
    p5.bezierVertex(
      169.77533,
      238.76005,
      169.77533,
      204.26729,
      169.77533,
      169.77454,
    );
    p5.bezierVertex(
      202.72908999999999,
      169.77454,
      235.68286,
      169.77454,
      268.63662,
      169.77454,
    );
    p5.bezierVertex(
      338.5764,
      320.85778,
      408.51619,
      471.94106,
      478.45597,
      623.0243,
    );
    p5.bezierVertex(
      478.45597,
      657.51705,
      478.45597,
      692.0098300000001,
      478.45597,
      726.5025800000001,
    );
    p5.endShape();
    // Top-left
    p5.beginShape();
    p5.vertex(71.501405, 809.18487);
    p5.bezierVertex(
      51.203207,
      804.4688,
      -2.8457706,
      783.47499,
      4.4099515,
      801.23353,
    );
    p5.bezierVertex(
      4.4099515,
      540.8228899999999,
      4.4099515,
      280.41223,
      4.4099515,
      20.001585999999975,
    );
    p5.bezierVertex(
      52.181972,
      67.773517,
      99.95399,
      115.54545,
      147.72601,
      163.31738,
    );
    p5.bezierVertex(
      147.72601,
      353.19825000000003,
      147.72601,
      543.0791300000001,
      147.72601,
      732.96,
    );
    p5.bezierVertex(
      122.31787,
      758.3683100000001,
      96.909234,
      783.77643,
      71.501405,
      809.18487,
    );
    p5.endShape();
    // Top
    p5.beginShape();
    p5.vertex(659.4098, 147.72575);
    p5.bezierVertex(
      630.3268800000001,
      118.64284,
      601.24398,
      89.559927,
      572.16106,
      60.47701500000001,
    );
    p5.bezierVertex(
      543.0781400000001,
      89.55992700000002,
      513.99525,
      118.64284,
      484.91233,
      147.72575,
    );
    p5.bezierVertex(
      377.71375,
      147.72575,
      270.51516000000004,
      147.72575,
      163.31658,
      147.72575,
    );
    p5.bezierVertex(
      115.54465,
      99.953729,
      67.772719,
      52.181711,
      20.000789,
      4.4096908,
    );
    p5.bezierVertex(
      388.10851,
      4.4096908,
      756.21626,
      4.4096908,
      1124.3239999999998,
      4.4096908,
    );
    p5.bezierVertex(
      1076.552,
      52.181711,
      1028.7799999999997,
      99.95372900000001,
      981.0079199999998,
      147.72575,
    );
    p5.bezierVertex(
      873.8085499999997,
      147.72575,
      766.6091699999997,
      147.72575,
      659.4097999999998,
      147.72575,
    );
    p5.endShape();
  };
});

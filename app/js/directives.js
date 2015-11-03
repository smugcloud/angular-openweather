'use strict';

/* Directives */

angular.module('openWeatherApp.directives', [])
var app = angular.module('openWeatherApp.directives', [])


  //
  // Simple directive just setting version as elements value (kept from angular-seed dist)
  //
  .directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])

  //
  // Create directive that handles formatting, resource fetching and
  // output of weather data for a specific date
  //
  .directive('weatherPanel',[function factory() {
    return {
      restrict: 'EA',

      scope: {
        useDayForecast: '=showEntry',
        forecast: '=weatherPanel'
      },

      templateUrl: 'partials/_weather-panel-light.html',

      link: function(scope, element, attrs) {
        // Get icon image url
        scope.getIconImageUrl = function(iconName) {
          return (iconName ? 'http://openweathermap.org/img/w/' + iconName + '.png' : '');
        };

        scope.parseDate = function (time) {
          return new Date(time * 1000);
        };
      }
    }
  }])

//
// "Wind" edition
//
.directive('weatherPanelWind',[function factory() {
  return {
    restrict: 'EA',

    scope: {
      useDayForecast: '=showEntry',
      forecast: '=weatherPanel'
    },

    templateUrl: 'partials/_weather-panel-wind.html',

    link: function(scope, element, attrs) {
      // Get icon image url
      scope.getIconImageUrl = function(iconName) {
        return (iconName ? 'http://openweathermap.org/img/w/' + iconName + '.png' : '');
      };

      scope.parseDate = function (time) {
        return new Date(time * 1000);
      };
    }
  }
}])
//D3 stuff
app.directive('ngSparkline', function() {
  var url = "http://api.openweathermap.org/data/2.5/forecast/daily?APPID=171929526229998c53414493da6d67a8&mode=json&units=imperial&cnt=14&callback=JSON_CALLBACK&q=";
  return {
    restrict: 'A',
    require: '^ngCity',
    transclude: true,
    scope: {
      ngCity: '@'
    },
    template: '<div class="sparkline"><div ng-transclude></div><div class="graph"></div></div>',
    controller: ['$scope', '$http', function($scope, $http) {
      $scope.getTemp = function(city) {
        $http({
          method: 'JSONP',
          url: url + city
        }).success(function(data) {
          var weather = [];
          angular.forEach(data.list, function(value){
            weather.push(value);
          });
          $scope.weather = weather;
        });
      }
    }],
    link: function(scope, iElement, iAttrs, ctrl) {
      scope.getTemp(iAttrs.ngCity);
      scope.$watch('weather', function(newVal) {
        // the `$watch` function will fire even if the
        // weather property is undefined, so we'll
        // check for it
        if (newVal) {
          var highs = [],
              w_date= [];

          angular.forEach(scope.weather, function(value){
            highs.push(value.temp.max);
            w_date.push(value.dt)
          });

          chartGraph(iElement, highs, iAttrs, w_date);
        }
      });
    }
  }
});

var chartGraph = function(element, data, opts, w_date) {
//Start of comments from old d3 code
 var width = 600, //opts.width || 200,
      height = 300, //opts.height || 80,
      padding = opts.padding || 30;
      //console.log(w_date.length);

  //convert the dates from epoch time to human readable
  var conv_date = [];
  for (var i = 0; i < w_date.length; i++) {


  conv_date[i] = new Date(w_date[i] * 1000);
  //console.log(conv_date[i])
  //parseDate(conv_date[i].Date);
  //console.log(conv_date[1]);
}

//w_date.forEach(function(d) { d.time = new Date(d.time * 1000); });


  // working chart
/*  var svg     = d3.select(element[0])
                  .append('svg:svg')
                  .attr('width', width)
                  .attr('height', height)
                  .attr('class', 'sparkline')
                  .append('g')
                    .attr('transform', 'translate('+padding+', '+padding+')');

  //svg.selectAll('*').remove();

  var maxY    = d3.max(data),

      x       = d3.scale.linear()
                  .domain([0, data.length])
                  .range([0, width]),
                  //.domain([new Date(w_date[0].dt)]),
      y       = d3.scale.linear()
                  .domain([0, maxY+10])
                  .range([height, 0]),
      yAxis = d3.svg.axis().scale(y)
                    .orient('left')
                    .ticks(5),
      xAxis = d3.svg.axis().scale(x)
                    .orient('bottom')
                    .ticks(5);
                    //.tickFormat(function(d) { return new Date(w_date* 1000); });

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
      innerwidth = width - margin.left - margin.right,
      innerheight = height - margin.top - margin.bottom,
      xlabel = "Days in the future",
      ylabel = "Y Axis Label" ;

   //console.log(innerwidth);

  svg.append('g')
      .attr('class', 'axis')
      .call(yAxis);

//x axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + innerheight + ")")
      .call(xAxis);

  svg.append("text")
      //.attr("dy", "-.71em")
      .attr("x", width / 2 )
      .attr("y",  height + margin.bottom)



  var line    = d3.svg.line()
                  .interpolate('linear')
                  .x(function(d,i){return x(i);})
                  .y(function(d,i){return y(d);}),
      path    = svg.append('svg:path')
                    .data([data])
                    .attr('d', line)
                    .attr('fill', 'none')
                    .attr('stroke-width', '1')
                    .attr('stroke','blue'); */
                    var timeFormat = d3.time.format("%x")
                    var svg     = d3.select(element[0])
                                      .append('svg:svg')
                                      .attr('width', width)
                                      .attr('height', height)
                                      .attr('class', 'sparkline')
                                      .append('g')
                                        .attr('transform', 'translate('+padding+', '+padding+')');

                      //svg.selectAll('*').remove();
                      //w_date.forEach(function (d) { d.w_date = new Date(d.w_date *1000);console.log(d.w_date);});
                      for(var i=0; i < w_date.length; i++) {
                        w_date[i] = new Date(w_date[i] * 1000);
                        console.log(w_date[i]);
                      }
                      // find data range
                      var xMin = d3.min(w_date);
                      var xMax = d3.max(w_date);
                      console.log("xMin is: " + xMin);
                      var maxY    = d3.max(data),

                          x       = d3.time.scale()
                                      .domain([xMin, xMax])
                                      .range([0, width]),
                          y       = d3.scale.linear()
                                      .domain([0, maxY+10])
                                      .range([height, 0]),
                          yAxis = d3.svg.axis().scale(y)
                                        .orient('left')
                                        .ticks(5),
                          xAxis = d3.svg.axis().scale(x)
                                        .orient('bottom')
                                        .ticks(5)
                                        .tickFormat(timeFormat);

                        var margin = {top: 20, right: 20, bottom: 30, left: 50},
                          innerwidth = width - margin.left - margin.right,
                          innerheight = height - margin.top - margin.bottom,
                          xlabel = "Days in the future",
                          ylabel = "Y Axis Label" ;

                      svg.append('g')
                          .attr('class', 'axis')
                          .call(yAxis);

                    //x axis
                      svg.append("g")
                          .attr("class", "x axis")
                          .attr("transform", "translate(0," + innerheight + ")")
                          .call(xAxis);

                      svg.append("text")
                          .attr("x", width / 2 )
                          .attr("y",  height + margin.bottom)



                      var line    = d3.svg.line()
                                      .interpolate('linear')
                                      //.x(function(d,i){return x(i);})
                                      .x(function(d,i) { return x(w_date[i]);} )
                                      .y(function(d,i){return y(d);}),
                          path    = svg.append('svg:path')
                                        .data([data])
                                        .attr('d', line)
                                        .attr('fill', 'none')
                                        .attr('stroke-width', '1')
                                        .attr('stroke','blue');
}


app.directive('ngCity', function() {
  return {
    controller: function($scope) {}
  }
});

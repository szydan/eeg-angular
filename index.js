(function () {

  "use strict";

  angular.module('eeg-angular', [])
  .directive('eeg', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        // two way bind 
        // we expect the graph to be contain
        // nodes: []
        // links: []
        // option: {}
        // nodes and links and option format same as in Eg
        graph: '='
      },
      template: '<div></div>',
      link: function ($scope, element, attrs) {
        var g = new Eeg(element, {} || $scope.graph.options);
        g.addNodes($scope.graph.nodes);
        g.addLinks($scope.graph.links);
      }
    };
  });  

})();
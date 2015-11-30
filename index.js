define(function (require) {

  var Eeg = require('eeg')

  angular.module('eeg-angular', [])
  .directive('eeg', function ($rootScope) {
    return {
      restrict: 'E',
      replace:true,
      scope: {
        eegId: '=',
        // we expect the graph to be contain
        // nodes: []
        // links: []
        // option: {}
        // nodes and links and option format same as in Eg
        graph: '='
      },
      template: '<div></div>',
      link: function ($scope, element, attrs) {
        $scope.$watch('graph', function (graph) {
          if (graph) {
            element.empty();
            var options = $scope.graph.options || {};
            $scope.g = new Eeg(element, options);

            $scope.g.addNodes($scope.graph.nodes);
            $scope.g.addLinks($scope.graph.links);
          }
        });

        var off = $rootScope.$on('egg:' + $scope.eegId + ':run', function (event, method) {
          if ($scope.g) {
            var args = Array.prototype.slice.call(arguments);
            args.shift();
            args.shift();
            $rootScope.$emit('egg:' + $scope.eegId + ':results', method, $scope.g[method](args));
          }
        });
        $scope.$on('$destroy', off);
      }
    };
  });

});

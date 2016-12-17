/**
 * Affichage du cout des charges d'une EURL à l'IS
 * Objet "charge" > objet "Resultat du calculator" > objet "ligne à afficher"
 */
angular.module('calculator').controller('chargesReportController', ['$scope', 'chargesCalculatorService', '$cookies','chargesConfig2016', function ($scope, chargesCalculatorService, $cookies, chargesConfig2016) {

  $scope.totalAProvisionner = 0;
  $scope.benefice = 0;
  $scope.form = {
    remuneration: 40000,
    chiffreAffaireHt: 90000,
    frais: 5000,
    cfe: 500
  };
  $scope.showDetails = 1;

  $scope.plafondMax = chargesConfig2016.plafondMax;

  // rafraichir les résultats
  $scope.refreshResults = () => {
    getResults();
  };

  getResults();

  function getResults() {

    calculator = chargesCalculatorService($scope.form);

    let charges = [];

    charges = charges
      .concat(calculator.getCotisationsSocialesArray())
      .concat(calculator.getImpotSurLesSocietes())
      .concat(calculator.getTva20())
      .concat(calculator.getCfe())
      .concat(calculator.getFrais());

    $scope.totalAProvisionner = calculator.getTotalAProvisionner();

    $scope.benefice = calculator.getBenefice();

    $scope.charges = charges;
  }

}]);




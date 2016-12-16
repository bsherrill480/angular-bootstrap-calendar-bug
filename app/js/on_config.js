require('bootstrap'); // requires bootstrap javascript file
// require('moment');

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
    'ngInject';
    const env = process.env.NODE_ENV;
    if (env === 'production' || env === 'staging') {
        $compileProvider.debugInfoEnabled(false);
    }

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $stateProvider
        .state('Home', {
            url: '/',
            template: '<home></home>',
            title: 'Home'
        });

    $urlRouterProvider.otherwise('/');

}

export default OnConfig;

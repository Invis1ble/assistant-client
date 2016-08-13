/**
 * System configuration for the Assistant application
 */
(function(global) {
    // map tells the System loader where to look for things
    var map = {
        '@angular':                   'node_modules/@angular',
        '@angular2-material':         'node_modules/@angular2-material',
        'moment':                     'node_modules/moment',
        'angular2-jwt':               'node_modules/angular2-jwt',
        'app':                        'app',
        'rxjs':                       'node_modules/rxjs'
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'angular2-jwt':               { main: 'angular2-jwt.js',  defaultExtension: 'js' },
        'app':                        { main: 'main.js',  defaultExtension: 'js' },
        'moment':                     { main: 'moment.js', defaultExtension: 'js' },
        'rxjs':                       { defaultExtension: 'js' }
    };
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade'
    ];
    var materialPackages = [
        'core',
        'button',
        'card',
        'toolbar',
        'icon',
        'input',
        'progress-circle',
        'menu'
    ];

    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);

    materialPackages.forEach(function (pkg) {
        packages['@angular2-material/' + pkg] = {
            main: pkg + '.js'
        };
    });

    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);

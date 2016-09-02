/**
 * System configuration for the Assistant Client application
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',

            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

            // angular testing umd bundles
            '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
            '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
            '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
            '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
            '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
            '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
            '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
            '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js',

            // angular2 material
            '@angular2-material/core': 'npm:@angular2-material/core',
            '@angular2-material/button': 'npm:@angular2-material/button',
            '@angular2-material/card': 'npm:@angular2-material/card',
            '@angular2-material/toolbar': 'npm:@angular2-material/toolbar',
            '@angular2-material/icon': 'npm:@angular2-material/icon',
            '@angular2-material/input': 'npm:@angular2-material/input',
            '@angular2-material/progress-circle': 'npm:@angular2-material/progress-circle',
            '@angular2-material/menu': 'npm:@angular2-material/menu',

            // other libraries
            'moment': 'npm:moment',
            'rxjs': 'npm:rxjs',
            'angular2-jwt': 'npm:angular2-jwt'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            moment: {
                main: 'moment.js',
                defaultExtension: 'js'
            },
            '@angular2-material/core': {
                main: 'core.js',
                defaultExtension: 'js'
            },
            '@angular2-material/button': {
                main: 'button.js',
                defaultExtension: 'js'
            },
            '@angular2-material/card': {
                main: 'card.js',
                defaultExtension: 'js'
            },
            '@angular2-material/toolbar': {
                main: 'toolbar.js',
                defaultExtension: 'js'
            },
            '@angular2-material/icon': {
                main: 'icon.js',
                defaultExtension: 'js'
            },
            '@angular2-material/input': {
                main: 'input.js',
                defaultExtension: 'js'
            },
            '@angular2-material/progress-circle': {
                main: 'progress-circle.js',
                defaultExtension: 'js'
            },
            '@angular2-material/menu': {
                main: 'menu.js',
                defaultExtension: 'js'
            },
            'angular2-jwt': {
                main: 'angular2-jwt.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);

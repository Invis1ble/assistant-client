const paths: any = {
    'npm:': 'node_modules/'
};

const map: any = {
    '@angular': `npm:@angular`,
    '@angular2-material': `npm:@angular2-material`,
    'rxjs': 'npm:rxjs',
    'angular2-jwt': 'npm:angular2-jwt',
    'moment': 'npm:moment',
    'app': 'app'
};

const angularBundles: string[] = [
    'core',
    'common',
    'compiler',
    'platform-browser',
    'platform-browser-dynamic',
    'http',
    'router',
    'forms'
];

const materialComponents: string[] = [
    'core',
    'button',
    'card',
    'toolbar',
    'icon',
    'input',
    'progress-circle',
    'menu',
    'sidenav',
    'list'
];

const packages: any = {
    'rxjs': {
        defaultExtension: 'js'
    },
    'angular2-jwt': {
        main: 'angular2-jwt.js'
    },
    'moment': {
        main: 'moment.js'
    },
    'app': {
        main: './main.js'
    }
};

angularBundles.forEach((name) => {
    packages[`@angular/${name}`] = {
        main: `bundles/${name}.umd.js`
    };
});

materialComponents.forEach((name) => {
    packages[`@angular2-material/${name}`] = {
        main: `${name}.umd.js`
    };
});

declare var System: any;

System.config({ paths, map, packages });

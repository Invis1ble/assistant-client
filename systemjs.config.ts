const paths: any = {
    'npm:': 'node_modules/'
};

const map: any = {
    '@angular': `npm:@angular`,
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

packages['@angular/material'] = {
    main: 'material.umd.js'
};

declare var System: any;

System.config({ paths, map, packages });

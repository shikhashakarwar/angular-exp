declare var require: any;
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from "@angular/core";
import * as express from "express";
// import  * as process from "process";
import { join } from "path-browserify";

import { ngExpressEngine } from "@nguniversal/express-engine";
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader";
enableProdMode();

const app = express();

const port = process.env.PORT || 4000;

const distFolder = join(process.cwd(), 'dist');

const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
}));

app.set('view engine', 'html');
app.set('views', join(distFolder, 'browser'));

// serve for all api calls
app.get('/api/*', (req, res) => {
    res.status(404).send('data requests are not supported');
});

// serve for static files
app.get('*.*', express.static(join(distFolder, 'browser')));


// all app wide route
app.get('*', (req, res) => {
    res.render('index', {req});
});


app.listen(port, () => {
    console.log(`Node is listening for your routes on http://localhost:${port}`);  
})
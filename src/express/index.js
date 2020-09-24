'use strict';

const express = require(`express`);
const path = require(`path`);

const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;
const DEFAULT_PORT = 8080;
const app = express();

const mainRoutes = require(`./routes/main-routes`);
const offersRoutes = require(`./routes/offers-routes`);
const myRoutes = require(`./routes/my-routes`);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.use(`/`, mainRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/my`, myRoutes);

app.listen(DEFAULT_PORT);

"use strict";
import Model from "./js/model.js";
import View from "./js/view.js";

const model = new Model();
const view = new View();

function run() {
  model.setView(view);
  view.setModel(model);
  view.render();
}

document.addEventListener("DOMContentLoaded", run);

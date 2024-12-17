


import { navbar } from "./navbar.js";
import { timer } from "./timer.js";

let cont = document.getElementById("cont");
cont.innerHTML = navbar;

let timerDiv = document.getElementById("timer");

timerDiv.append(timer())
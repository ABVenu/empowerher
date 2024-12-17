import { sub } from "./01exportconst.js";
import sum from "./02exportdeafult.js";
import { divide, multiply } from "./03namedExport.js";
/////////////////////
import { navbar } from "./navbar.js";
import { timer } from "./timer.js";

sub(); /// export using export const
sum(); // exported using export default

multiply(); // exported using named export
divide(); /// exported using named export

//////////////////////////
let cont = document.getElementById("cont");

cont.innerHTML = navbar;

let timerDiv = document.getElementById("timer");

timerDiv.append(timer());

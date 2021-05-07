const kociemba = require('kociemba')
let cubeStr="DDFUUUDBU"    //U
cubeStr += "BRURRRRLR"     //R
cubeStr += "BURBFFBFF"     //F
cubeStr += "UDDDDUFBD"     //D
cubeStr += "LFLLLLRLl"     //L
cubeStr += "LRFBBFBDU"     //B
const reskociemba = kociemba.solve(cubeStr.toUpperCase()) //'DDBUU FBDDL RUBRD UBRLF FBFDU FBFLL FDLRR FRLDU LRUUL RLBRB BDUF'
console.log('kociemba', cubeStr, reskociemba)

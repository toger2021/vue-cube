const Mock = require('mockjs')
const kociemba = require('kociemba')
module.exports = [
  {
    url: '/kociemba/post/json/solve',
    type: 'post',
    response: config => {
      console.log("config",config.query, config.body)
      const { cubeStr } = config.body
      // const mockreqsolve = Mock.mock('@word(54)')
      const reskociemba = kociemba.solve(cubeStr) //'DDBUU FBDDL RUBRD UBRLF FBFDU FBFLL FDLRR FRLDU LRUUL RLBRB BDUF'
      console.log('kociemba', cubeStr, reskociemba)

      return {
        code: 20000,
        data:  reskociemba
      }
    }
  }
]


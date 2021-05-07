const kociemba = require('kociemba')
describe('cube:solve', () => {
  it('kociemba.solve', () => {
    let reqsolve = 'LRDLULDRRFDFBRDFDRFFUDFUBBURRLFDFDBDBURLLBLUULUURBFBLB'
    // reqsolve = mockreqsolve
    console.log('reqsolve', reqsolve)

    expect(kociemba.solve(reqsolve)).toBe("U' B L U' R D2 B D F2 D' F' U L2 U R2 U D2 R2 F2 D2 ")
    // expect(kociemba.solve("error")).toThrow(/errno/)
  })
})

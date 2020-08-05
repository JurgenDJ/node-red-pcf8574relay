var should = require("should");
var helper = require("node-red-node-test-helper");
var i2cRelay = require("../i2c_relays/i2c_relays.js");

helper.init(require.resolve('node-red'));

describe('i2c relay node', function () {

  afterEach(function () {
    helper.unload();
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "i2c relay", name: "i2c relay" }];
    helper.load(i2cRelay, flow, function () {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'lower-case');
      done();
    });
  });

});
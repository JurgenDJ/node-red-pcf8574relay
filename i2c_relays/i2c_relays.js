module.exports = function(RED) {
    "use strict";
    var I2C = require("i2c-bus");
    
    function i2cRelaySwitch(n){
        RED.nodes.createNode(this, n);
        var node = this;
        var globalContext = this.context().global;
        const i2c_relay_addresses = "i2c_relay_addresses";
        
        node.address = parseInt(n.address)||32;
        node.switchIndex = parseInt(n.switchIndex);
        
        node.addresses = globalContext.get(i2c_relay_addresses);
        if(!node.addresses){
            node.addresses = [];
            globalContext.set(i2c_relay_addresses, node.addresses);
        }
        
        node.byte = node.addresses.find(function(a){
            return a && (a.address == node.address);
        });
        if(!node.byte){
            node.byte = {address:node.address, val:0}
            node.addresses.push(node.byte);
            globalContext.set(i2c_relay_addresses, node.addresses);
        }
        
        node.port = I2C.openSync(1);
        
        node.on("input",function(msg){
            var newVal = !(parseInt(msg.payload)==0);
            var bit = Math.pow(2,node.switchIndex);
            node.byte.val = newVal?(node.byte.val | bit):(node.byte.val & ~bit);
            
            //debug info:
            //msg.payload= "sending to i2c: value "+node.byte.val.toString(2)+" on address "+node.address+" bit was "+bit.toString(2);
            
            var bufferVal = new Buffer([~node.byte.val]);
            node.port.writeI2cBlock(node.address, 255, 1, bufferVal, function(err) {
                if (err) { 
                    node.error(err);
                    return null;
                } else {
                    node.send(msg);
                };
            });

        });
        node.on("close",function(done){
            node.port.closeSync();
            done();
        });
    }
    RED.nodes.registerType("i2c relay", i2cRelaySwitch);	

    function pulse(n){
        RED.nodes.createNode(this, n);
        var node = this;

        node.delay = parseInt(n.delay)||250;
        node.pulseOn = n.pulseOn;
        node.pulseOff = n.pulseOff;
        node.name = n.name;

        node.on("input",function(msg){
            msg.payload = node.pulseOn;
            node.send(msg);
            msg.payload = node.pulseOff;
            setTimeout(function(){node.send(msg);}, node.delay);
        });
    }
    RED.nodes.registerType("pulse", pulse);
}
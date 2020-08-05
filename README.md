# node-red-pcf8574relay
This is a node-red node that communicates with the Raspberry Pi I2C driver and uses the i2c-bus package.

This node operates on the /dev/i2c-1 (Raspberry pi 2 or up.)

It was started as a clone of the node-red-contrib-i2c library written by Niels v.d. Spek: [nielsnl68/node-red-contrib-i2c](https://github.com/nielsnl68/node-red-contrib-i2c.git)

Its purpose is to drive relays with a pcf8574 I/O expander

todo: add documentation on the hardware setup

#### Configuration
The first step is to configure the pcf8574 by setting its hardware address, the the switch index you want the node to operate on.

The default address for pcf8574 is &h20, which is an integer value of 32. using the three address pins, 8 possible addresses can be selected.

the switch index is a value between 0 and 7, indicating which of the 8 relays you want to control.

Development
-----------

Since the node has to run on a raspberry pi, while the development will probably happen on a windows / Mac PC, the easiest setup for testing the node is to have it copied/synchronised to a directory on the raspberry pi. 

loading the node in node-red is done following the Node Red Documentation:

1. in the directory containing the node’s package.json file, (eg. `/app/node-red-contrib-i2c_relays`) run:
```
sudo npm link
```
2. in your node-red user directory (eg. `/mnt/dietpi_userdata/node-red`), run:

``` 
npm link node-red-contrib-i2c_relays
```

#### Important Note
I would like to repeat that this package was initially started as a clone of the node-red-contrib-i2c library written by Niels v.d. Spek: [nielsnl68/node-red-contrib-i2c](https://github.com/nielsnl68/node-red-contrib-i2c.git), and as such I'm also repeating his acknowledgements to other packages/developers:

this package is  using the I2C-bus package from fivdi. It looks more robust and better for asyncrone processes like node-red. I would like the maker as much thanks for his work as Kelly in the past version. You can vind his work on github: https://github.com/fivdi/i2c-bus
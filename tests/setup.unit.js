const chai = require('chai');
const spies = require('chai-spies');
const dirtyChai = require('dirty-chai');
const chaiChange = require('chai-change');

chai.use(spies);
chai.use(dirtyChai);
chai.use(chaiChange);

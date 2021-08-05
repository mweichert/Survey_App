const {generate: uuid}    = require('short-uuid')
const {utils}             = require('web3')

let make = (name, attrs={}) => ({
    ...attrs,
    name,
    id: utils.fromAscii(uuid())
})

module.exports = {make}
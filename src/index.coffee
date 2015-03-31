numeral = require 'numeral'
React = require 'react'

App = require './components/app'

el = document.getElementById 'trig'
app = React.createElement App
React.render app, el

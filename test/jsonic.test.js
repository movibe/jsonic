/* Copyright (c) 2013 Richard Rodger, MIT License */
"use strict";

// mocha jsonic.test.js to test


var jsonic = require('..')

var assert = require('assert')
var _ = require('underscore')



describe('happy', function(){

  it('works', function(){
    var out = jsonic("foo:1, bar:zed")
    //console.dir(out)
    assert.equal( '{"foo":1,"bar":"zed"}', JSON.stringify(out) )
  })


  it('types', function(){
    var out = jsonic("int:100,dec:9.9,t:true,f:false,qs:\"a\\\"a'a\",as:'a\"a\\'a'")

    //console.log(JSON.stringify(out))

    assert.ok( _.isNumber(out.int) )
    assert.equal( 100, out.int )

    assert.ok( _.isNumber(out.dec) )
    assert.equal( 9.9, out.dec )

    assert.ok( _.isBoolean(out.t) )
    assert.equal( true, out.t )

    assert.ok( _.isBoolean(out.f) )
    assert.equal( false, out.f )

    assert.ok( _.isString(out.qs) )
    assert.equal( "a\"a'a", out.qs )

    assert.ok( _.isString(out.as) )
    assert.equal( "a\"a'a", out.as )
  })


  it('subobj', function(){
    var out = jsonic("a:{b:1},c:2")
    assert.equal('{"a":{"b":1},"c":2}',JSON.stringify(out))

    var out = jsonic("a:{b:1}")
    assert.equal('{"a":{"b":1}}',JSON.stringify(out))

    var out = jsonic("a:{b:{c:1}}")
    assert.equal('{"a":{"b":{"c":1}}}',JSON.stringify(out))
  })


  it('trailing-comma', function(){
    var out = jsonic("a:1, b:2, ")
    assert.equal( '{"a":1,"b":2}', JSON.stringify(out) )

    var out = jsonic("a:1,")
    assert.equal( '{"a":1}', JSON.stringify(out) )
  })


  it('empty', function(){
    var out = jsonic("")
    assert.equal( '{}', JSON.stringify(out) )
  })


  it('strings', function(){
    var out = jsonic("a:''")
    assert.equal( '{"a":""}', JSON.stringify(out) )

    out = jsonic("a:x y")
    assert.equal( '{"a":"x y"}', JSON.stringify(out) )

    out = jsonic("a:x, b:y z")
    assert.equal( '{"a":"x","b":"y z"}', JSON.stringify(out) )
  })

})



'use strict';

var assert = require('assert');
var bestfit = require('./_growth');
var conf = require('./conf');
var Growth = require('./growth');
var sinon = require('sinon');
var oms_model = require('./oms_model');

var options = {
  mongo: conf.mongo
};

var growth = new Growth(options);

describe('Growth Module', function () {
  it('Growth should be a function', function () {
    assert.equal(typeof Growth, 'function');
  });

  it('growth should be an instance of Growth', function () {
    assert(growth instanceof Growth);
  });

  it('growth should be called with options', function () {
    assert.equal(typeof growth.mongo, 'object');
    assert.equal(growth.mongo.db, options.mongo.db);
    assert.equal(growth.mongo.host, options.mongo.host);
    assert.equal(growth.mongo.user, options.mongo.user);
    assert.equal(growth.mongo.pass, options.mongo.pass);
    assert(growth.mongo.model);
  });

  it('should have this public functions', function () {
    assert.equal(typeof Growth.prototype.getBestFit, 'function');
  });

  it('should create this private functions', function () {
    assert.equal(typeof Growth.prototype._yyyymmdd, 'function');
  });
});

describe('Growth Model Schema', function () {
  before(function () {
    this.properties = 5;
    this.schema = growth.model.schema.paths;
  });

  it('should have only properties that will be tested', function () {
    assert.equal(Object.keys(this.schema).length, this.properties + 2);
  });

	it('should have property `key` correctly', function () {
	  assert(this.schema.key);
	  assert.equal(this.schema.key.options.type, String);
	  assert.equal(this.schema.key.options.required, true);
		assert(this.schema.key.options.index);
    assert.equal(this.schema.key.options.index.unique, true);
	});

	it('should have property `data.used` correctly', function () {
	  assert(this.schema['data.used']);
	  assert.equal(this.schema['data.used'].options.type, Object);
	});

	it('should have property `data.date_upgraded` correctly', function () {
	  assert(this.schema['data.date_upgraded']);
	  assert.equal(this.schema['data.date_upgraded'].options.type, Date);
		assert.equal(this.schema['data.date_upgraded'].options.default, Date.now);
	});

	it('should have property `fit.used` correctly', function () {
	  assert(this.schema['fit.used']);
	  assert.equal(this.schema['fit.used'].options.type, Object);
	});

	it('should have property `fit.date_upgraded` correctly', function () {
	  assert(this.schema['fit.date_upgraded']);
	  assert.equal(this.schema['fit.date_upgraded'].options.type, Date);
		assert.equal(this.schema['fit.date_upgraded'].options.default, Date.now);
	});
});

describe('growth', function () {
  beforeEach(function () {
    this.spy = sinon.spy();
    this.data = {
      key:  '55df942c909a60f84b407811',
      vs : 'wfa',
            sex : 'boy',
            data     : [[0,5]],
            upgrade  : true,
            ofX      : [23],
            ofY      : [15]

    };
    this.options = {
      smoothing: true,
      noiseeliminate: true,
      smoothingmethod: 'exponential',
      alpha: 0.8,
      fits_name: ['sqrt'],
      model :growth.model,
            data_ref : {},
            min_data : 10
    };
    oms_model.find({vs : this.data.vs, sex : this.data.sex}).select('data').exec(function (error,data) {
    if(error){console.log('error=',error);}
      var data_ref = {};
      data.forEach(function(item) {
        data_ref[item.data.time] = item.data.measure;
        this.options.data_ref = data_ref;
    });
    console.log('this.options.data_ref=',this.options.data_ref);

  });
  });

  it('should be return the best fit', function () {
    bestfit(this.data, this.options,this.spy);
    console.log('gasfsdafsadf=',this.spy.args );
    assert(this.spy.args[0] instanceof Object);
  });

  it('should be save on database', function () {
		growth.model.findOne({
			key: this.data.key
		}, function (err, doc) {
			if (err) { assert(false); }
			assert(doc);
		});
  });
});

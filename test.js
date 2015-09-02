'use strict';

var assert = require('assert');
var bestfit = require('nsolvejs').fit.best;
var conf = require('./conf');
var Growth = require('./growth');
var sinon = require('sinon');

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
      key: 'baby-55df94',
      data: [[3,5]],
      ofX: [23],
      ofY: [15]
    };
    this.options = {
      smoothing: true,
      noiseeliminate: true,
      smoothingmethod: 'exponential',
      alpha: 0.8,
      fits_name: ['sqrt']
    };
  });

  it('should be return the best fit', function () {
    growth.getBestFit(this.data, this.options, this.spy);
    var fit = bestfit(this.data.data, this.data.ofX, this.data.ofY, this.options);
    assert(this.spy.calledWith(Object));
  });

  it('should be save on database', function (done) {
		growth.model.findOne({
			key: this.data.key
		}, function (err, doc) {
			if (err) { return done(err); }
			assert(doc);
			done();
		});
  });
});

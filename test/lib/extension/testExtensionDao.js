var GeoPackageConnection = require('../../../lib/db/geoPackageConnection')
  , GeoPackage = require('../../../lib/geoPackage')
  , Verification = require('../../fixtures/verification')
  , testSetup = require('../../fixtures/testSetup')
  , should = require('chai').should()
  , path = require('path')
  , async = require('async');

describe('GeoPackage Extension Dao tests', function() {
  var testGeoPackage = path.join(__dirname, '..', 'tmp', 'test.gpkg');
  var tableName = 'test_features.test';
  var geopackage;

  beforeEach(function(done) {
    testSetup.deleteGeoPackage(testGeoPackage, function() {
      testSetup.createGeoPackage(testGeoPackage, function(err, gp) {
        geopackage = gp;
        done();
      });
    });
  });

  afterEach(function(done) {
    geopackage.close();
    testSetup.deleteGeoPackage(testGeoPackage, done);
  });

  it('should create an extensions table', function(done) {
    var extensionDao = geopackage.getExtensionDao();
    extensionDao.createTable(function(err, table) {
      Verification.verifyExtensions(geopackage, done);
    });
  });

});

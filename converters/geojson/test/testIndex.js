var GeoJSONToGeoPackage = require('../index.js');

var path = require('path')
  , fs = require('fs')
  , should = require('chai').should();

describe('GeoJSON to GeoPackage tests', function() {

  it.only('should convert the natural earth 110m file', function(done) {
    try {
      fs.unlinkSync(path.join(__dirname, 'fixtures', 'tmp', 'ne_110m_land.gpkg'));
    } catch (e) {}

    GeoJSONToGeoPackage.convert({geojson:path.join(__dirname, 'fixtures', 'ne_110m_land.geojson'), geopackage:path.join(__dirname, 'fixtures', 'tmp', 'ne_110m_land.gpkg')}, function(status, callback) {
      callback();
    }, function(err, geopackage) {
      should.not.exist(err);
      should.exist(geopackage);
      geopackage.getFeatureTables(function(err, tables) {
        tables.length.should.be.equal(1);
        tables[0].should.be.equal('ne_110m_land');
        geopackage.getFeatureDaoWithTableName('ne_110m_land', function(err, featureDao) {
          featureDao.getCount(function(err, count) {
            count.should.be.equal(127);
            done();
          });
        });
      });
    });
  });

  it('should convert the a geojson object with an id property', function(done) {
    try {
      fs.unlinkSync(path.join(__dirname, 'fixtures', 'tmp', 'id.gpkg'));
    } catch (e) {}

    GeoJSONToGeoPackage.convert({geojson: path.join(__dirname, 'fixtures', 'id.geojson'), geopackage: path.join(__dirname, 'fixtures', 'tmp', 'id.gpkg')}, function(status, callback) {
      callback();
    }, function(err, geopackage) {
      should.not.exist(err);
      should.exist(geopackage);
      geopackage.getFeatureTables(function(err, tables) {
        tables.length.should.be.equal(1);
        tables[0].should.be.equal('id');
        geopackage.getFeatureDaoWithTableName('id', function(err, featureDao) {
          featureDao.getCount(function(err, count) {
            count.should.be.equal(1);
            done();
          });
        });
      });
    });
  });

  it('should convert the natural earth 10m file', function(done) {
    this.timeout(10000);
    try {
      fs.unlinkSync(path.join(__dirname, 'fixtures', 'tmp', 'ne_10m_land.gpkg'));
    } catch (e) {}

    GeoJSONToGeoPackage.convert({geojson: path.join(__dirname, 'fixtures', 'ne_10m_land.geojson'), geopackage:path.join(__dirname, 'fixtures', 'tmp', 'ne_10m_land.gpkg')}, function(status, callback) {
      callback();
    }, function(err, geopackage) {
      should.not.exist(err);
      should.exist(geopackage);
      geopackage.getFeatureTables(function(err, tables) {
        tables.length.should.be.equal(1);
        tables[0].should.be.equal('ne_10m_land');
        geopackage.getFeatureDaoWithTableName('ne_10m_land', function(err, featureDao) {
          featureDao.getCount(function(err, count) {
            count.should.be.equal(4063);
            done();
          });
        });
      });
    });
  });

  it('should convert the geojson', function(done) {
    fs.readFile(path.join(__dirname, 'fixtures', 'ne_110m_land.geojson'), 'utf8', function(err, data) {
      var geoJson = JSON.parse(data);
      GeoJSONToGeoPackage.convert({geojson:geoJson}, function(err, geopackage) {
        geopackage.getFeatureTables(function(err, tables) {
          tables.length.should.be.equal(1);
          tables[0].should.be.equal('features');
          geopackage.getFeatureDaoWithTableName('features', function(err, featureDao) {
            featureDao.getCount(function(err, count) {
              count.should.be.equal(127);
              done();
            });
          });
        });
      })
    });
  });

  it('should convert the natural earth 110m file and add the layer twice', function(done) {
    fs.unlinkSync(path.join(__dirname, 'fixtures', 'tmp', 'ne_110m_land.gpkg'));
    GeoJSONToGeoPackage.convert({geojson:path.join(__dirname, 'fixtures', 'ne_110m_land.geojson'), geopackage:path.join(__dirname, 'fixtures', 'tmp', 'ne_110m_land.gpkg')}, function(status, callback) {
      callback();
    }, function(err, geopackage) {
      should.not.exist(err);
      should.exist(geopackage);
      geopackage.getFeatureTables(function(err, tables) {
        tables.length.should.be.equal(1);
        tables[0].should.be.equal('ne_110m_land');
        geopackage.getFeatureDaoWithTableName('ne_110m_land', function(err, featureDao) {
          featureDao.getCount(function(err, count) {
            count.should.be.equal(127);
            GeoJSONToGeoPackage.addLayer({geojson:path.join(__dirname, 'fixtures', 'ne_110m_land.geojson'), geopackage:path.join(__dirname, 'fixtures', 'tmp', 'ne_110m_land.gpkg')}, function(status, callback) {
              callback();
            }, function(err, geopackage) {
              should.not.exist(err);
              should.exist(geopackage);
              geopackage.getFeatureTables(function(err, tables) {
                tables.length.should.be.equal(2);
                tables[0].should.be.equal('ne_110m_land');
                tables[1].should.be.equal('ne_110m_land_1');
                geopackage.getFeatureDaoWithTableName('ne_110m_land_1', function(err, featureDao) {
                  featureDao.getCount(function(err, count) {
                    count.should.be.equal(127);
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  it('should convert the natural earth 110m file and add the layer twice using the geopackage object the second time', function(done) {
    fs.unlinkSync(path.join(__dirname, 'fixtures', 'tmp', 'ne_110m_land.gpkg'));
    GeoJSONToGeoPackage.convert({geojson:path.join(__dirname, 'fixtures', 'ne_110m_land.geojson'), geopackage:path.join(__dirname, 'fixtures', 'tmp', 'ne_110m_land.gpkg')}, function(status, callback) {
      callback();
    }, function(err, geopackage) {
      should.not.exist(err);
      should.exist(geopackage);
      geopackage.getFeatureTables(function(err, tables) {
        tables.length.should.be.equal(1);
        tables[0].should.be.equal('ne_110m_land');
        geopackage.getFeatureDaoWithTableName('ne_110m_land', function(err, featureDao) {
          featureDao.getCount(function(err, count) {
            count.should.be.equal(127);
            GeoJSONToGeoPackage.addLayer({geojson:path.join(__dirname, 'fixtures', 'ne_110m_land.geojson'), geopackage:geopackage}, function(status, callback) {
              callback();
            }, function(err, geopackage) {
              should.not.exist(err);
              should.exist(geopackage);
              geopackage.getFeatureTables(function(err, tables) {
                tables.length.should.be.equal(2);
                tables[0].should.be.equal('ne_110m_land');
                tables[1].should.be.equal('ne_110m_land_1');
                geopackage.getFeatureDaoWithTableName('ne_110m_land_1', function(err, featureDao) {
                  featureDao.getCount(function(err, count) {
                    count.should.be.equal(127);
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  it('should convert the natural earth 110m file and add read it out as geojson', function(done) {
    fs.unlinkSync(path.join(__dirname, 'fixtures', 'tmp', 'ne_110m_land.gpkg'));
    GeoJSONToGeoPackage.convert({geojson:path.join(__dirname, 'fixtures', 'ne_110m_land.geojson'), geopackage:path.join(__dirname, 'fixtures', 'tmp', 'ne_110m_land.gpkg')}, function(status, callback) {
      callback();
    }, function(err, geopackage) {
      should.not.exist(err);
      should.exist(geopackage);
      geopackage.getFeatureTables(function(err, tables) {
        tables.length.should.be.equal(1);
        tables[0].should.be.equal('ne_110m_land');
        geopackage.getFeatureDaoWithTableName('ne_110m_land', function(err, featureDao) {
          featureDao.getCount(function(err, count) {
            count.should.be.equal(127);

            GeoJSONToGeoPackage.extract(geopackage, 'ne_110m_land', function(err, geoJson) {
              geoJson.features.length.should.be.equal(127);
              done();
            });
          });
        });
      });
    });
  });
});

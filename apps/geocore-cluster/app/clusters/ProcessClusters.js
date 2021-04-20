const pg = require('pg');
const Supercluster = require('supercluster');
const MongoClient = require('mongodb').MongoClient;

const PG_CONN_STRING = "postgres://geocoreuser:mYge0cor3@geocore-pgdb:5432/geocoredb";
const MONGO_CONN_STRING = "mongodb://root:rootpassword@192.168.10.10:27017";

const PH_BBOX = [101.931152, 1.823423, 144.118652, 21.861499];
const CLUSTER_START_ZOOM = 5;
const CLUSTER_END_ZOOM = 10;


class ProcessClusters {

    constructor(params) {
        this.datasetQueueName = params.datasetQueueName;
        this.idColumn = params.idColumn;
        this.geomColumn = params.geomColumn;

        this.dbClient = new pg.Client(PG_CONN_STRING);
        this.dbClient.connect();
    }

    doCluster(points, resolve, reject) {

        this.clusterIndex = new Supercluster({
            radius: 40,
            maxZoom: 18
        });

        this.clusterIndex.load(points);

        const that = this;

        let zoom,
            expandedZoom,
            clusters,
            newClusters = [],
            newCluster,
            isCluster;

            Array(18).fill().map((_, i) => {
                zoom = i+1;

                clusters = this.clusterIndex.getClusters(PH_BBOX, zoom);

                newClusters = clusters.map((cluster) => {
                    isCluster = cluster.properties.hasOwnProperty('point_count');

                    newCluster = {
                        point: cluster.geometry,
                        zoom: zoom
                    };

                    if (isCluster) {
                        expandedZoom = this.clusterIndex.getClusterExpansionZoom(cluster.id);

                        newCluster.clusterId = cluster.id;
                        newCluster.expandedZoom = expandedZoom;
                        newCluster.count = cluster.properties.point_count;
                    } else {
                        newCluster.properties = cluster.properties;
                    }

                    return newCluster;
                });

                if (newClusters.length) {
                    that.mongoCollection.insertMany(newClusters)
                        .then((result) => {

                        }).catch(error => {
                            console.error(error);
                            reject(error);
                         });
                }
            });

        console.timeEnd('Clustering Ended');
            resolve(points);

    }

    getDataSourcePoints() {
        // get data geojson postgres table datasetQueueName
        let query = `SELECT array_to_json(array_agg(f)) AS features
             FROM (SELECT 'Feature' As type
                , ST_AsGeoJSON(ST_Transform(lg.${this.geomColumn}, 4326))::json As geometry
                , row_to_json((SELECT l FROM (SELECT ${this.idColumn}) As l
                  )) As properties
               FROM ${this.datasetQueueName} As lg) As f`;

        return this.dbClient.query(query);
    }

    start() {
        console.time('Clustering started');


        let that = this;

        // return `do cluster for ${this.datasetQueueName}`;
        return new Promise((resolve, reject) => {
            this.getDataSourcePoints.then((err, result) => {
                if (err) {
                    reject(err);
                    return;
                }

                let points = result.rows[0].features;

                MongoClient.connect(MONGO_CONN_STRING, {useUnifiedTopology: true})
                    .then(client => {
                        console.log('Connected to Database');

                        that.mongoDb = client.db('geocore');

                        that.mongoCollection = that.mongoDb.collection(this.datasetQueueName);

                        that.mongoCollection.drop();

                        resolve(points);

                        // that.doCluster(points, resolve, reject);

                        // that.mongoDb.createCollection('planet_osm_points', (err, res) => {
                        //     if (err) throw err;
                        //
                        //     that.mongoCollection = that.mongoDb.collection('planet_osm_points');
                        //
                        //     that.doCluster(points);
                        // });
                    });
            });
        });

    }
}

module.exports.ProcessClusters = ProcessClusters;

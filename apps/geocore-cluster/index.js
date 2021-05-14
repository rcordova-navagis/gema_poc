const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ProcessCluster = require('./app/clusters/ProcessClusters');

const config = {
    name: 'geocore-cluster-express-app',
    port: 8083,
    host: '0.0.0.0',
};

const index = express();
index.use(bodyParser.json());
index.use(cors());




index.get('/clusters/:datasetQueueName/process', function(req, res) {
    let params = {
        datasetQueueName: req.params.datasetQueueName,
        idColumn: req.query.idColumn,
        geomColumn: req.query.geomColumn,
    };

    new ProcessCluster.ProcessClusters(params)
        .start()
        .then(resp => {
            res.status(200).send(resp);
        }).catch(err => {
            res.status(400).json({status:false, msg:"error in promise"});
        });
});

index.get('/clusters/:datasetQueueName', function(req, res){
    res.status(200).send(`get cluster for ${req.params.datasetQueueName} z=${req.query.zoom}`);
});

index.listen(config.port, () => {
    console.log('Server running...');
});

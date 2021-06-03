import {MVTLayer} from '@deck.gl/geo-layers';
import {ContourLayer} from '@deck.gl/aggregation-layers';

const WORLD_SIZE = 512;


const CONTOURS = [
    {threshold: 1, color: [255, 0, 0, 255], strokeWidth: 1}, // => Isoline for threshold 1
    {threshold: 5, color: [0, 255, 0], strokeWidth: 2}, // => Isoline for threshold 5
    {threshold: [6, 10], color: [0, 0, 255, 128]} // => Isoband for threshold range [6, 10)
];


export default class MyMVTLayer extends MVTLayer {
    initializeState() {
        super.initializeState();
    }

    get isLoaded() {
        return super.isLoaded;
    }

    updateState({props, oldProps, context, changeFlags}) {
        super.updateState({props, oldProps, context, changeFlags});
    }

    async _updateTileData({props}) {
        super._updateTileData({props});
    //     const {onDataLoad} = this.props;
    //     let {data} = props;
    //     let tileJSON = null;
    //     let {minZoom, maxZoom} = props;
    //
    //     if (typeof data === 'string' && !isURLTemplate(data)) {
    //         this.setState({data: null, tileJSON: null});
    //         tileJSON = await fetchTileJSON(data);
    //
    //         if (onDataLoad) {
    //             onDataLoad(tileJSON);
    //         }
    //     } else if (data.tilejson) {
    //         tileJSON = data;
    //     }
    //
    //     if (tileJSON) {
    //         data = tileJSON.tiles;
    //
    //         if (Number.isFinite(tileJSON.minzoom) && tileJSON.minzoom > minZoom) {
    //             minZoom = tileJSON.minzoom;
    //         }
    //
    //         if (
    //             Number.isFinite(tileJSON.maxzoom) &&
    //             (!Number.isFinite(maxZoom) || tileJSON.maxzoom < maxZoom)
    //         ) {
    //             maxZoom = tileJSON.maxzoom;
    //         }
    //     }
    //
    //     this.setState({data, tileJSON, minZoom, maxZoom});
    }

    renderLayers() {
        return super.renderLayers();
    }

    getTileData(tile) {
        return super.getTileData(tile);
        // const url = getURLFromTemplate(this.state.data, tile);
        // if (!url) {
        //     return Promise.reject('Invalid URL');
        // }
        // let options = this.getLoadOptions();
        // options = {
        //     ...options,
        //     mvt: {
        //         ...(options && options.mvt),
        //         coordinates: this.context.viewport.resolution ? 'wgs84' : 'local',
        //         tileIndex: {x: tile.x, y: tile.y, z: tile.z}
        //         // Local worker debug
        //         // workerUrl: `modules/mvt/dist/mvt-loader.worker.js`
        //         // Set worker to null to skip web workers
        //         // workerUrl: null
        //     },
        //     gis: this.props.binary ? {format: 'binary'} : {}
        // };
        // return load(url, this.props.loaders[0], options);
    }

    renderSubLayers(props) {
        // const {tile} = props;
        // const worldScale = Math.pow(2, tile.z);
        //
        // const xScale = WORLD_SIZE / worldScale;
        // const yScale = -xScale;
        //
        // const xOffset = (WORLD_SIZE * tile.x) / worldScale;
        // const yOffset = WORLD_SIZE * (1 - tile.y / worldScale);
        //
        // const modelMatrix = new Matrix4().scale([xScale, yScale, 1]);
        //
        // props.autoHighlight = false;
        //
        // if (!this.context.viewport.resolution) {
        //     props.modelMatrix = modelMatrix;
        //     props.coordinateOrigin = [xOffset, yOffset, 0];
        //     props.coordinateSystem = COORDINATE_SYSTEM.CARTESIAN;
        //     props.extensions = [...(props.extensions || []), new ClipExtension()];
        // }

        return super.renderSubLayers(props);
    }

    onHover(info, pickingEvent) {
        // const {uniqueIdProperty, autoHighlight} = this.props;
        //
        // if (autoHighlight) {
        //     const {hoveredFeatureId} = this.state;
        //     const hoveredFeature = info.object;
        //     let newHoveredFeatureId;
        //
        //     if (hoveredFeature) {
        //         newHoveredFeatureId = getFeatureUniqueId(hoveredFeature, uniqueIdProperty);
        //     }
        //
        //     if (hoveredFeatureId !== newHoveredFeatureId && newHoveredFeatureId !== -1) {
        //         this.setState({hoveredFeatureId: newHoveredFeatureId});
        //     }
        // }

        return super.onHover(info, pickingEvent);
    }

    getPickingInfo(params) {
        const info = super.getPickingInfo(params);

        // const isWGS84 = this.context.viewport.resolution;
        //
        // if (info.object && !isWGS84) {
        //     info.object = transformTileCoordsToWGS84(info.object, info.tile.bbox, this.context.viewport);
        // } else if (this.props.binary && info.index !== -1) {
        //     // get the feature from the binary at the given index.
        //     const {data} = params.sourceLayer.props;
        //     info.object =
        //         _binaryToFeature(data.points, info.index) ||
        //         _binaryToFeature(data.lines, info.index) ||
        //         _binaryToFeature(data.polygons, info.index);
        // }

        return info;
    }

    getHighlightedObjectIndex(tile) {
        return super.getHighlightedObjectIndex(tile);
    }

    _pickObjects(maxObjects) {
        return super._pickObjects(maxObjects);
    }

    getRenderedFeatures(maxFeatures = null) {
        return super.getRenderedFeatures(maxFeatures);
    }

    _setWGS84PropertyForTiles() {
        super._setWGS84PropertyForTiles();
        // const propName = 'dataInWGS84';
        // const {tileset} = this.state;
        //
        // tileset.selectedTiles.forEach(tile => {
        //     if (!tile.hasOwnProperty(propName)) {
        //         // eslint-disable-next-line accessor-pairs
        //         Object.defineProperty(tile, propName, {
        //             get: () => {
        //                 // Still loading or encountered an error
        //                 if (!tile.content) {
        //                     return null;
        //                 }
        //
        //                 if (this.props.binary && Array.isArray(tile.content) && !tile.content.length) {
        //                     // TODO: @loaders.gl/mvt returns [] when no content. It should return a valid empty binary.
        //                     // https://github.com/visgl/loaders.gl/pull/1137
        //                     return [];
        //                 }
        //
        //                 if (tile._contentWGS84 === undefined) {
        //                     // Create a cache to transform only once
        //                     const content = this.props.binary ? binaryToGeoJson(tile.content) : tile.content;
        //                     tile._contentWGS84 = content.map(feature =>
        //                         transformTileCoordsToWGS84(feature, tile.bbox, this.context.viewport)
        //                     );
        //                 }
        //                 return tile._contentWGS84;
        //             }
        //         });
        //     }
        // });
    }
}

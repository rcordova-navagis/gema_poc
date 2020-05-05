import React, {useEffect, useState} from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import {
    UUT_FILE_DROPZONE_TEXT,
    UUT_ACCEPTED_FILETYPES,
} from './constants/UutForm';


export default function LayerFileUpload(props) {
  console.log('LayerFileUpload: ',props);

  return (
    <div className="uut-layer-file-upload">
        <section className="uut-layer-file-upload-content">
            <DropzoneArea
                // acceptedFiles={UUT_ACCEPTED_FILETYPES}
                // acceptedFiles={["*/*"]}
                filesLimit={1}
                dropzoneClass="geocore-file-dropzone"
                showFileNamesInPreview={true}
                useChipsForPreview={true}
                showPreviewsInDropzone={true}
                inputProps={{files: props.layerFiles}}
                dropzoneText={UUT_FILE_DROPZONE_TEXT}
                onChange={props.handleOnFileChange}
            />
        </section>
    </div>
  );
};


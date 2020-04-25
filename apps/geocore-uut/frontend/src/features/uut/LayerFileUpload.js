import React, {useState} from 'react';
import {DropzoneArea} from 'material-ui-dropzone';
import {
    UUT_FILE_DROPZONE_TEXT,
    UUT_ACCEPTED_FILETYPES,
} from './constants/UutForm';


export default function LayerFileUpload(props) {
  return (
    <div className="uut-layer-file-upload">
        <section className="uut-layer-file-upload-content">
            <DropzoneArea
                acceptedFiles={UUT_ACCEPTED_FILETYPES}
                dropzoneClass="geocore-file-dropzone"
                showFileNamesInPreview={true}
                showFileNames={true}
                dropzoneText={UUT_FILE_DROPZONE_TEXT}
                onChange={props.handleOnFileChange}
            />
        </section>
    </div>
  );
};


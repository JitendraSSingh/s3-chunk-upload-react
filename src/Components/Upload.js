import React from 'react'
import { getSignedUrl } from '../api/api'
import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'
import FineUploader from 'fine-uploader'

const uploader = new FineUploaderS3({
  options:{
    debug: true,
    chunking: {
      enabled: true,
      concurrent: {
        enabled: true
      },
      partSize: function(id){
        console.log(uploader.methods.getSize(id));
        return 5242880;
      }
    },
    deleteFile: {
      enabled: true,
      endpoint: 'https://fileupload.nanufeed.com/uploads'
    },
    request: {
      endpoint: "https://247stream.s3.fr-par.scw.cloud",
      accessKey: "SCW6WSFJBDYT5CQWFD9T"//this is public so don't worry
    },
    signature: {
      endpoint: "https://fileupload.nanufeed.com/sign-policy",
      version: 4
    },
    objectProperties: {
      region: 'fr-par',
      bucket: '247stream'
    },
    retry: {
      enableAuto: true
    }
  }
})

class Upload extends React.Component {
    render() {
        return (
         <Gallery uploader={uploader} />
        )
    }
}

export default Upload
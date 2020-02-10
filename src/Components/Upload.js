import React from 'react'
import { getSignedUrl } from '../api/api'
import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'

const uploader = new FineUploaderS3({
  options:{
    debug: true,
    chunking: {
      enabled: true
    },
    deleteFile: {
      enabled: true,
      endpoint: 'http://localhost:8080/uploads'
    },
    request: {
      endpoint: "https://247stream.s3.fr-par.scw.cloud",
      accessKey: "SCW6WSFJBDYT5CQWFD9T"//this is public so don't worry
    },
    signature: {
      endpoint: "http://localhost:8080/sign-policy",
      version: 4
    },
    objectProperties: {
      region: 'fr-par'
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
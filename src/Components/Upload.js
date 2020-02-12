import React from 'react'
import { getSignedUrl } from '../api/api'
import FineUploaderS3 from 'fine-uploader-wrappers/s3'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'
import FineUploader from 'fine-uploader'

function getMaxUploadChunkSize(fileSize) {
  const KB = 1024;
  const MB = KB * KB;
  const GB = MB * KB;

  let chunkSize = 5 * MB;
  switch(true){
    case (fileSize >= 5 * MB) && (fileSize <= 4 * GB) :
      chunkSize = chunkSize;
      break;
    case (fileSize > 4 * GB) && (fileSize <= 9 * GB) :
      chunkSize = 10 * MB;
      break;
    case (fileSize > 9 * GB) && (fileSize <= 14 * GB) :
      chunkSize = 15 * MB;
      break;
    case (fileSize > 14 * GB) && (fileSize <= 19 * GB) :
      chunkSize = 20 * MB;
      break;
    case (fileSize > 19 * GB) && (fileSize <= 24 * GB) :
      chunkSize = 25 * MB;
      break;
    case (fileSize > 24 * GB) && (fileSize <= 29 * GB) :
      chunkSize = 30 * MB;
      break;
    case (fileSize > 29 * GB) && (fileSize <= 34 * GB) :
      chunkSize = 40 * MB;
      break;
    case (fileSize > 34 * GB) && (fileSize <= 39 * GB) :
      chunkSize = 50 * MB;
      break;
    case (fileSize > 39 * GB) && (fileSize <= 44 * GB) :
      chunkSize = 60 * MB;
      break;
    case (fileSize > 44 * GB) && (fileSize <= 49 * GB) :
      chunkSize = 60 * MB;
      break;
    case (fileSize > 49 * GB) && (fileSize <= 54 * GB) :
      chunkSize = 60 * MB;
      break;
    case (fileSize > 54 * GB) && (fileSize <= 59 * GB) :
      chunkSize = 70 * MB;
      break;
    case (fileSize > 59 * GB) && (fileSize <= 64 * GB) :
      chunkSize = 70 * MB;
      break;
    case (fileSize > 64 * GB) && (fileSize <= 69 * GB) :
      chunkSize = 80 * MB;
      break;
    case (fileSize > 69 * GB) && (fileSize <= 74 * GB) :
      chunkSize = 80 * MB;
      break;
    case (fileSize > 74 * GB) && (fileSize <= 79 * GB) :
      chunkSize = 90 * MB;
      break;
    case (fileSize > 79 * GB) && (fileSize <= 84 * GB) :
      chunkSize = 90 * MB;
      break;
    case (fileSize > 84 * GB) && (fileSize <= 89 * GB) :
      chunkSize = 100 * MB;
      break;
    case (fileSize > 89 * GB) && (fileSize <= 94 * GB) :
      chunkSize = 100 * MB;
      break;
    case (fileSize > 94 * GB) && (fileSize <= 99 * GB) :
      chunkSize = 110 * MB;
      break;
    case (fileSize > 99 * GB) && (fileSize <= 100 * GB) :
      chunkSize = 110 * MB;
      break;
    default:
      chunkSize = chunkSize;
  }

  return chunkSize;
}


const uploader = new FineUploaderS3({
  options:{
    debug: true,
    chunking: {
      enabled: true,
      concurrent: {
        enabled: true
      },
      partSize: function(id){
        let uploadFileSize = uploader.methods.getSize(id)
        console.log('Upload File Size : ', uploadFileSize)
        let maxUploadChunkSize = getMaxUploadChunkSize(uploadFileSize)
        console.log('Max Upload Chunk Size : ', maxUploadChunkSize)
        console.log('Total Chunks : ', uploadFileSize / maxUploadChunkSize)
        return maxUploadChunkSize
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
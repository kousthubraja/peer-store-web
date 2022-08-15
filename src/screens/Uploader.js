import '../App.css';
import { makeStorageClient } from '../components/storage';
import React, { useRef, useState } from 'react'

function Uploader() {
  const fileInput = useRef();
  const [fileLink, setFileLink] = useState();
  const [uploadStatus, setUploadStatus] = useState();

  // function makeFileObjects() {
  //   const obj = { hello: 'world' }
  //   const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

  //   const files = [
  //     new File(['contents-of-file-1'], 'plain-utf8.txt'),
  //     new File([blob], 'hello.json')
  //   ]
  //   return files
  // }

  async function storeWithProgress (files) {
    // show the root cid as soon as it's ready
    const onRootCidReady = cid => {
      console.log('uploading files with cid:', cid)
    }
  
    // when each chunk is stored, update the percentage complete and display
    const totalSize = files[0].size;
    let uploaded = 0
  
    const onStoredChunk = size => {
      uploaded += size
      const pct = 100 * (uploaded / totalSize)
      console.log(`Uploading... ${pct.toFixed(2)}% complete`)
      setUploadStatus(`Uploading... ${pct.toFixed(2)}% complete`)
    }
  
    // makeStorageClient returns an authorized Web3.Storage client instance
    const client = makeStorageClient()
  
    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(files, { onRootCidReady, onStoredChunk })
  }  

  async function upload() {
    setUploadStatus('Uploading...')
    console.log(fileInput.current.files[0])
    const fileName = fileInput.current.files[0].name;
    const cid = await storeWithProgress(fileInput.current.files)
    // bafybeih5o5j3dbti5q5mbkiprkd2qvqtowazfhnv4cube6h4iqbd4szgyq.ipfs.dweb.link
    const url = `https://${cid}.ipfs.dweb.link/${fileName}`;
    setFileLink(url)
    setUploadStatus('Uploaded')
    navigator.share(url)
  }

  return (
    <div className="Uploader">
      <input type="file" ref={fileInput} />
      <button onClick={upload}>Upload</button>
      <a href={fileLink}>{fileLink}</a>
      {uploadStatus}
    </div>
  );
}

export default Uploader;

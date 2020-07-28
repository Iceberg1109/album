import React, { useRef, useState } from 'react'
import { Image, Modal, Button, Icon, Header, Select } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications'

import { uploadPhoto } from '../utils/api'

import DefaultPhoto from '../img/default.png'

export const PhotoModal = ({ onClose, imgSrc }) => {
  return (
    <Modal open={!!imgSrc} onClose={() => onClose('')} closeIcon>
      <Modal.Content>
        <Image src={imgSrc} fluid />
      </Modal.Content>
    </Modal>
  )
}

export const UploadModal = ({ open, onClose }) => {
  const albums = [
    { key: 'Travel', value: 'Travel', text: 'Travel' },
    { key: 'Personal', value: 'Personal', text: 'Personal' },
    { key: 'Food', value: 'Food', text: 'Food' },
    { key: 'Nature', value: 'Nature', text: 'Nature' },
    { key: 'Other', value: 'Other', text: 'Other' }
  ]

  const [imgSrc, setImgSrc] = useState(DefaultPhoto)
  const [files, setFiles] = useState(null)
  const [category, setAlbumCategory] = useState('')

  const inputFile = useRef(null)

  const changeFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImgSrc(URL.createObjectURL(event.target.files[0]))
      setFiles(event.target.files)
    }
  }
  const upload = () => {
    if (!files || files.length < 1) {
      NotificationManager.error('Please select the photoes.', 'Photo Not Selected')
      return
    }
    if (category === '') {
      NotificationManager.error('Please select the album.', 'Album Not Selected')
      return
    }
    uploadPhoto(category, files).then((data) => {
      if (data.length) {
        onClose(false)
        NotificationManager.success('The photo has been removed successfully', 'Photo Uploaded')
      } else {
        NotificationManager.error('Something went wrong. Please try again later.', 'Photo Not Uploaded')
      }
    })
  }

  return (
    <Modal open={open} size='small' closeIcon onClose={() => onClose(false)}>
      <input type='file' id='file' multiple ref={inputFile} style={{ display: 'none' }} accept='image/x-png,image/gif,image/jpeg,image/tif,image/svg+xml' onChange={changeFile} />
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Image wrapped bordered size='medium' src={imgSrc} onClick={() => inputFile.current.click()} />
        {files?.length > 0 &&
          <small>{files.length} photoes are selected.</small>
        }
        {(files === null || files.length === 0) &&
          <small>Please select the photoes.</small>
        }
        </div>
        <Modal.Description style={{marginLeft: 15}}>
          <Header style={{ marginTop: 20 }}>Select the album category</Header>
          <Select placeholder='Select the album country' options={albums} onChange={(e, selected) => setAlbumCategory(selected.value)} />
          <p style={{ marginTop: 20, maxWidth: 350 }}>
            Select your photo and click the upload button to upload it.
            Before uploading, please make sure you have selected the correct album category.
          </p>
          <Button color='green' fluid onClick={upload} style={{ marginTop: 30 }}>
            <Icon name='upload' /> Upload
          </Button>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

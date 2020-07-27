import React, { useRef, useState } from 'react'
import { Image, Modal, Button, Icon, Header, Select } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications'

import { uploadPhoto } from '../utils/api'

export const PhotoModal = ({ onClose, imgSrc }) => {
  return (
    <Modal open={!!imgSrc} onClose={() => onClose('')} closeIcon>
      <Modal.Content>
        <Image src={imgSrc} fluid />
      </Modal.Content>
    </Modal>
  )
}

export const UploadModal = ({ open, onClose, setTotalCnt }) => {
  const albums = [
    { key: 'Travel', value: 'Travel', text: 'Travel' },
    { key: 'Personal', value: 'Personal', text: 'Personal' },
    { key: 'Food', value: 'Food', text: 'Food' },
    { key: 'Nature', value: 'Nature', text: 'Nature' },
    { key: 'Other', value: 'Other', text: 'Other' }
  ]

  const [imgSrc, setImgSrc] = useState('https://react.semantic-ui.com/images/avatar/large/rachel.png')
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
    uploadPhoto(category, files).then((response) => {
      if (response === true) {
        setTotalCnt()
        NotificationManager.success('The photo has been removed successfully', 'Photo Uploaded')
      } else {
        NotificationManager.error('Something went wrong. Please try again later.', 'Photo Not Uploaded')
      }
    })
  }

  return (
    <Modal open={open} size='small' closeIcon onClose={() => onClose(false)}>
      <input type='file' id='file' multiple ref={inputFile} style={{ display: 'none' }} accept='image/*' onChange={changeFile} />
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Image wrapped bordered size='medium' src={imgSrc} onClick={() => inputFile.current.click()} />
        <Modal.Description>
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

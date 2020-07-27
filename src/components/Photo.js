import React from 'react'
import { Image } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications'

import { removePhoto } from '../utils/api'

function App ({ data, showModal, removeMe }) {
  const remove = (e) => {
    removePhoto(data.album, data.name).then((response) => {
      if (response === true) {
        removeMe(data.id)
        NotificationManager.success('The photo has been removed successfully', 'Photo Removed')
      } else {
        NotificationManager.error('Something went wrong. Please try again later.', 'Photo Not Removed')
      }
    })
    e.stopPropagation()
  }

  return (
    <div className='photo' onClick={() => showModal(data.raw)}>
      <Image src={data.raw} rounded fluid />

      <div className='photo-detail'>
        <p className='photo-album'>{data.album}</p>
        <span className='photo-title'>{data.name}</span>
      </div>
      <div className='photo-dimmer'>
        <div className='photo-remove' onClick={remove}>Remove</div>
        <p className='photo-tooltip'>Click to look larger.</p>
      </div>
    </div>
  )
}

export default App

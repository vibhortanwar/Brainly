import { useState } from 'react'
import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { Card } from '../components/Card'
import { ShareIcon } from '../icons/ShareIcon'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/Sidebar'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const handleAddContent = () => {
    console.log('Add Content Clicked');
    setModalOpen(true);
  }
  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex flex-col w-full p-4'>
        <div className="flex items-center justify-end gap-4 p-4">
          <CreateContentModal open = {modalOpen} onClose={() => setModalOpen(false)} />
          <Button 
            variant='secondary' 
            size='md'
            startIcon={<PlusIcon />}
            text="Add Content" 
            onClick={handleAddContent} />  
          <Button 
            variant='primary' 
            size='md' 
            startIcon={<ShareIcon size="lg" />}
            text="Share brain" />  
        </div>
        <Card 
          title='Project Ideas' 
          heading='Future Projects' 
          src={<div><blockquote className="twitter-tweet"><p lang="en" dir="ltr">Top 10 Catches of AB de Villiers in IPL<br />(DON&#39;T Miss the last one) 🥶<br /><br/>A Thread 🧵 <a href="https://t.co/9HXDTzXE2x">pic.twitter.com/9HXDTzXE2x</a></p>&mdash; was zoxxy (@PrimeKohli) <a href="https://twitter.com/PrimeKohli/status/1947258856792371454?ref_src=twsrc%5Etfw">July 21, 2025</a></blockquote> </div>}
          tags={['React', 'JavaScript', 'Frontend']} 
          onDelete={() => console.log('Delete')} 
          onShare={() => console.log('Share')} />
      </div>
    </div>
  )
}
import { useState } from 'react'
import { Button } from '../components/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { Card } from '../components/Card'
import { ShareIcon } from '../icons/ShareIcon'
import { CreateContentModal } from '../components/CreateContentModal'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const content = useContent();
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
        <div className="flex gap-4">
          {content.map(({ type, link, title }) => (
            <Card type={type} src={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  )
}
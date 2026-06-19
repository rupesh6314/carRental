import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Sidebar = () => {
    const { user, axios } = useAppContext()
    const location = useLocation()
    const [image, setImage] = useState('')

    const updateImage = async () => {
        if (!image) return
        
        const toastId = toast.loading('Uploading image...')
        try {
            const formData = new FormData()
            formData.append('image', image)
            
            const { data } = await axios.post('/api/owner/update-image', formData)
            
            if (data.success) {
                toast.success(data.message, { id: toastId })
                setImage('')
                // Reload to refresh user context and update UI
                window.location.reload()
            } else {
                toast.error(data.message, { id: toastId })
            }
        } catch (error) {
            toast.error(error.message, { id: toastId })
        }
    }
    
    return (
        <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm'>
            <div className='group relative'>
                <label htmlFor='image' className="cursor-pointer block">
                    <div className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto relative overflow-hidden bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-md">
                        {image ? (
                            <img src={URL.createObjectURL(image)} alt='Upload preview' className='w-full h-full object-cover' />
                        ) : user?.image ? (
                            <img src={user.image} alt='Profile' className='w-full h-full object-cover' />
                        ) : (
                            user?.name ? user.name.charAt(0).toUpperCase() : 'O'
                        )}
                        <div className='absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center'>
                            <img src={assets.edit_icon} alt='edit' className='w-4 md:w-5 invert opacity-90' />
                        </div>
                    </div>
                    <input type='file' id='image' accept='image/*' hidden onChange={e => setImage(e.target.files[0])} />
                </label>
            </div>

            {image && (
                <button className='absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer rounded-bl-lg' onClick={updateImage}>
                    Save <img src={assets.check_icon} width={13} alt='' />
                </button>
            )}

            <p className='mt-2 text-base max-md:hidden'>{user?.name}</p>

            <div className='w-full'>
                {ownerMenuLinks.map((link,index)=>(
                   <NavLink key={index} to={link.path} className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${link.path===location.pathname?'bg-primary':'text-gray-600'}`}>
                    <img src={link.path===location.pathname ?link.coloredIcon:link.icon} alt='car icon'/>
                    <span className='max-md:hidden'>{link.name}</span>
                    <div className={`${link.path===location.pathname && 'bg-primary'} w-1.5 h-8 rounded-l right-0 absolute`}>

                    </div>
                   </NavLink> 
                ))}
            </div>
        </div>   
    )
}
export default Sidebar
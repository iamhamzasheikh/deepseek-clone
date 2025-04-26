import Image from 'next/image'
import React, { useState } from 'react'
import { assets } from '../../../assets/assets'

const PromptBox = ({ isLoading, setIsLoading }) => {

    const [prompt, setPrompt] = useState('');
    return (
        <form className={`w-full ${false ? 'max-w-3xl' : 'max-w-2xl'} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}>

            <textarea rows={2} placeholder='Message DeepSeek' required
                className='outline-none w-full resize-none overflow-hidden break-words bg-transparent'
                onChange={(e) => setPrompt(e.target.value)} value={prompt} />

            <div className='flex items-center justify-between text-sm'>
                <div className='flex items-center gap-2'>
                    <p className='flex items-center gap-2 text-xs border rounded-full p-1.5 border-gray-300/20 transition'>
                        <Image className='h-5' alt='' src={assets.deepthink_icon} />
                        DeepThing (R1)
                    </p>

                    <p className='flex items-center gap-2 text-xs border rounded-full p-1.5 border-gray-300/20 transition'>
                        <Image className='h-5' alt='' src={assets.search_icon} />
                        Search
                    </p>
                </div>

                <div className='flex items-center gap-2'>
                    <Image className='w-4 cursor-pointer' alt='' src={assets.pin_icon} />
                    <button className={`${prompt ? 'bg-primary' : 'bg-[#71717a]'} rounded-full p-2 cursor-pointer`}>
                        <Image className='w-3.5 aspect-square' src={prompt ? assets.arrow_icon : assets.arrow_icon_dull} alt='' />
                    </button>
                </div>

            </div>
        </form>
    )
}

export default PromptBox

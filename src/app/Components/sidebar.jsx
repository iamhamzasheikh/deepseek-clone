// import Image from 'next/image'
// import React from 'react'
// import { assets } from '../../../assets/assets'

// const sidebar = ({ expand, setExpand }) => {
//   return (
//     <div className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${expand ? 'p-4' : 'md:w-20 w-0 max-md:overflow-hidden'}`}>
//       <div className=''>
//         <div className={`flex ${expand ? 'flex-row gap-10' : 'flex-col items-center gap-8'}`}>
//           <Image className={expand ? 'w-36' : 'w-10'} src={expand ? assets.logo_text : assets.logo_icon} />

//           <div onClick={() => expand ? setExpand(false) : setExpand(true)} className='group relative flex items-center
//            justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer'>
//             <Image src={assets.menu_icon} className='md:hidden' />
//             <Image src={expand ? assets.sidebar_close_icon : assets.sidebar_icon} className='hidden md:block w-7' />

//             <div className={`absolute w-max 
//               ${expand ? 'left 1/2 -translate-x-6 top-12' : '-top-12 left-0'} 
//               opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}>
//               {expand ? 'close sidebar' : 'Open sidebar'}
//               <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? 'left-1/2 -top-1.5 -translate-x-1/2' : 'left-4 -bottom-1.5'} `}></div>
//             </div>
//           </div>
//         </div>
//         <button className={`mt-8 flex items-center justify-center cursor-pointer ${expand ? 'bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max' : 'group relative  h-9 w-9 max-auto hover:bg-gray-500/30 rounded-lg'}`}>
//           <Image className={expand ? 'w-6' : 'w-7'} src={expand ? assets.chat_icon : assets.chat_icon_dull} alt='' />

//           <div className='absolute w-max -top-12 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none'>New Chat
//             <div className='w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5'></div>
//           </div>
//           {expand && <p className='text-white font-medium'>New Chat</p>}
//         </button>
//       </div>
//     </div>
//   )
// }

// export default sidebar
import Image from 'next/image'
import React from 'react'
import { assets } from '../../../assets/assets'

const sidebar = ({ expand, setExpand }) => {
  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 z-50 
      max-md:absolute max-md:h-screen transition-all duration-300 
      ${expand ? 'p-4 w-64' : 'md:w-20 w-0 max-md:overflow-hidden'}`}
    >
      <div>
        <div className={`flex transition-all duration-300 ${expand ? 'flex-row gap-10' : 'flex-col items-center gap-8'}`}>
          <Image
            className={expand ? 'w-36' : 'w-10'}
            src={expand ? assets.logo_text : assets.logo_icon}
            alt="logo"
          />

          {/* Toggle button */}
          <div
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer"
          >
            <Image src={assets.menu_icon} className="md:hidden" alt="menu" />
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              className="hidden md:block w-7"
              alt="toggle"
            />

            {/* Tooltip */}
            <div
              className={`absolute w-max ${
                expand ? 'left-1/2 -translate-x-1/2 top-12' : '-top-12 left-0'
              } opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}
            >
              {expand ? 'Close sidebar' : 'Open sidebar'}
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand ? 'left-1/2 -top-1.5 -translate-x-1/2' : 'left-4 -bottom-1.5'
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* New Chat Button */}
        <button
          className={`mt-8 flex items-center justify-center cursor-pointer transition-all duration-300 ${
            expand
              ? 'bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max'
              : 'group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg'
          }`}
        >
          <Image
            className={expand ? 'w-6' : 'w-7'}
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt=""
          />

          {!expand && (
            <div className="absolute w-max -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none">
              New Chat
              <div className="w-3 h-3 absolute bg-black rotate-45 left-1/2 -bottom-1.5 -translate-x-1/2"></div>
            </div>
          )}
          {expand && <p className="text-white font-medium">New Chat</p>}
        </button>
      </div>
    </div>
  )
}

export default sidebar

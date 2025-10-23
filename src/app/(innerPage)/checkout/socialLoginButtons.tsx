import React from 'react'

const SocialLoginButtons = () => {
    return (
        <div>
            <p className='text-center mt-7.5 text-base font-medium text-secondary-foreground flex items-center gap-5'>
                <span className='block max-w-[138px] w-full h-px bg-[#999796] '></span>
                <span>Or Login With</span>
                <span className='block max-w-[138px] w-full h-px bg-[#999796] '></span>
            </p>

            <div className='flex flex-col justify-between gap-5 mt-5'>
                <div className='bg-[#4285F4] text-center cursor-pointer w-full py-3 px-6 relative rounded-lg'>
                    <span className='flex justify-center items-center w-7.5 h-7.5 bg-background absolute left-6'>
                        <img src="/images/google.png" alt="google" />
                    </span>
                    <span className='text-white uppercase block'>Google</span>
                </div>
                <div className='bg-[#365EB2] text-center cursor-pointer w-full py-3 px-6 relative rounded-lg'>
                    <span className='flex justify-center items-center w-7.5 h-7.5 bg-background absolute left-6'>
                        <img src="/images/facebook.png" alt="facebook" />
                    </span>
                    <span className='text-white uppercase'>Facebook</span>
                </div>
            </div>
        </div>
    )
}

export default SocialLoginButtons
import React, { use } from 'react'
import { signIn, signOut, useSession } from "next-auth/react"

function Header() {
  const { data: sessionData } = useSession();
  return (
    <div className='navbar bg-primary text-primary-content'>
      <div className='flex-1 pl-5 text-3xl font-bold'>
        {sessionData?.user.name ? `Notes for ${sessionData.user.name}` : ""}
      </div>
      {sessionData?.user ? (<div className='flex-none'>
        <div className='dropdown-end dropdown'>
          <label tabIndex={0}
            className='btn-ghost btn-circle avatar btn'
            onClick={() => void signOut()}>
            <img src={sessionData?.user.image ?? ""} alt={sessionData?.user.image ?? ""} />
          </label>
        </div>
      </div>) :
        (<button
          className='btn btn-ghost rounded-btn'
          onClick={() => void signIn()}
        >
          Sign in
        </button>)}

    </div >
  )
}

export default Header
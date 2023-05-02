import Link from 'next/link'
import React from 'react'

function BtnFloating() {
    return (
        <div style={{ width: "55px", position: "fixed", right: "0", bottom: "0" }} className='rounded-circle fs-3 text-center fixed bg-dark m-4'>

            <Link href="/"><i style={{ color: "white" }} className="bi bi-arrow-left"></i></Link>

        </div>
    )
}

export default BtnFloating
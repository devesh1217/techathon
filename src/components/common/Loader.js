import React from 'react'

function Loader() {
    return (
        <div>
            <div className="w-full h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        </div>
    )
}

export default Loader
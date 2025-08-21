import React from 'react'
import { useState } from 'react'
import { gameData } from '../assets/gamedata'


const HealthInfoCard = ({ name, info }) => {
    const [showMore, setShowMore] = useState(false)

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">{gameData.image}</div>
                <h4 className="font-bold text-gray-800 text-sm">{name}</h4>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <p className="text-gray-700 text-sm">{info.data}</p>
            </div>

            {showMore && (
                <div className="bg-green-50 rounded-lg p-3 mb-3">
                    <h5 className="font-bold text-green-800 text-sm mb-2">ข้อมูลเพิ่มเติม</h5>
                    <p className="text-gray-700 text-xs leading-relaxed">{info.additional}</p>
                </div>
            )}

            <button
                onClick={() => setShowMore(!showMore)}
                className={`w-full py-2 px-3 rounded-lg font-medium text-sm transition-colors ${showMore
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
            >
                {showMore ? '📄 ย่อข้อมูล' : '📖 อ่านเพิ่มเติม'}
            </button>
        </div>
    )
}

export default HealthInfoCard

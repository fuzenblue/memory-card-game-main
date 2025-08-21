import React from 'react'
import { useState } from 'react'
import HealthInfoCard from '../components/HealthInfoCard'
import { gameData } from '../assets/gamedata.js'


const HomePage = ({ onStartGame }) => {
    const [selectedPairs, setSelectedPairs] = useState(4);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200">
            {/* Header */}
            <div className="text-center py-8">
                <div className="floating text-6xl mb-4">🧠</div>
                <h1 className="text-4xl md:text-5xl font-bold text-purple-800 mb-2">เกมจับคู่ความจำ</h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-pink-600 mb-4">โรคอ้วนและการป้องกัน</h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto px-4">
                    เรียนรู้เกี่ยวกับสาเหตุและการป้องกันโรคอ้วนผ่านเกมจับคู่ที่สนุกสนาน
                </p>
            </div>

            {/* How to Play */}
            <div className="max-w-4xl mx-auto px-4 mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">🎮 วิธีการเล่น</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">1</div>
                                <p className="text-gray-700">เลือกจำนวนคู่การ์ดที่ต้องการเล่น (สูงสุด 16 คู่)</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">2</div>
                                <p className="text-gray-700">คลิกการ์ดเพื่อพลิกและหาคู่ที่ตรงกัน</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">3</div>
                                <p className="text-gray-700">เมื่อจับคู่ถูก การ์ดจะเปลี่ยนสีและเก็บไว้</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="bg-pink-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">4</div>
                                <p className="text-gray-700">จับคู่ให้ครบทุกคู่เพื่อชนะเกม</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-4">
                            <h4 className="font-bold text-orange-800 mb-2">🏆 เป้าหมาย</h4>
                            <ul className="text-orange-700 space-y-1 text-sm">
                                <li>• จับคู่การ์ดให้ครบทุกคู่</li>
                                <li>• เรียนรู้ข้อมูลสุขภาพ</li>
                                <li>• ทำเวลาให้ดีที่สุด</li>
                                <li>• สนุกไปกับการเรียนรู้</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Game Settings */}
            <div className="max-w-md mx-auto px-4 mb-8">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-center text-gray-800 mb-4">⚙️ ตั้งค่าเกม</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                จำนวนคู่การ์ด: {selectedPairs} คู่
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {[4, 8, 12, 16].map(pairs => (
                                    <button
                                        key={pairs}
                                        onClick={() => setSelectedPairs(pairs)}
                                        className={`py-2 px-3 rounded-lg font-medium text-sm transition-colors ${selectedPairs === pairs
                                            ? 'bg-purple-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        {pairs} คู่
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="text-center text-sm text-gray-600">
                            การ์ดทั้งหมด: {selectedPairs * 2} ใบ
                        </div>
                    </div>
                </div>
            </div>

            {/* Start Game Button */}
            <div className="text-center pb-8">
                <button
                    onClick={() => onStartGame(selectedPairs)}
                    className="bounce bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                    🚀 เริ่มเล่นเกม
                </button>
            </div>

            {/* Health Information */}
            <div className="max-w-6xl mx-auto px-4 pb-8">
                <h3 className="text-xl font-bold text-center text-gray-800 mb-4">📚 ข้อมูลสุขภาพ</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(gameData).map(([name, info], index) => (
                        <HealthInfoCard key={index} name={name} info={info} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage

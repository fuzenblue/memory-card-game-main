import React from 'react'
import { useState } from 'react'
import { assets, gameData } from '../assets/gamedata.js'

const GameOverModal = ({ stats, onRestart, onHome, onReadSummary }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="modal-enter bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
                <div className="text-center mb-6">
                    <div className="flex justify-center items-center mb-4">
                        <img
                            className='max-w-24 max-h-24 sm:max-w-28 sm:max-h-28 md:max-w-32 md:max-h-32 lg:max-w-36 lg:max-h-36 w-full h-auto object-contain'
                            src={assets.back2}
                            alt=""
                        />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">ยินดีด้วย!</h3>
                    <p className="text-sm sm:text-base text-gray-600">คุณจับคู่ได้ครบทุกคู่แล้ว!</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-600 mb-2 text-center">สถิติของคุณ</div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-blue-600">{stats.time}</div>
                            <div className="text-xs text-gray-600">เวลา</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">{stats.moves}</div>
                            <div className="text-xs text-gray-600">จำนวนครั้ง</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-purple-600">{stats.pairs}</div>
                            <div className="text-xs text-gray-600">คู่ที่จับได้</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={onReadSummary}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                        อ่านสรุปเนื้อหาทั้งหมด
                    </button>
                    <button
                        onClick={onRestart}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                        เล่นอีกครั้ง
                    </button>
                    <button
                        onClick={onHome}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                        กลับหน้าหลัก
                    </button>
                </div>
            </div>
        </div>
    )
}

export default GameOverModal

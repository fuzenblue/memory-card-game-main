import React from 'react'
import { gameData } from '../assets/gamedata.js'

const SummaryModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="modal-enter bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="text-center mb-6">
                    <div className="text-4xl mb-2">📚</div>
                    <h3 className="text-2xl font-bold text-gray-800">สรุปเนื้อหาทั้งหมด</h3>
                    <p className="text-gray-600">ความรู้เกี่ยวกับโรคอ้วนและการป้องกัน</p>
                </div>

                <div className="space-y-4">
                    {Object.entries(gameData).map(([name, info], index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="text-2xl">{info.icon}</div>
                                <h4 className="font-bold text-gray-800">{name}</h4>
                            </div>
                            <div className="bg-white rounded p-3 mb-2">
                                <p className="text-sm text-gray-700">{info.data}</p>
                            </div>
                            <div className="bg-blue-50 rounded p-3">
                                <p className="text-xs text-gray-600 leading-relaxed">{info.additional}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-6">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-medium transition-colors"
                    >
                        ปิด
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SummaryModal

import React, { useState } from 'react'
import { gameData } from '../assets/gamedata.js'

const splitLines = (text) => {
    if (!text) return []
    return text.split(/\n|•|-/).map((t) => {
        const clean = t.trim()
        if (!clean) return null
        const indent = t.search(/\S|$/)
        return { text: clean, indent }
    }).filter(Boolean)
}

const SummaryModal = ({ onClose }) => {
    const [openIndex, setOpenIndex] = useState(null)

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="modal-enter bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto relative">

                {/* Close Button - Top Right */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-gray-500 hover:bg-gray-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-medium transition-colors"
                >
                    ×
                </button>

                <div className="text-center mb-6 pr-8">
                    <div className="text-4xl mb-2">📚</div>
                    <h3 className="text-2xl font-bold text-gray-800">สรุปเนื้อหาทั้งหมด</h3>
                    <p className="text-gray-600">ความรู้เกี่ยวกับโรคอ้วนและการป้องกัน</p>
                </div>

                <div className="space-y-6">
                    {Object.entries(gameData).map(([name, info], index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-4 border">
                            <div className="flex items-center gap-3 mb-3">
                                {info.icon && <div className="text-2xl">{info.icon}</div>}
                                <h4 className="font-bold text-gray-800 text-lg">{name}</h4>
                            </div>

                            {/* ข้อมูลหลัก */}
                            <div className="mb-4 rounded-md bg-blue-50/70">
                                <div className="px-4 py-2 font-semibold text-blue-800 border-b">
                                    💡 เกร็ดน่ารู้
                                </div>
                                <div className="px-4 py-3 space-y-2 text-gray-700">
                                    {splitLines(info.data).map((line, i) => (
                                        <div key={i} className="flex gap-2">
                                            <span className="text-blue-700">•</span>
                                            <p>{line.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ข้อมูลเพิ่มเติม */}
                            {info.additional && (
                                <div className="mb-4 rounded-md bg-green-50/70">
                                    <div className="px-4 py-2 font-semibold text-green-800 border-b flex items-center justify-between">
                                        <span>📚 ข้อมูลเพิ่มเติม</span>
                                        <button
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                            className="text-sm text-green-700 hover:underline"
                                        >
                                            {openIndex === index ? "ย่อ ▲" : "อ่านเพิ่มเติม ▼"}
                                        </button>
                                    </div>
                                    {openIndex === index && (
                                        <div className="px-4 py-3 space-y-2 text-gray-700 text-sm leading-relaxed">
                                            {splitLines(info.additional).map((line, i) => (
                                                <div
                                                    key={i}
                                                    className="flex gap-2"
                                                    style={{ marginLeft: `${Math.floor(line.indent / 2)}rem` }}
                                                >
                                                    <span className="text-green-700">•</span>
                                                    <p>{line.text}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SummaryModal

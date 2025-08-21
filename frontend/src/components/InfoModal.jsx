import React from 'react'
import { useState } from 'react'

const InfoModal = ({ cardInfo, onClose }) => {
            const [showMore, setShowMore] = useState(false);

            if (!cardInfo) return null;

            return (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="modal-enter bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="text-center mb-4">
                            <div className="text-5xl mb-2">{cardInfo.icon}</div>
                            <h3 className="text-xl font-bold text-gray-800">{cardInfo.name}</h3>
                        </div>
                        
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                            <h4 className="font-bold text-blue-800 mb-2">📋 ข้อมูลหลัก</h4>
                            <p className="text-gray-700">{cardInfo.data}</p>
                        </div>

                        {showMore && (
                            <div className="bg-green-50 rounded-lg p-4 mb-4">
                                <h4 className="font-bold text-green-800 mb-2">📚 ข้อมูลเพิ่มเติม</h4>
                                <p className="text-gray-700 text-sm leading-relaxed">{cardInfo.additional}</p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            {!showMore ? (
                                <button 
                                    onClick={() => setShowMore(true)}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition-colors"
                                >
                                    📖 อ่านเพิ่มเติม
                                </button>
                            ) : (
                                <button 
                                    onClick={() => setShowMore(false)}
                                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition-colors"
                                >
                                    📄 ย่อข้อมูล
                                </button>
                            )}
                            <button 
                                onClick={onClose}
                                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-medium transition-colors"
                            >
                                ปิด
                            </button>
                        </div>
                    </div>
                </div>
            );
        };

export default InfoModal

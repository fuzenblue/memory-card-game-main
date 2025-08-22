import React, { useState } from 'react'
import { gameData } from '../assets/gamedata'

const HealthInfoCard = ({ name }) => {
  const [showMore, setShowMore] = useState(false)

  // ดึงข้อมูลจาก gameData ตามชื่อ
  const info = gameData[name]

  if (!info) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-lg">
        ⚠️ ข้อมูลของ <b>{name}</b> ไม่ถูกต้อง
      </div>
    )
  }

  const splitLines = (text) => {
    if (!text) return []
    return text.split(/\n/).map((line) => {
      const trimmed = line.trim()
      if (!trimmed) return null
      const indent = line.match(/^\s*/)[0].length
      return {
        text: trimmed.replace(/^[-•]/, "").trim(),
        indent: indent,
      }
    }).filter(Boolean)
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        {info.image && (
          <img src={info.image} alt={name} className="w-10 h-10 rounded-full" />
        )}
        <h4 className="font-bold text-gray-800 text-base">{name}</h4>
      </div>

      {/* เกร็ดน่ารู้ */}
      {info.data && (
        <div className="mb-4 rounded-md  bg-blue-50/70">
          <div className="px-4 py-2 font-semibold text-blue-800">
            💡 เกร็ดน่ารู้
          </div>
          <div className="px-4 py-3 space-y-2 text-gray-700">
            {splitLines(info.data).map((line, i) => (
              <div
                key={i}
                className="flex gap-2"
                style={{ marginLeft: `${Math.floor(line.indent / 2)}rem` }}
              >
                <span className="text-blue-700">•</span>
                <p>{line.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ข้อมูลเพิ่มเติม */}
      {info.additional && (
        <div className="mb-4 rounded-md  bg-green-50/70">
          <div className="px-4 py-2 font-semibold text-green-800 flex items-center justify-between">
            <span>📚 ข้อมูลเพิ่มเติม</span>
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-sm text-green-700 hover:underline"
            >
              {showMore ? "ย่อ ▲" : "แตะเพื่อเปิดอ่าน ▼"}
            </button>
          </div>
          {showMore && (
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
  )
}

export default HealthInfoCard

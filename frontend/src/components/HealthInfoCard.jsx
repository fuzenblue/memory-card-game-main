import React from 'react'
import { useState } from 'react'
import { gameData } from '../assets/gamedata'

const HealthInfoCard = ({ name, info }) => {
  const [showMore, setShowMore] = useState(false)

  const splitLines = (text) => {
    if (!text) return [];
    return text.split(/\n/).map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;

      const indent = line.match(/^\s*/)[0].length;

      return {
        text: trimmed.replace(/^[-•]/, "").trim(),
        indent: indent,
      }
    }).filter(Boolean);
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

      {/* ข้อมูลหลัก */}
      <div className="mb-3 rounded-xl border bg-blue-50/70">
        <div className="px-3 py-2 font-semibold text-blue-800 border-b text-sm">
          📋 เกร็ดน่ารู้
        </div>
        <div className="px-3 py-2 space-y-2 text-gray-700 text-sm">
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
        <div className="mb-3 rounded-xl border bg-green-50/70">
          <div className="px-3 py-2 font-semibold text-green-800 border-b flex items-center justify-between text-sm">
            <span>📚 ข้อมูลเพิ่มเติม</span>
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-xs text-green-700 hover:underline"
            >
              {showMore ? "ย่อ ▲" : "อ่านเพิ่มเติม ▼"}
            </button>
          </div>
          {showMore && (
            <div className="px-3 py-2 space-y-2 text-gray-700 text-xs leading-relaxed">
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

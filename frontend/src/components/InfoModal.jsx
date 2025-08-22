import { useState } from "react"

const InfoModal = ({ cardInfo, onClose }) => {
  const [showMore, setShowMore] = useState(false)

  if (!cardInfo) return null

  const splitLines = (text) => {
    if (!text) return [];
    return text.split(/\n/).map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;

      const indent = line.match(/^\s*/)[0].length

      return {
        text: trimmed.replace(/^[-•]/, "").trim(),
        indent: indent,
      }
    }).filter(Boolean)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="modal-enter bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto relative">

        {/* Header */}
        <div className="mb-4 pr-8">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            {cardInfo.image && (
              <img src={cardInfo.image} alt={cardInfo.name} className="w-10 h-10 rounded-full" />
            )}
            {cardInfo.name}
          </h3>
        </div>

        {/* ข้อมูลหลัก */}
        <div className="mb-4 rounded-md bg-blue-50/70">
          <div className="px-4 py-2 font-semibold text-blue-800 border-b">
            💡 เกร็ดน่ารู้
          </div>
          <div className="px-4 py-3 space-y-2 text-gray-700">
            {splitLines(cardInfo.data).map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-blue-700">•</span>
                <p>{line.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ข้อมูลเพิ่มเติม */}
        {cardInfo.additional && (
          <div className="mb-4 rounded-md bg-green-50/70">
            <div className="px-4 py-2 font-semibold text-green-800 border-b flex items-center justify-between">
              <span>📚 ข้อมูลเพิ่มเติม</span>
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-sm text-green-700 hover:underline"
              >
                {showMore ? "ย่อ ▲" : "อ่านเพิ่มเติม ▼"}
              </button>
            </div>
            {showMore && (
              <div className="px-4 py-3 space-y-2 text-gray-700 text-sm leading-relaxed">
                {splitLines(cardInfo.additional).map((line, i) => (
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

export default InfoModal

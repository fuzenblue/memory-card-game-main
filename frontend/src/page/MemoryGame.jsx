import React from 'react'
import { useState, useEffect, useRef } from 'react'
import InfoModal from '../components/InfoModal.jsx'
import GameOverModal from '../components/GameOverModal.jsx'
import SummaryModal from '../components/SummaryModal.jsx'
import { gameData, assets } from '../assets/gamedata.js'

const MemoryGame = ({ pairCount, onBackHome }) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameActive, setGameActive] = useState(true);
    const [showInfo, setShowInfo] = useState(null);
    const [showGameOver, setShowGameOver] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [startTime, setStartTime] = useState(Date.now());
    const [currentTime, setCurrentTime] = useState(0);
    const timerRef = useRef(null);

    // Initialize game
    useEffect(() => {
        initGame();
        startTimer();
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [pairCount]);

    const startTimer = () => {
        timerRef.current = setInterval(() => {
            setCurrentTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
    }

    // restart
    const restartGame = () => {
        if (timerRef.current) clearInterval(timerRef.current);

        const newStart = Date.now();
        setStartTime(newStart);
        setCurrentTime(0);

        initGame();
        
        timerRef.current = setInterval(() => {
            setCurrentTime(Math.floor((Date.now() - newStart) / 1000));
        }, 1000);
    };

    const initGame = () => {
        const cardNames = Object.keys(gameData).slice(0, pairCount);
        const gameCards = [...cardNames, ...cardNames];

        // Shuffle cards
        for (let i = gameCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [gameCards[i], gameCards[j]] = [gameCards[j], gameCards[i]];
        }

        console.log('Game cards:', gameCards); // Debug log
        console.log('Game data keys:', Object.keys(gameData)); // Debug log

        setCards(gameCards);
        setFlippedCards([]);
        setMatchedPairs([]);
        setMoves(0);
        setGameActive(true);
        setStartTime(Date.now());
        setCurrentTime(0);
    };

    const flipCard = (index) => {
        console.log('Flip card clicked:', index);
        console.log('Current flipped cards:', flippedCards);
        console.log('Card content:', cards[index]);
        console.log('Game data for card:', gameData[cards[index]]);

        if (!gameActive || flippedCards.length >= 2 ||
            flippedCards.includes(index) || matchedPairs.includes(index)) {
            console.log('Card flip blocked');
            return;
        }

        const newFlipped = [...flippedCards, index];
        console.log('New flipped cards:', newFlipped);
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(moves + 1);

            setTimeout(() => {
                checkMatch(newFlipped);
            }, 1000);
        }
    };

    const checkMatch = (flipped) => {
        const [first, second] = flipped;

        if (cards[first] === cards[second]) {
            // Match found
            const newMatched = [...matchedPairs, first, second];
            setMatchedPairs(newMatched);

            // Show info popup for matched pair only if game is not complete
            if (newMatched.length < cards.length) {
                setTimeout(() => {
                    setShowInfo({
                        name: cards[first],
                        image: gameData[cards[first]]?.image,
                        data: gameData[cards[first]]?.data,
                        additional: gameData[cards[first]]?.additional
                    });
                }, 800);
            }

            // Check if game is complete
            if (newMatched.length === cards.length) {
                setGameActive(false);
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
                // Close any open info modal first, then show game over
                setShowInfo(null);
                setTimeout(() => {
                    setShowGameOver(true);
                }, 1500);
            }
        }

        setFlippedCards([]);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getGridCols = () => {
        const totalCards = pairCount * 2;
        if (totalCards === 8) return 'grid-cols-2 sm:grid-cols-4'; // 4 คู่: 2x4 หรือ 4x2
        if (totalCards === 16) return 'grid-cols-4'; // 8 คู่: 4x4
        if (totalCards === 24) return 'grid-cols-4 sm:grid-cols-6'; // 12 คู่: 4x6 หรือ 6x4
        if (totalCards === 32) return 'grid-cols-4 sm:grid-cols-8'; // 16 คู่: 4x8 หรือ 8x4
        return 'grid-cols-4';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 p-4">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-2">🧠 เกมจับคู่ความจำ</h1>
                <button
                    onClick={onBackHome}
                    className="text-purple-600 hover:text-purple-800 font-medium"
                >
                    ← กลับหน้าหลัก
                </button>
            </div>

            {/* Game Stats */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-6 px-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 shadow-md flex-1 max-w-[120px]">
                    <div className="text-xs sm:text-sm text-gray-600 text-center">เวลา</div>
                    <div className="text-lg sm:text-xl font-bold text-blue-700 text-center">{formatTime(currentTime)}</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 shadow-md flex-1 max-w-[120px]">
                    <div className="text-xs sm:text-sm text-gray-600 text-center">จำนวนครั้ง</div>
                    <div className="text-lg sm:text-xl font-bold text-green-700 text-center">{moves}</div>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 shadow-md flex-1 max-w-[120px]">
                    <div className="text-xs sm:text-sm text-gray-600 text-center">คู่ที่จับได้</div>
                    <div className="text-lg sm:text-xl font-bold text-purple-700 text-center">{matchedPairs.length / 2}/{pairCount}</div>
                </div>
            </div>


            {/* Game Board */}
            <div className="max-w-6xl mx-auto mb-6">
                <div className={`grid ${getGridCols()} gap-2 sm:gap-3`}>
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className={`card aspect-square p[-8px] relative ${matchedPairs.includes(index) ? 'matched' : ''}`}
                            onClick={() => flipCard(index)}
                        >
                            <div
                                className={`card-inner h-full w-full relative ${flippedCards.includes(index) || matchedPairs.includes(index) ? 'flipped' : ''
                                    }`}
                            >
                                {/* Card Front */}
                                <div className="card-front flex items-center justify-center rounded-3xl">
                                    <img
                                        src={assets?.back2}
                                        alt="card-back"
                                        className="max-w-full max-h-full"
                                    />
                                </div>

                                {/* Card Back */}
                                <div className="card-back flex items-center justify-center rounded-3xl">
                                    {gameData[card]?.image ? (
                                        <img
                                            src={gameData[card].image}
                                            alt={card}
                                            className="max-w-full max-h-full"
                                        />
                                    ) : (
                                        <span className="text-4xl sm:text-5xl lg:text-6xl">❓</span>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Restart Game Button */}
            <div className="text-center pb-8">
                <button
                    onClick={() => restartGame()}
                    className="btn bg-gradient-to-r from-blue-500 to-pink-400 hover:from-blue-600 hover:to-pink-500 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                    Restart Game
                </button>
            </div>

            {/* Modals */}
            <InfoModal
                cardInfo={showInfo}
                onClose={() => setShowInfo(null)}
            />

            {showGameOver && (
                <GameOverModal
                    stats={{
                        time: formatTime(currentTime),
                        moves: moves,
                        pairs: matchedPairs.length / 2
                    }}
                    onRestart={() => {
                        setShowGameOver(false);
                        initGame();
                        startTimer();
                    }}
                    onHome={onBackHome}
                    onReadSummary={() => {
                        setShowGameOver(false);
                        setShowSummary(true);
                    }}
                />
            )}

            {showSummary && (
                <SummaryModal
                    onClose={() => setShowSummary(false)}
                />
            )}
        </div>
    );
};


export default MemoryGame

/**
 * Palette - Mood of the Day
 * Data Configuration File
 */

const PALETTE_DATA = {
    // Profile Info
    profile: {
        name: "Palette",
        tagline: "Mood of the Day"
    },

    // Today's Question & Answer
    question: {
        text: "오늘 하루, 어떤 색으로 기억하고 싶나요?",
        answer: "오늘은 따뜻한 살구빛 노을을 닮은 하루였어요. 아침에 마신 커피 한 잔의 여유, 점심 무렵 스쳐 지나간 바람의 온도, 그리고 저녁 노을 아래 걸었던 짧은 산책. 특별한 일은 없었지만, 그래서 더 평화로웠던 것 같아요. 이런 날들이 쌓여서 결국 우리의 계절이 되는 거겠죠."
    },

    // Gallery Photo (Landscape)
    gallery: {
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&auto=format",
        caption: "somewhere between yesterday and tomorrow"
    },

    // Background Music (Calm Piano)
    music: {
        title: "Soft Morning Light",
        artist: "Piano Ambient",
        // Calm piano music
        audioUrl: "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3"
    },

    // Theme Colors
    themes: [
        { name: "sage", color: "#97c1a9" },
        { name: "mint", color: "#cce2cb" },
        { name: "apricot", color: "#ffdbbe" }
    ],

    // Sample Guestbook Entries (including question answers)
    guestbookEntries: [
        { color: "#cce2cb", message: "저는 오늘 민트색이요! 시원하고 상쾌했던 하루 🌿" },
        { color: "#ffdbbe", message: "분홍빛 하루였어요, 사랑스러운 일이 있었거든요 💕" },
        { color: "#97c1a9", message: "오늘도 예쁜 하루 보내세요 💚" },
        { color: "#c1d4f6", message: "음악 취향 최고! 여기 분위기 너무 좋아요" },
        { color: "#e8d4f6", message: "저도 살구색! 노을 보면서 산책했어요 🌅" }
    ]
};

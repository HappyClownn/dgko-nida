import type { Question } from "./schema";

// ÖRNEK SORULAR - Gerçek kullanımda her seviye için ayrı fotoğraf yüklenecek
// Seviye 4: En yakın çekim (en anlaşılmaz) - 1000 puan
// Seviye 3: Biraz uzaklaşmış - 750 puan
// Seviye 2: Daha uzak - 500 puan
// Seviye 1: En uzak (en anlaşılır) - 250 puan

export const sampleQuestions: Question[] = [
  {
    id: "1",
    imageUrl: "https://ibb.co/rKGqyXk4?w=800",
    correctAnswer: "Galata Kulesi",
    options: ["Eiffel Kulesi", "Kız Kulesi", "Big Ben", "Galata Kulesi"],
    zoomLevels: [
      {
        level: 4,
        // En yakın çekim - küçük crop (en anlaşılmaz)
        imageUrl: "https://ibb.co/rKGqyXk4?w=400&h=400&fit=crop&crop=center",
        points: 1000,
      },
      {
        level: 3,
        imageUrl: "https://ibb.co/rKGqyXk4?w=500&h=500&fit=crop&crop=center",
        points: 750,
      },
      {
        level: 2,
        imageUrl: "https://ibb.co/rKGqyXk4?w=600&h=600&fit=crop&crop=center",
        points: 500,
      },
      {
        level: 1,
        // En uzak - tam fotoğraf (en anlaşılır)
        imageUrl: "https://ibb.co/rKGqyXk4?w=800",
        points: 250,
      },
    ],
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
    correctAnswer: "Paris",
    options: ["Londra", "Paris", "Roma", "Berlin"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=400&fit=crop&crop=center",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&h=500&fit=crop&crop=center",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=600&fit=crop&crop=center",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
        points: 250,
      },
    ],
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    correctAnswer: "Londra",
    options: ["New York", "Tokyo", "Londra", "Dubai"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=400&fit=crop&crop=center",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=500&fit=crop&crop=center",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=600&fit=crop&crop=center",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
        points: 250,
      },
    ],
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
    correctAnswer: "Japonya",
    options: ["Çin", "Kore", "Japonya", "Tayland"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=400&fit=crop&crop=center",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&h=500&fit=crop&crop=center",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=600&fit=crop&crop=center",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
        points: 250,
      },
    ],
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
    correctAnswer: "Santorini",
    options: ["Mykonos", "Santorini", "Bodrum", "Malta"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=400&fit=crop&crop=center",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=500&h=500&fit=crop&crop=center",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=600&fit=crop&crop=center",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800",
        points: 250,
      },
    ],
  },
  {
    id: "6",
    imageUrl:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
    correctAnswer: "Paris",
    options: ["Londra", "Paris", "New York", "Berlin"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=400&fit=crop&crop=center",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=500&h=500&fit=crop&crop=center",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&h=600&fit=crop&crop=center",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
        points: 250,
      },
    ],
  },
  {
    id: "7",
    imageUrl:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
    correctAnswer: "Gökyüzü",
    options: ["Deniz", "Gökyüzü", "Orman", "Çöl"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop&crop=center",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&h=500&fit=crop&crop=center",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=600&fit=crop&crop=center",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800",
        points: 250,
      },
    ],
  },
  {
    id: "8",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    correctAnswer: "Dağ",
    options: ["Deniz", "Dağ", "Vadi", "Plaj"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop&crop=center",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&crop=center",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        points: 250,
      },
    ],
  },
  {
    id: "9",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
    correctAnswer: "Hawaii",
    options: ["Maldivler", "Hawaii", "Karayipler", "Bali"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=400&fit=crop&crop=center",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&h=500&fit=crop&crop=center",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=600&fit=crop&crop=center",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800",
        points: 250,
      },
    ],
  },
  {
    id: "10",
    imageUrl:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
    correctAnswer: "Çiçek",
    options: ["Yaprak", "Çiçek", "Ağaç", "Kelebek"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop&crop=center",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&h=500&fit=crop&crop=center",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=600&fit=crop&crop=center",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
        points: 250,
      },
    ],
  },
];

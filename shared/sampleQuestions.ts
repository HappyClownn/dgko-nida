import type { Question } from './schema';

export const sampleQuestions: Question[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
    correctAnswer: 'Galata Kulesi',
    options: ['Eiffel Kulesi', 'Kız Kulesi', 'Big Ben', 'Galata Kulesi'],
    zoomLevels: [
      {
        level: 4,
        imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=400',
        points: 1000,
      },
      {
        level: 3,
        imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=600',
        points: 750,
      },
      {
        level: 2,
        imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=800',
        points: 500,
      },
      {
        level: 1,
        imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
        points: 250,
      },
    ],
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    correctAnswer: 'Paris',
    options: ['Londra', 'Paris', 'Roma', 'Berlin'],
    zoomLevels: [
      {
        level: 4,
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=400',
        points: 1000,
      },
      {
        level: 3,
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=600',
        points: 750,
      },
      {
        level: 2,
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=800',
        points: 500,
      },
      {
        level: 1,
        imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
        points: 250,
      },
    ],
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    correctAnswer: 'Londra',
    options: ['New York', 'Tokyo', 'Londra', 'Dubai'],
    zoomLevels: [
      {
        level: 4,
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=400',
        points: 1000,
      },
      {
        level: 3,
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=600',
        points: 750,
      },
      {
        level: 2,
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=800',
        points: 500,
      },
      {
        level: 1,
        imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
        points: 250,
      },
    ],
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
    correctAnswer: 'Japonya',
    options: ['Çin', 'Kore', 'Japonya', 'Tayland'],
    zoomLevels: [
      {
        level: 4,
        imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=400',
        points: 1000,
      },
      {
        level: 3,
        imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=600',
        points: 750,
      },
      {
        level: 2,
        imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=800',
        points: 500,
      },
      {
        level: 1,
        imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800',
        points: 250,
      },
    ],
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
    correctAnswer: 'Santorini',
    options: ['Mykonos', 'Santorini', 'Bodrum', 'Malta'],
    zoomLevels: [
      {
        level: 4,
        imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=400',
        points: 1000,
      },
      {
        level: 3,
        imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=600',
        points: 750,
      },
      {
        level: 2,
        imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80&crop=entropy&cs=tinysrgb&fit=crop&h=800',
        points: 500,
      },
      {
        level: 1,
        imageUrl: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
        points: 250,
      },
    ],
  },
];

import type { Question } from "./schema";

// ÖRNEK SORULAR - Gerçek kullanımda her seviye için ayrı fotoğraf yüklenecek
// Seviye 4: En yakın çekim (en anlaşılmaz) - 1000 puan
// Seviye 3: Biraz uzaklaşmış - 750 puan
// Seviye 2: Daha uzak - 500 puan
// Seviye 1: En uzak (en anlaşılır) - 250 puan

export const sampleQuestions: Question[] = [
  {
    id: "1",
    imageUrl: "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904566/allahnida4_kkahgj.png",
    correctAnswer: "Nida Camide",
    options: ["Nida Camide", "Nida Parlarda", "Nida Sınıfta", "Nida Festivalde"],
    zoomLevels: [
      {
        level: 4,
        // En yakın çekim - küçük crop (en anlaşılmaz)
        imageUrl: "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904566/allahnida4_kkahgj.png",
        points: 1000,
      },
      {
        level: 3,
        imageUrl: "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904566/allahnida3_guzclb.png",
        points: 750,
      },
      {
        level: 2,
        imageUrl: "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904564/allahnida2_ervzjz.png",
        points: 500,
      },
      {
        level: 1,
        // En uzak - tam fotoğraf (en anlaşılır)
        imageUrl: "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904559/allahnida1_yoxcqk.jpg",
        points: 0,
      },
    ],
  },
  {
    id: "2",
    imageUrl:
      "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904574/babus4_e7hals.png",
    correctAnswer: "Nida ve Begüm'ün babaların benzerlik",
    options: ["Ozan'ın tabletinden reels", "Kızlar birbirleriyle görüntülü konuşuyor", "Nida ve Begüm'ün babaların benzerlik", "Yılbaşı anısı"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904574/babus4_e7hals.png",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904574/babus3_a2pgyp.png",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904574/babus2_tbych2.png",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904566/babus1_a4m2cg.jpg",
        points: 0,
      },
    ],
  },
  {
    id: "3",
    imageUrl:
      "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904588/ciftokay4_ttkrz5.png",
    correctAnswer: "Nida",
    options: ["Sude", "Nida", "Ozan", "Begüm"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904588/ciftokay4_ttkrz5.png",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904588/ciftokay3_xz9l7x.png",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904586/ciftokay2_akn6kt.png",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904586/cift_okay_vl0c9f.jpg",
        points: 0,
      },
    ],
  },
  {
    id: "4",
    imageUrl:
      "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904498/if4_7_haziran_2024_udiqts.png",
    correctAnswer: "7 haziran 2024",
    options: ["7 haziran 2024", "7 Haziran 2023", "29 Mayıs 2024", "12 Haziran 2023"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904498/if4_7_haziran_2024_udiqts.png",
        points: 3000,
      },
      {
        level: 3,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904492/if3_7_haziran_2024_tg6xg6.png",
        points: 2000,
      },
      {
        level: 2,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904499/if2_7_haziran_2024_eha9wn.png",
        points: 2131,
      },
      {
        level: 1,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904498/if_7_haziran_2024_rxgisf.jpg",
        points: 1000,
      },
    ],
  },
  {
    id: "5",
    imageUrl: "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904554/ikon4_uy7ssk.png",
    correctAnswer: "8",
    options: ["4", "3", "6", "8"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904554/ikon4_uy7ssk.png",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904554/ikon3_xniciz.png",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904554/ikon2_hyy5mn.png",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904589/ikon1_mvtumy.jpg",
        points: 250,
      },
    ],
  },
  {
    id: "6",
    imageUrl:
      "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904469/izmir4_xnjnh0.png",
    correctAnswer: "İzmir",
    options: ["Zonguldak", "İzmir", "Eskişehir", "Ankara"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904469/izmir4_xnjnh0.png",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904465/izmir3_izd9p6.png",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904468/izmir2_ctxh2u.png",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904463/izmir1_an5oom.jpg",
        points: 250,
      },
    ],
  },
  {
    id: "7",
    imageUrl:
      "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904580/jakuzi4_xylgfl.png",
    correctAnswer: "Jakuzi",
    options: ["Plaj", "Doğum Günü", "Parti", "Jakuzi"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904580/jakuzi4_xylgfl.png",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904578/jakuzi3_zjciru.png",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904574/jakuzi2_so8xwh.png",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904572/jakuzi_utxlyj.jpg",
        points: 250,
      },
    ],
  },
  {
    id: "8",
    imageUrl:
      "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904428/mangal4_piqxaf.png",
    correctAnswer: "Mangal",
    options: ["Parlar", "Mangal", "Ankara Üni Sempozyum", "Karnaval"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904428/mangal4_piqxaf.png",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904426/mangal3_n4ejxk.png",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904431/mangal2_pfhnpy.png",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904424/mangal1_tryzzq.jpg",
        points: 250,
      },
    ],
  },
  {
    id: "9",
    imageUrl: "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904531/ordu4_dgwssl.png",
    correctAnswer: "Sıhhiye",
    options: ["Türkiye", "Adalet", "Sıhhiye", "Sıhıye"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904531/ordu4_dgwssl.png",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904534/ordu3_rfaoaa.png",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904532/ordu2_w0poao.png",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904537/ordu_kjcg1j.jpg",
        points: 250,
      },
    ],
  },
  {
    id: "10",
    imageUrl:
      "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904559/tuna4_qpzv0z.png",
    correctAnswer: "Tuna",
    options: ["Tuna", "Ozan", "Alper", "Eren"],
    zoomLevels: [
      {
        level: 4,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904559/tuna4_qpzv0z.png",
        points: 1000,
      },
      {
        level: 3,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904559/tuna3_amoxn2.png",
        points: 750,
      },
      {
        level: 2,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904560/tuna2_pwnvaq.png",
        points: 500,
      },
      {
        level: 1,
        imageUrl:
          "https://res.cloudinary.com/djggnfcxq/image/upload/v1760904553/tuna1_iybi1u.jpg",
        points: 250,
      },
    ],
  },
];

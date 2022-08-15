module.exports = (mongoose) => {
  const SerpPlaces = mongoose.model(
    "serp_maps",
    mongoose.Schema(
      {
        address: String,
        createdAt: Date,
        data_cid: "1629263457097307872",
        data_id: "0x2e69f43aa3d7dce7:0x169c4e7b65cf56e0",
        description:
          "Cozy hangout for coffee & light eats. Mellow neighborhood cafe serving inventive coffee drinks & light fare in a pared-down setting.",
        gps_coordinates: {
          latitude: -6.1867206,
          longitude: 106.8309882,
        },
        hours: "Open ⋅ Closes 8PM",
        open_state: "Open ⋅ Closes 8PM",
        operating_hours: {
          friday: "10AM–8PM",
          saturday: "Closed",
          sunday: "Closed",
          monday: "10AM–8PM",
          tuesday: "10AM–8PM",
          wednesday: "10AM–8PM",
          thursday: "10AM–8PM",
        },
        phone: "+62 858-8344-2466",
        photos_link:
          "https://serpapi.com/search.json?data_id=0x2e69f43aa3d7dce7%3A0x169c4e7b65cf56e0&engine=google_maps_photos&hl=en",
        place_id: "ChIJ59zXozr0aS4R4FbPZXtOnBY",
        place_id_search:
          "https://serpapi.com/search.json?data=%214m5%213m4%211s0x2e69f43aa3d7dce7%3A0x169c4e7b65cf56e0%218m2%213d-6.1867206%214d106.8309882&engine=google_maps&google_domain=google.com&hl=en&type=place",
        position: 1,
        price: "$",
        rating: 4.6,
        reviews: [
          {
            user: {
              name: "Azka Maula",
              link: "https://www.google.com/maps/contrib/103271994980966550446?hl=id&sa=X&ved=2ahUKEwiHqpf8s6_5AhVLBLkGHT5TBlEQvvQBegQIARA-",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucqB9bB7rD3CrUFY8KySfepwFHcKQpBJjehSP2dmBw=s40-c-c0x00000000-cc-rp-mo-ba2-br100",
              local_guide: true,
              reviews: 31,
              photos: 1,
            },
            rating: 5,
            date: "sebulan lalu",
            snippet: "Mantap dan enak",
            images: [
              "https://lh5.googleusercontent.com/p/AF1QipMX0X_u0-ZIquJI9lQ_q-ArsPfceAOJPq9Xc7yH=w100-h100-p-n-k-no",
            ],
            response: {
              date: "sebulan lalu",
              snippet: "Terima kasih kak reviewnya..",
            },
          },
          {
            user: {
              name: "ketandus",
              link: "https://www.google.com/maps/contrib/110659765671662122708?hl=id&sa=X&ved=2ahUKEwiHqpf8s6_5AhVLBLkGHT5TBlEQvvQBegQIARBX",
              thumbnail:
                "https://lh3.googleusercontent.com/a/AItbvmlQp7mCwUaBvyKmA9PwpAfTihwhZFOZpPoDylIt=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 3,
            },
            rating: 5,
            date: "2 bulan lalu",
            snippet: "Kopinya enak, asik buat nugas karna tempatnya cozy bgt",
            likes: 1,
            response: {
              date: "2 bulan lalu",
              snippet:
                "Makasih kak reviewnya.. ditunggu kembali kedatangannya.. 🙏🙏",
            },
          },
          {
            user: {
              name: "Uci Alrasyid",
              link: "https://www.google.com/maps/contrib/103942965128886341037?hl=id&sa=X&ved=2ahUKEwiHqpf8s6_5AhVLBLkGHT5TBlEQvvQBegQIARBt",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucr1LzYMAOjLxOzr3T_YeDWBhQovGiK1r7Duqu7wNw=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 51,
              photos: 12,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet:
              "(Diterjemahkan oleh Google) Kopi di Kalakopi(Asli)Ngopi di Kalakopi",
          },
          {
            user: {
              name: "roger david",
              link: "https://www.google.com/maps/contrib/106903821626664333705?hl=id&sa=X&ved=2ahUKEwiHqpf8s6_5AhVLBLkGHT5TBlEQvvQBegUIARCDAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucpQcOikFKpdLh3B6xvIC-_6QeG1p7EglSOQ7kcSFA=s40-c-c0x00000000-cc-rp-mo-ba2-br100",
              local_guide: true,
              reviews: 2,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "Rio Rendi",
              link: "https://www.google.com/maps/contrib/104098039548639774532?hl=id&sa=X&ved=2ahUKEwiHqpf8s6_5AhVLBLkGHT5TBlEQvvQBegUIARCWAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucpJRoJFo8EwJJ-Q1qLa5PgWzXzSTcL6UFHFSahx-A=s40-c-c0x00000000-cc-rp-mo-ba2-br100",
              local_guide: true,
              reviews: 5,
              photos: 5,
            },
            rating: 3,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "Bagus M W",
              link: "https://www.google.com/maps/contrib/108762659781643668927?hl=id&sa=X&ved=2ahUKEwiHqpf8s6_5AhVLBLkGHT5TBlEQvvQBegUIARCpAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a/AItbvmnT0Ky-1_Yf3URfafFO3sEQ_4_6GfxSzTOtlS-R=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 46,
              photos: 9,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "Tempat enak dan menu ok.",
          },
          {
            user: {
              name: "iyus rahmat",
              link: "https://www.google.com/maps/contrib/114371774977285786590?hl=id&sa=X&ved=2ahUKEwiHqpf8s6_5AhVLBLkGHT5TBlEQvvQBegUIARC_AQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucrT39HPz6CjtN1atKfhr5jGvxfzhtFxRWkcJFbVbWE=s40-c-c0x00000000-cc-rp-mo-ba6-br100",
              local_guide: true,
              reviews: 683,
              photos: 1120,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "Mantap",
          },
          {
            user: {
              name: "Lazuandi Anwar",
              link: "https://www.google.com/maps/contrib/104843449511119814276?hl=id&sa=X&ved=2ahUKEwiHqpf8s6_5AhVLBLkGHT5TBlEQvvQBegUIARDVAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucrp2odPe4RX9MsqGNXF1_KwcysNbaYdjJjZG4bz=s40-c-c0x00000000-cc-rp-mo-ba4-br100",
              local_guide: true,
              reviews: 27,
              photos: 257,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet:
              "(Diterjemahkan oleh Google) Kopi yang enak dan suasana(Asli)Good coffee and ambience",
          },
          {
            user: {
              name: "Lintang Irdia",
              link: "https://www.google.com/maps/contrib/101225165020425808886?hl=id&sa=X&ved=2ahUKEwiHqpf8s6_5AhVLBLkGHT5TBlEQvvQBegUIARDrAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucoxL1ZOBapGWkVfx3HkvWI5MmW-p8Bbb1_BRB-YRZE=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 31,
              photos: 78,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "Best kopi nya",
          },
          {
            user: {
              name: "D H",
              link: "https://www.google.com/maps/contrib/115303697388012114124?hl=id&sa=X&ved=2ahUKEwiHqpf8s6_5AhVLBLkGHT5TBlEQvvQBegUIARCBAg",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucqHo190adJT7lufA_aBAr_jAgXZYv-oPfEql9LuqMg=s40-c-c0x00000000-cc-rp-mo-ba4-br100",
              local_guide: true,
              reviews: 59,
              photos: 141,
            },
            rating: 3,
            date: "2 tahun lalu",
            snippet:
              "(Diterjemahkan oleh Google) Kopi yang enak dengan harga yang wajar. Tempatnya bisa lebih baik. (Asli) Good coffee at fair prices. Place could be better.",
          },
          {
            user: {
              name: "Rueneka Ginting Suka",
              link: "https://www.google.com/maps/contrib/112244029292001258502?hl=id&sa=X&ved=2ahUKEwjGh8D9s6_5AhUJk2oFHaeJB9sQvvQBegQIARA4",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucp-igHciJIyKc9W-xsL1SwQN-nbTK-yXAYsizUGhA8=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 8,
              photos: 6,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "(Diterjemahkan oleh Google) ATAS!(Asli)TOP!",
          },
          {
            user: {
              name: "Yuli istanto",
              link: "https://www.google.com/maps/contrib/117535784906477195658?hl=id&sa=X&ved=2ahUKEwjGh8D9s6_5AhUJk2oFHaeJB9sQvvQBegQIARBO",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucojLP6BLozyqAqPytjaWYARiMmQYeeLSczEFP3MMA=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 36,
              photos: 1,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet:
              "(Diterjemahkan oleh Google) kecil dan menyenangkan(Asli)kecil dan asyik",
          },
          {
            user: {
              name: "Hisyam Kazim",
              link: "https://www.google.com/maps/contrib/107664421802321519907?hl=id&sa=X&ved=2ahUKEwjGh8D9s6_5AhUJk2oFHaeJB9sQvvQBegQIARBk",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucpXQGgNAbTI7JYcl6chOK4oymFcRdR3f0N_Du1nCQ=s40-c-c0x00000000-cc-rp-mo-ba4-br100",
              local_guide: true,
              reviews: 122,
              photos: 210,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet:
              "Tempat favorit menghabiskan weekend. Kopinya enak harga reasonable. Suasana cozy ga terlalu rame, enak buat belajar ato kerja di tengah hiruk pikuk kota. Menu favorit es kalakopi sama nasi goreng smoked beef (beli dua cuma 50rb)",
            likes: 2,
            images: [
              "https://lh5.googleusercontent.com/p/AF1QipNuOH5pGWcJVxnTs3GXGVuO-4giWmpEC_v1dTE2=w100-h100-p-n-k-no",
              "https://lh5.googleusercontent.com/p/AF1QipNL0FOlQyG633VZ0GHrMPm4tOa7ral3n7T-DuyV=w100-h100-p-n-k-no",
            ],
          },
          {
            user: {
              name: "hafidz Chandra",
              link: "https://www.google.com/maps/contrib/108994218772329502339?hl=id&sa=X&ved=2ahUKEwjGh8D9s6_5AhUJk2oFHaeJB9sQvvQBegQIARB9",
              thumbnail:
                "https://lh3.googleusercontent.com/a/AItbvmmNGewT7V14LdM1cLfMQWZ8LW10lrMxmJD3MKyA=s40-c-c0x00000000-cc-rp-mo-br100",
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih kak (Asli) Thank yu kak",
            },
          },
          {
            user: {
              name: "Reynaldi Syahrizal",
              link: "https://www.google.com/maps/contrib/100406610321975540804?hl=id&sa=X&ved=2ahUKEwjGh8D9s6_5AhUJk2oFHaeJB9sQvvQBegUIARCPAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucpF4tQ-tAjf7BjmdpGNMUMt7wcAsm8uSeMB6U8iqQ=s40-c-c0x00000000-cc-rp-mo-ba2-br100",
              local_guide: true,
              reviews: 21,
              photos: 14,
            },
            rating: 4,
            date: "2 tahun lalu",
            snippet:
              "Regal Caramel-nya enak. Tempatnya asik buat kerja, internetnya lumayan cepet.",
            response: {
              date: "2 tahun lalu",
              snippet: "Makasih kak reviewnya..",
            },
          },
          {
            user: {
              name: "Agung Wisnugroho",
              link: "https://www.google.com/maps/contrib/106857163912426506147?hl=id&sa=X&ved=2ahUKEwjGh8D9s6_5AhUJk2oFHaeJB9sQvvQBegUIARClAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucpaytySKe67JERNvzrWO6tk-63xJOR0JQMsfxdZDQ=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 12,
              photos: 20,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet:
              "Es Susu Regal, enak sih, tapi ternyata cuma gitu doang, susu dikasih regal dan syrup. nothing special untuk menu ini. Nasi Ayam Sambel Matahnya enak (ga difoto)",
            response: {
              date: "2 tahun lalu",
              snippet:
                "Yes.. memang biasa tp masih ada yg ngangenin.. #eeaaa makasih kak reviewnya..",
            },
          },
          {
            user: {
              name: "Adiman Tampubolon",
              link: "https://www.google.com/maps/contrib/105906525917539226920?hl=id&sa=X&ved=2ahUKEwjGh8D9s6_5AhUJk2oFHaeJB9sQvvQBegUIARC7AQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucoz67-O3w6kvncLJJl_m-V2BhuJbQ7uMltFjcXz2Q=s40-c-c0x00000000-cc-rp-mo-ba4-br100",
              local_guide: true,
              reviews: 154,
              photos: 40,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "Kalaitu",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Kalakopi .. terima kasih kak (Asli) Kalakopi.. thank yu kak",
            },
          },
          {
            user: {
              name: "Kharisma Paras Meysasi",
              link: "https://www.google.com/maps/contrib/117831086198342637043?hl=id&sa=X&ved=2ahUKEwjGh8D9s6_5AhUJk2oFHaeJB9sQvvQBegUIARDRAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucrLRftjdP-ow86rJ-y10CiM0qp1vGb1tsVk_zL7bw=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 23,
              photos: 41,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "(Diterjemahkan oleh Google) Favorit(Asli)Favorite",
            response: {
              date: "2 tahun lalu",
              snippet:
                "Kalo kami favorite.. berarti kamu dambaan.. #eaaa Mampir lg ya kak.. thank u reviewnya..",
            },
          },
          {
            user: {
              name: "Alifah Melisa",
              link: "https://www.google.com/maps/contrib/114541788777488612038?hl=id&sa=X&ved=2ahUKEwjGh8D9s6_5AhUJk2oFHaeJB9sQvvQBegUIARDnAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucrQeV6-jVee0oOgba3vpqYfZXH_-1V5NQ1oomxPPQ=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 26,
              photos: 112,
            },
            rating: 4,
            date: "2 tahun lalu",
            snippet: "",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih (Asli) Thank yu",
            },
          },
          {
            user: {
              name: "Uul Arif",
              link: "https://www.google.com/maps/contrib/117846842618354961692?hl=id&sa=X&ved=2ahUKEwjGh8D9s6_5AhUJk2oFHaeJB9sQvvQBegUIARD6AQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucoA6I7vIsMK2cCnaWjrFwhY6q-uTVEygJQmiKVElw=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 9,
              photos: 2,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet:
              "Favorit banget sih ini.. kopinya enak, minuman lain enak, makanannya enak, pas sampe kasir juga enak..soalnya ga mahal, hehehe... Tinggal Toilet sama tempat solatnya aja yah agak dipercantik pasti makin de best dah",
            response: {
              date: "2 tahun lalu",
              snippet: "Makasih kak reviewnya",
            },
          },
          {
            user: {
              name: "Repsy Dimas",
              link: "https://www.google.com/maps/contrib/110393275347860950101?hl=id&sa=X&ved=2ahUKEwiriM7-s6_5AhXeEGIAHToWAIsQvvQBegQIARA4",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucqaiXkmX7wmw-qdR8MgN2mEnxHFkQxmvNU3sD_30w=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 7,
              photos: 152,
            },
            rating: 4,
            date: "2 tahun lalu",
            snippet:
              "Mayan lah, dori nya enak, ga amis, seger. Recommended buat nongkrong2 bentar. Ada wifinya",
            response: {
              date: "2 tahun lalu",
              snippet: "Wow reviewnya.. makasih ya kak.. mampir lagi yukk..",
            },
          },
          {
            user: {
              name: "Indra Ibrahim",
              link: "https://www.google.com/maps/contrib/109926445698209637297?hl=id&sa=X&ved=2ahUKEwiriM7-s6_5AhXeEGIAHToWAIsQvvQBegQIARBO",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucqBJOzbg0Ub5ReeuIdl7mFmAKX9Kr-g1I1HlYwWpr8=s40-c-c0x00000000-cc-rp-mo-ba4-br100",
              local_guide: true,
              reviews: 38,
              photos: 381,
            },
            rating: 4,
            date: "2 tahun lalu",
            snippet: "",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih (Asli) Thank yu",
            },
          },
          {
            user: {
              name: "Mario Kemes",
              link: "https://www.google.com/maps/contrib/106956224474137669355?hl=id&sa=X&ved=2ahUKEwiriM7-s6_5AhXeEGIAHToWAIsQvvQBegQIARBh",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucqi6wBiV6VWmWnUrjVioWJohTQBGk5puae8efn3nA=s40-c-c0x00000000-cc-rp-mo-ba4-br100",
              local_guide: true,
              reviews: 8,
              photos: 218,
            },
            rating: 3,
            date: "2 tahun lalu",
            snippet: "",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih (Asli) Thank yu",
            },
          },
          {
            user: {
              name: "POPPY R",
              link: "https://www.google.com/maps/contrib/116608537378791353426?hl=id&sa=X&ved=2ahUKEwiriM7-s6_5AhXeEGIAHToWAIsQvvQBegQIARB0",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucrBWuesx7j_g6rPJWTJ_qix4TdW9124CLmaN99DE_Y=s40-c-c0x00000000-cc-rp-mo-ba6-br100",
              local_guide: true,
              reviews: 705,
              photos: 2947,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet:
              "Meskipun di pinggir jalan dan area perkantoran tapi tenang. Dekat dgn stasiun gondangdia. Buka sangat pagi. Kopinya enak ☺️",
            images: [
              "https://lh5.googleusercontent.com/p/AF1QipO5J0eXuK6b79r4w-TZkDmTvHXbWbvpATG9QjJN=w100-h100-p-n-k-no",
              "https://lh5.googleusercontent.com/p/AF1QipMqCbhht-yi0pr1kWqRB6pozMccXTIV3TlkT4aU=w100-h100-p-n-k-no",
            ],
            response: {
              date: "2 tahun lalu",
              snippet: "Makasih kakak",
            },
          },
          {
            user: {
              name: "Henry Jaya",
              link: "https://www.google.com/maps/contrib/102605110836333426426?hl=id&sa=X&ved=2ahUKEwiriM7-s6_5AhXeEGIAHToWAIsQvvQBegUIARCNAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucqUR1eftmUVLp_8f52sOjnJh3Eg-0NeJDhHuqPHMQ=s40-c-c0x00000000-cc-rp-mo-ba5-br100",
              local_guide: true,
              reviews: 315,
              photos: 696,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "Quite good place",
            likes: 1,
            response: {
              date: "2 tahun lalu",
              snippet: "Makasih kak..",
            },
          },
          {
            user: {
              name: "Benedicta Yolanda",
              link: "https://www.google.com/maps/contrib/114149948261992068520?hl=id&sa=X&ved=2ahUKEwiriM7-s6_5AhXeEGIAHToWAIsQvvQBegUIARCjAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucpBVXEyr4luU82lsYc66eaTiLHQWe7su8FO-8ecxg=s40-c-c0x00000000-cc-rp-mo-br100",
            },
            rating: 4,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "Monica Eva (monicaeva19)",
              link: "https://www.google.com/maps/contrib/114677127533388984156?hl=id&sa=X&ved=2ahUKEwiriM7-s6_5AhXeEGIAHToWAIsQvvQBegUIARC1AQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucq9qQG4Ka2Spz0epC_gqIE4R9b8toqLQXbqaen-Nw=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 1,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "eko liangdita",
              link: "https://www.google.com/maps/contrib/100149365751795894262?hl=id&sa=X&ved=2ahUKEwiriM7-s6_5AhXeEGIAHToWAIsQvvQBegUIARDIAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a/AItbvmkGWytNfouDg9BR4SBUWWN5fd0ITYJR400rUpDA=s40-c-c0x00000000-cc-rp-mo-ba2-br100",
              local_guide: true,
              reviews: 8,
              photos: 18,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "Wahyoe Kartiko",
              link: "https://www.google.com/maps/contrib/101576293911515598042?hl=id&sa=X&ved=2ahUKEwiriM7-s6_5AhXeEGIAHToWAIsQvvQBegUIARDbAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucqL9a45OY0VWFJvB0FFaW_Bo8GjOHHNDM0FXuXx=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 5,
            },
            rating: 4,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "Heriansyah Putra",
              link: "https://www.google.com/maps/contrib/100374529616914320083?hl=id&sa=X&ved=2ahUKEwiriM7-s6_5AhXeEGIAHToWAIsQvvQBegUIARDuAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucpcavFhe09WfyDiSsNX4TfdE0AIl84e6vPw9aXrww=s40-c-c0x00000000-cc-rp-mo-ba2-br100",
              local_guide: true,
              reviews: 3,
              photos: 1,
            },
            rating: 4,
            date: "2 tahun lalu",
            snippet: "Tepat di pinggir jalan raya, jadi gampang dicari nya",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) terima kasih kak (Asli) Thank you kak",
            },
          },
          {
            user: {
              name: "Heriansyah Putra",
              link: "https://www.google.com/maps/contrib/109739490661225590001?hl=id&sa=X&ved=2ahUKEwi7wv_-s6_5AhWIL1kFHUMQDnAQvvQBegQIARA4",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucoF_iPKFU-gFdjV8fbjKOhntsbu_T4eMngyu4JhcdQ=s40-c-c0x00000000-cc-rp-mo-ba4-br100",
              local_guide: true,
              reviews: 44,
              photos: 62,
            },
            rating: 4,
            date: "2 tahun lalu",
            snippet:
              "Tempat tidak terlalu besar namun nyaman, di pinggir jalan raya jadi gampang dicari",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih sis .. mampir lagi .. (Asli) Thank you kak.. mampir lagi yuk..",
            },
          },
          {
            user: {
              name: "Fitriana Irwanty",
              link: "https://www.google.com/maps/contrib/115997883461399301486?hl=id&sa=X&ved=2ahUKEwi7wv_-s6_5AhWIL1kFHUMQDnAQvvQBegQIARBO",
              thumbnail:
                "https://lh3.googleusercontent.com/a/AItbvmnWeyYjBLW3_X1UMCSDKFny3NsJ3xUykHewhbQ6=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 47,
              photos: 20,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "Rally Aprilia",
              link: "https://www.google.com/maps/contrib/117928066912440227819?hl=id&sa=X&ved=2ahUKEwi7wv_-s6_5AhWIL1kFHUMQDnAQvvQBegQIARBh",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucqD2Il06lYu3BwPqZXWjQiaSWtOTgqTw1lRQXXODA=s40-c-c0x00000000-cc-rp-mo-ba4-br100",
              local_guide: true,
              reviews: 75,
              photos: 329,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "Ibnu Darmana",
              link: "https://www.google.com/maps/contrib/105423711340428294076?hl=id&sa=X&ved=2ahUKEwi7wv_-s6_5AhWIL1kFHUMQDnAQvvQBegQIARB0",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucrfgdvcmW92XgQezoGsSqZSEIBBCDBfCXjt4_ODv7g=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 47,
              photos: 53,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "ika trisnawati",
              link: "https://www.google.com/maps/contrib/116053403180812629750?hl=id&sa=X&ved=2ahUKEwi7wv_-s6_5AhWIL1kFHUMQDnAQvvQBegUIARCHAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucqk8Bztn2AjhbLwlWbghd3JEQrwc6ZI2a1m53xI=s40-c-c0x00000000-cc-rp-mo-ba4-br100",
              local_guide: true,
              reviews: 136,
              photos: 142,
            },
            rating: 4,
            date: "2 tahun lalu",
            snippet: "Kopi ny enak, suasana nya adem",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih sis .. mampir lagi .. (Asli) Thank you kak.. mampir lagi yuk..",
            },
          },
          {
            user: {
              name: "puspa ayu wulandari",
              link: "https://www.google.com/maps/contrib/112451891674844226259?hl=id&sa=X&ved=2ahUKEwi7wv_-s6_5AhWIL1kFHUMQDnAQvvQBegUIARCdAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZuco-4f-2GG1-2rIUnek7nyhK9r6Klsi7VtnhpZ1XLg=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 63,
              photos: 20,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "Kopinya enak, tmptnya juga bs buat nyepi dr keramaian.",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih sis .. mampir lagi .. (Asli) Thank you kak.. mampir lagi yuk..",
            },
          },
          {
            user: {
              name: "risca ramadhona",
              link: "https://www.google.com/maps/contrib/103156024599151776512?hl=id&sa=X&ved=2ahUKEwi7wv_-s6_5AhWIL1kFHUMQDnAQvvQBegUIARCzAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucooUJ4-hG_hiQc6-2TYvFU0mimMfGG7bccIPVTH=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 1,
              photos: 34,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "Rikardo R Limbong",
              link: "https://www.google.com/maps/contrib/110792168788892657811?hl=id&sa=X&ved=2ahUKEwi7wv_-s6_5AhWIL1kFHUMQDnAQvvQBegUIARDGAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a/AItbvmkKJqWPvbWfatxcdpiiHqPW0dpUpaF_wuo7_js9=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 24,
              photos: 15,
            },
            rating: 3,
            date: "2 tahun lalu",
            snippet: "Bersih",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih sis .. mampir lagi .. (Asli) Thank you kak.. mampir lagi yuk..",
            },
          },
          {
            user: {
              name: "Vaibhav Bhargava",
              link: "https://www.google.com/maps/contrib/109846272543862432218?hl=id&sa=X&ved=2ahUKEwi7wv_-s6_5AhWIL1kFHUMQDnAQvvQBegUIARDcAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucrdtIP5tOZ0yRn7MnvtaXWCEnB-vrRLR1kskmQhC9M=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 3,
              photos: 3,
            },
            rating: 3,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "Rudi Muliyono",
              link: "https://www.google.com/maps/contrib/104016388294870527695?hl=id&sa=X&ved=2ahUKEwi7wv_-s6_5AhWIL1kFHUMQDnAQvvQBegUIARDvAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucqOEwE-rT4Chk4hsflrj6NbepEVr5XZzP5Tp02xsIo=s40-c-c0x00000000-cc-rp-mo-ba5-br100",
              local_guide: true,
              reviews: 356,
              photos: 1119,
            },
            rating: 4,
            date: "2 tahun lalu",
            snippet:
              "(Diterjemahkan oleh Google) Kecil namun nyaman dan cukup dihiasi. (Asli) Small yet cozy and nicely decorated enough.",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih sis .. mampir lagi .. (Asli) Thank you kak.. mampir lagi yuk..",
            },
          },
          {
            user: {
              name: "Iman Firmansyah",
              link: "https://www.google.com/maps/contrib/110326877395182009999?hl=id&sa=X&ved=2ahUKEwi3t-b_s6_5AhVf7rsIHaP9BTMQvvQBegQIARA4",
              thumbnail:
                "https://lh3.googleusercontent.com/a/AItbvmmNdWSHvxs7leFYNGvKURqepv4UiM4nnEekOPD5=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 1,
              photos: 85,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
            images: [
              "https://lh5.googleusercontent.com/p/AF1QipPmf9j-LIhRBzx9MmcFzSkH9VL3GDkz5BIgD6sr=w100-h100-p-n-k-no",
              "https://lh5.googleusercontent.com/p/AF1QipMnhZS-99-GGT5cSdD61j7ZVpU_4Fn8ocyxcc6M=w100-h100-p-n-k-no",
              "https://lh5.googleusercontent.com/p/AF1QipP0IOlFDrIODCAAF9JaKJl5msHMjkmxEsIFCtsn=w100-h100-p-n-k-no",
            ],
          },
          {
            user: {
              name: "Irabilla Putri",
              link: "https://www.google.com/maps/contrib/100195279563684038829?hl=id&sa=X&ved=2ahUKEwi3t-b_s6_5AhVf7rsIHaP9BTMQvvQBegQIARBP",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucomm4thcZmschTcSSnoFuTQchxeURX-Ua-tLyz2oQ=s40-c-c0x00000000-cc-rp-mo-ba4-br100",
              local_guide: true,
              reviews: 46,
              photos: 88,
            },
            rating: 4,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "arlini Putri",
              link: "https://www.google.com/maps/contrib/110720999035597583058?hl=id&sa=X&ved=2ahUKEwi3t-b_s6_5AhVf7rsIHaP9BTMQvvQBegQIARBi",
              thumbnail:
                "https://lh3.googleusercontent.com/a/AItbvmlpzxc60bGY4s4PU36josyF9uvFCJNYYYaopGJS=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 38,
              photos: 1,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet:
              "Tempat bagus, cireng ya enak, kopinya enak, tehnya enak, nasgornya mantap",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih sis .. mampir lagi .. (Asli) Thank you kak.. mampir lagi yuk..",
            },
          },
          {
            user: {
              name: "Puteri Fadhilah",
              link: "https://www.google.com/maps/contrib/103205604575615582426?hl=id&sa=X&ved=2ahUKEwi3t-b_s6_5AhVf7rsIHaP9BTMQvvQBegQIARB4",
              thumbnail:
                "https://lh3.googleusercontent.com/a/AItbvmlvHnLvOBJY9ZBybYZNsrX2kRg0pbogZ6FTo_TM=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 16,
              photos: 15,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet:
              "Makanan dan minumannya enak-enak. Kalo kesini wajib cobain cheeserengnya, cireng pake topping keju gitu, super enak!",
            likes: 1,
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih sis .. mampir lagi .. (Asli) Thank you kak.. mampir lagi yuk..",
            },
          },
          {
            user: {
              name: "Nurul Fadhila",
              link: "https://www.google.com/maps/contrib/100700643504159513403?hl=id&sa=X&ved=2ahUKEwi3t-b_s6_5AhVf7rsIHaP9BTMQvvQBegUIARCOAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucp_50uVcPpmmBzM_qYUy1PUhkCFsBUj29RI7bxcjQ=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 12,
              photos: 2,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "kiki pm",
              link: "https://www.google.com/maps/contrib/109414139088320055425?hl=id&sa=X&ved=2ahUKEwi3t-b_s6_5AhVf7rsIHaP9BTMQvvQBegUIARChAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a/AItbvmnkXgJvjQEkfWUX7aOTi7EmjOIlnYZD-L4b2CCf=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 41,
              photos: 5,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "Bernadetha Ayu",
              link: "https://www.google.com/maps/contrib/116193675361218374706?hl=id&sa=X&ved=2ahUKEwi3t-b_s6_5AhVf7rsIHaP9BTMQvvQBegUIARC0AQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucrR71AOqm8PZQ7LG56a46k55bUfCOXBBN6P4VQ_=s40-c-c0x00000000-cc-rp-mo-ba3-br100",
              local_guide: true,
              reviews: 24,
              photos: 11,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "Must try: Kalakopi Susu & Cheese Cireng",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih sis .. mampir lagi .. (Asli) Thank you kak.. mampir lagi yuk..",
            },
          },
          {
            user: {
              name: "Ria Tumimomor",
              link: "https://www.google.com/maps/contrib/104414386563217103080?hl=id&sa=X&ved=2ahUKEwi3t-b_s6_5AhVf7rsIHaP9BTMQvvQBegUIARDKAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucrABXKoE3hsqjblbjNNPrRiQWmeOh_RFEUEHKoAcsY=s40-c-c0x00000000-cc-rp-mo-ba6-br100",
              local_guide: true,
              reviews: 420,
              photos: 2378,
            },
            rating: 3,
            date: "2 tahun lalu",
            snippet:
              "Cari tempatnya butuh perjuangan. Saya mengira tempatnya kecil tapi begitu masuk ternyata luas juga. Pesan kopsus dan iseng coba ikan dori sambal matah lengkap dengan nasi. Ikan dori gorengnya saya suka, fresh, digoreng crunchy. Tapi sambal matahnya, IMHO biasa saja, tidak pedas. Kopi susunya okelah walau buat selera saya kurang creamy.",
            images: [
              "https://lh5.googleusercontent.com/p/AF1QipNBw2tVJkwtMz5Uo1QzeTWoAT30u50flIiVALP4=w100-h100-p-n-k-no",
              "https://lh5.googleusercontent.com/p/AF1QipObCqu1f84ercXwK6O2c1n1kbqWJx6MZixVrCkS=w100-h100-p-n-k-no",
              "https://lh5.googleusercontent.com/p/AF1QipOQkAm7kFzXrOKLWugz-npSnJTAJcu7JWj63ivz=w100-h100-p-n-k-no",
              "https://lh5.googleusercontent.com/p/AF1QipMWmdkn95GrJORvUlKaacAebOHEkxD4ybBhtMo4=w100-h100-p-n-k-no",
            ],
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih sis .. mampir lagi .. (Asli) Thank you kak.. mampir lagi yuk..",
            },
          },
          {
            user: {
              name: "Risca Ramadhona",
              link: "https://www.google.com/maps/contrib/113038200573466210114?hl=id&sa=X&ved=2ahUKEwi3t-b_s6_5AhVf7rsIHaP9BTMQvvQBegUIARDlAQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucroaKcOgkOhYGfiypKRKGiao1wEKAeoeGwIPQYMPdA=s40-c-c0x00000000-cc-rp-mo-ba6-br100",
              local_guide: true,
              reviews: 503,
              photos: 3280,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet: "",
          },
          {
            user: {
              name: "Kebunnya_Nian",
              link: "https://www.google.com/maps/contrib/104056653510643833516?hl=id&sa=X&ved=2ahUKEwi3t-b_s6_5AhVf7rsIHaP9BTMQvvQBegUIARD4AQ",
              thumbnail:
                "https://lh3.googleusercontent.com/a-/AFdZucp_3y9cOPC0ppRqjrMstEWKyV0J4I9ds4csqKH9-g=s40-c-c0x00000000-cc-rp-mo-br100",
              reviews: 2,
            },
            rating: 5,
            date: "2 tahun lalu",
            snippet:
              "(Diterjemahkan oleh Google) Tempat yang bagus untuk minum kopi (Asli) Great place for getting coffee",
            response: {
              date: "2 tahun lalu",
              snippet:
                "(Diterjemahkan oleh Google) Terima kasih sis .. mampir lagi .. (Asli) Thank you kak.. mampir lagi yuk..",
            },
          },
        ],
        reviews_link:
          "https://serpapi.com/search.json?data_id=0x2e69f43aa3d7dce7%3A0x169c4e7b65cf56e0&engine=google_maps_reviews&hl=en",
        service_options: {
          dine_in: true,
          takeout: true,
          no_contact_delivery: true,
        },
        thumbnail:
          "https://lh5.googleusercontent.com/p/AF1QipNptAeL362c1baWlFFGVQviy012YQXgqmnOHgNZ=w163-h92-k-no",
        title: "SGNG coffee shop",
        type: "Coffee shop",
        updatedAt: {
          $date: {
            $numberLong: "1659692403951",
          },
        },
        photos: [
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipNptAeL362c1baWlFFGVQviy012YQXgqmnOHgNZ=w203-h114-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipNptAeL362c1baWlFFGVQviy012YQXgqmnOHgNZ=w4000-h2252-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipMOdfbAfjHEsWecsAHQlTQ3aBOQUftjQ2W5UoaY=w203-h164-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMOdfbAfjHEsWecsAHQlTQ3aBOQUftjQ2W5UoaY=w2048-h1660-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipNDzGZS2ziOklDex1R_S7l7LqcA8nXYYF636G_r=w203-h203-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipNDzGZS2ziOklDex1R_S7l7LqcA8nXYYF636G_r=w2048-h2048-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipPBjD1_rRAlt4dRG4xdXNCW2wesIfdFym0-OpQh=w203-h152-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipPBjD1_rRAlt4dRG4xdXNCW2wesIfdFym0-OpQh=w4032-h3024-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipMX0X_u0-ZIquJI9lQ_q-ArsPfceAOJPq9Xc7yH=w203-h152-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMX0X_u0-ZIquJI9lQ_q-ArsPfceAOJPq9Xc7yH=w4032-h3024-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipM8YlXRbehJJbjIhL4SlSW57TorZWwJiCprqURD=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipM8YlXRbehJJbjIhL4SlSW57TorZWwJiCprqURD=w2750-h3667-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipNUNMbSkEguPbev08MlUuvmI5WC8cxDNUxWewX2=w203-h203-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipNUNMbSkEguPbev08MlUuvmI5WC8cxDNUxWewX2=w3456-h3456-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipNfUIBri3bHftmHrBYCAZYw902JvKZyM339zY8d=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipNfUIBri3bHftmHrBYCAZYw902JvKZyM339zY8d=w3456-h4608-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipNSx-FfP_nPPayAFKGGnMOTW-w2J6ylIIqUZzg2=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipNSx-FfP_nPPayAFKGGnMOTW-w2J6ylIIqUZzg2=w3024-h4032-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipM1EBzODxSQ4cgBWAF4tzMSNy23-3dK5bVPsfky=w203-h152-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipM1EBzODxSQ4cgBWAF4tzMSNy23-3dK5bVPsfky=w4032-h3024-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipN1YFndc3v-Rqw1FDyC8AxiYYZMxJl3FfrVMAAz=w203-h152-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipN1YFndc3v-Rqw1FDyC8AxiYYZMxJl3FfrVMAAz=w4032-h3024-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipMHMeVG_uvZRUHlXvNaYHeyXOnf3TlbaJRNh_ox=w203-h360-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMHMeVG_uvZRUHlXvNaYHeyXOnf3TlbaJRNh_ox=w2160-h3840-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipO_MqDppZPJB_ppO3hUWB7T2DGP1UGUuvObL8Jw=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipO_MqDppZPJB_ppO3hUWB7T2DGP1UGUuvObL8Jw=w3456-h4608-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipN7v4Ipzsq_O-ZG6rnbuSIFNlMRy9530y_Sfbjc=w203-h203-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipN7v4Ipzsq_O-ZG6rnbuSIFNlMRy9530y_Sfbjc=w1921-h1921-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipNNz5rLCeDkDqbxW_qurRK0RoSpkLYeSO80V7fG=w203-h135-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipNNz5rLCeDkDqbxW_qurRK0RoSpkLYeSO80V7fG=w1776-h1184-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipO_bT0vAcbjXqK97s_6-6vpPGZZ-zm5qMaOLlAK=w203-h152-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipO_bT0vAcbjXqK97s_6-6vpPGZZ-zm5qMaOLlAK=w4032-h3024-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipOIHTUOIbNPdVc8LJc2nkVL-X3MiOXYEeXIZSkA=w203-h429-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipOIHTUOIbNPdVc8LJc2nkVL-X3MiOXYEeXIZSkA=w1968-h4160-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipOP5z28Xjk6B16QqL0JZ0SOMb7ZZDeKdYt3RW8k=w203-h114-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipOP5z28Xjk6B16QqL0JZ0SOMb7ZZDeKdYt3RW8k=w4096-h2304-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipMaTxru0hRpKq3tUZ3oLRTPhkINXs0WDTE_23Tf=w203-h203-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMaTxru0hRpKq3tUZ3oLRTPhkINXs0WDTE_23Tf=w3024-h3024-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipOKCH-Po_NeexTYpW1gJaRf1yeJp2gJ_DxeHsEL=w203-h114-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipOKCH-Po_NeexTYpW1gJaRf1yeJp2gJ_DxeHsEL=w4032-h2268-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipNeLAVvc7xlpCBn3p-Pz5HPOWz1rGtw-CMhJHMO=w203-h114-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipNeLAVvc7xlpCBn3p-Pz5HPOWz1rGtw-CMhJHMO=w4608-h2592-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipNjF67i7iaKvqAPizXwPzv9-eDKrxs9PDPPe3l-=w203-h235-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipNjF67i7iaKvqAPizXwPzv9-eDKrxs9PDPPe3l-=w2268-h2628-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipOAP0UEXpsR6nYpA6xJRFvAEql1QlPA6UjaIaGo=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipOAP0UEXpsR6nYpA6xJRFvAEql1QlPA6UjaIaGo=w3456-h4608-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipOQkAm7kFzXrOKLWugz-npSnJTAJcu7JWj63ivz=w203-h304-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipOQkAm7kFzXrOKLWugz-npSnJTAJcu7JWj63ivz=w2688-h4032-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipNfXhu3ZF7F_7FL4al65xE1XD5iya1p2mzOgQEL=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipNfXhu3ZF7F_7FL4al65xE1XD5iya1p2mzOgQEL=w3456-h4608-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipO0Qm1TyAq-D-ndHBwsIr_tYrkc5B9xge8YBM19=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipO0Qm1TyAq-D-ndHBwsIr_tYrkc5B9xge8YBM19=w3120-h4160-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipPESkV6nbK4p5YWSOSX7GETo5hv55q8dAJJWUSl=w211-h100-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipPESkV6nbK4p5YWSOSX7GETo5hv55q8dAJJWUSl=w4032-h1908-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipPsI5Bz8gmKlH7zWw3PN8L2FsK6Y0L2BLz3_zHi=w203-h152-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipPsI5Bz8gmKlH7zWw3PN8L2FsK6Y0L2BLz3_zHi=w4128-h3096-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipMqs14ZdLTf2Fg_L7YEbIbXpgtuJjzMC-5bi0Eb=w203-h360-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMqs14ZdLTf2Fg_L7YEbIbXpgtuJjzMC-5bi0Eb=w1440-h2560-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipPr4NLQGtH0MEaejtJCJOu27V3kGvSMxMdhc_fl=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipPr4NLQGtH0MEaejtJCJOu27V3kGvSMxMdhc_fl=w3456-h4608-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipPUKrZo9cMc4b7wDumdqt4O3rsW9cmlgytKGgb9=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipPUKrZo9cMc4b7wDumdqt4O3rsW9cmlgytKGgb9=w3024-h4032-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipOVyGCNKID5esC8dKEZIJ629rHTesbYBJKlQyVd=w203-h152-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipOVyGCNKID5esC8dKEZIJ629rHTesbYBJKlQyVd=w4032-h3024-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipNtt9bf8u5XXVKCQ5Vo-p6od4-DI7bzbGDtSPbB=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipNtt9bf8u5XXVKCQ5Vo-p6od4-DI7bzbGDtSPbB=w3096-h4128-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipMRaqfmwCmt0BdWCNHEDnLxjuJFA30esMgaFPoI=w203-h203-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMRaqfmwCmt0BdWCNHEDnLxjuJFA30esMgaFPoI=w2304-h2304-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipPPlE4tKfES-wLqzuHtWaUbtEADG-bAKCLGv0jG=w203-h360-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipPPlE4tKfES-wLqzuHtWaUbtEADG-bAKCLGv0jG=w1080-h1920-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipMfisiA2ub_GxWSGi2STUPIXSbIok6gP2aJNlTH=w203-h135-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMfisiA2ub_GxWSGi2STUPIXSbIok6gP2aJNlTH=w1776-h1184-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipMjdzgv4sg50anoj99IfVS1J3dYVyLSjEnATK8K=w203-h152-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMjdzgv4sg50anoj99IfVS1J3dYVyLSjEnATK8K=w4160-h3120-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipMyP30r2Cyjqltq46zFp9C0Zc6Vu0iGHfmrfkCL=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipMyP30r2Cyjqltq46zFp9C0Zc6Vu0iGHfmrfkCL=w3024-h4032-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipPcxbYzJI58qw53w0Fzn4HoNUnSQTnJVC3LscqU=w203-h417-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipPcxbYzJI58qw53w0Fzn4HoNUnSQTnJVC3LscqU=w1960-h4032-k-no",
          },
          {
            thumbnail:
              "https://lh5.googleusercontent.com/p/AF1QipNFxQpjrf7DjQjXzVmZIL_TUG0yRcal1ZqndjIQ=w203-h270-k-no",
            image:
              "https://lh5.googleusercontent.com/p/AF1QipNFxQpjrf7DjQjXzVmZIL_TUG0yRcal1ZqndjIQ=w3096-h4128-k-no",
          },
        ],
      },
      { timestamps: true }
    )
  );
  return SerpPlaces;
};
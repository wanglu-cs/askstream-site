// Generated from reviewed benchmark annotations by scripts/build_examples.py.
window.ASKSTREAM_EXAMPLES = [
  {
    "id": "kvem",
    "code": "KVEM",
    "title": "Key Visual Evidence Missing",
    "group": "Video uncertainty",
    "category": "Explicit information",
    "scene": "Burrito ingredients behind visual masks",
    "sourceId": "KVEM_000018",
    "sourceDataset": "COIN",
    "sourceUrl": "",
    "videoSrc": "assets/examples/kvem/video.mp4",
    "duration": 40.874167,
    "sourceDuration": 40.907533,
    "simulated": false,
    "turns": [
      {
        "id": "KVEM_000018_turn_000001",
        "start": 0.0,
        "end": 19.452767,
        "ask": 12.145467,
        "askEnd": 19.452767,
        "answer": null,
        "answerEnd": null,
        "windows": {
          "waiting": {
            "start_s": 0.0,
            "end_s": 12.1121,
            "start_frame": 0,
            "end_frame": 363
          },
          "asking": {
            "start_s": 12.145467,
            "end_s": 19.452767,
            "start_frame": 364,
            "end_frame": 583
          },
          "answering": null
        },
        "query": "When the person starts scooping out the black beans with a spoon, tell me what is in the bowl to the right of the chili pepper at the lower left of the burrito.",
        "actionOptions": [
          "Request a clear view of the object beside the person's wrist and nearest the forearm.",
          "Request a clear view of the object beyond the person's wrist at the near edge of the dark work area.",
          "Request a clear view of the object at the near edge of the work area, in front of the large round base.",
          "Request a clear view of the object partially cropped by the screen edge opposite the person's arm.",
          "Request a clear view of the object near the top edge of the work area, beyond the large round base.",
          "Request a clear view of the object centered on the large round base beside the central filling.",
          "Request a clear view of the object resting over the person's forearm near the top border."
        ],
        "answerOptions": [
          "lemon wedges",
          "avocado slices",
          "lime wedges",
          "cucumber wedges",
          "green apple slices"
        ],
        "correctAction": 2,
        "correctActions": [
          2
        ],
        "correctAnswer": 2,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "",
        "historicalPreference": null,
        "videoSrc": "assets/examples/kvem/video.mp4",
        "evidence": [
          {
            "kind": "video",
            "src": "assets/examples/kvem/evidence-reveal.mp4",
            "synchronized": true
          }
        ],
        "answerImages": []
      },
      {
        "id": "KVEM_000018_turn_000002",
        "start": 19.486133,
        "end": 40.874167,
        "ask": 29.863167,
        "askEnd": 40.874167,
        "answer": null,
        "answerEnd": null,
        "windows": {
          "waiting": {
            "start_s": 19.486133,
            "end_s": 29.8298,
            "start_frame": 584,
            "end_frame": 894
          },
          "asking": {
            "start_s": 29.863167,
            "end_s": 40.874167,
            "start_frame": 895,
            "end_frame": 1225
          },
          "answering": null
        },
        "query": "When the man starts putting white cheese on the burrito, tell me what is in the bowl surrounded by chili peppers in the lower-right corner of the frame.",
        "actionOptions": [
          "Request a clear view of the masked item along the outer edge, adjacent to both the white sauce dish and the rice-filled dish.",
          "Request a clear view of the masked item along the left edge, between the chip-filled dish and the bean-filled dish.",
          "Request a clear view of the masked item just inside the work area, beside the bean-filled dish and closest to its handle.",
          "Request a clear view of the masked item between the bean-filled dish and the red sauce dish, near the wrap's edge.",
          "Request a clear view of the masked item along the top edge, between the chip-filled dish and the man's forearm.",
          "Request a clear view of the masked item between the red sauce dish and the rice-filled dish, near the work area's edge.",
          "Request a clear view of the masked item near the center of the wrap, beside the man's wrist and exposed filling."
        ],
        "answerOptions": [
          "diced yellow bell peppers",
          "chickpeas",
          "corn kernels",
          "shredded cheddar cheese",
          "diced mango"
        ],
        "correctAction": 0,
        "correctActions": [
          0
        ],
        "correctAnswer": 2,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "",
        "historicalPreference": null,
        "videoSrc": "assets/examples/kvem/video.mp4",
        "evidence": [
          {
            "kind": "video",
            "src": "assets/examples/kvem/evidence-reveal.mp4",
            "synchronized": true
          }
        ],
        "answerImages": []
      }
    ],
    "poster": "assets/examples/kvem/poster.jpg"
  },
  {
    "id": "vim",
    "code": "VIM",
    "title": "Viewpoint Information Missing",
    "group": "Video uncertainty",
    "category": "Explicit information",
    "scene": "A bicycle workshop from multiple cameras",
    "sourceId": "VIM_000022",
    "sourceDataset": "EgoExo-4D",
    "sourceUrl": null,
    "videoSrc": "assets/examples/vim/views-view_005.mp4",
    "duration": 45.0,
    "sourceDuration": 127.033333,
    "simulated": false,
    "turns": [
      {
        "id": "VIM_000022_turn_000001",
        "start": 0.0,
        "end": 27.033333,
        "ask": 17.666667,
        "askEnd": 26.033333,
        "answer": null,
        "answerEnd": null,
        "windows": {
          "waiting": {
            "start_s": 0.0,
            "end_s": 17.666667,
            "start_frame": 0,
            "end_frame": 530
          },
          "asking": {
            "start_s": 17.666667,
            "end_s": 26.033333,
            "start_frame": 530,
            "end_frame": 781
          },
          "answering": null
        },
        "query": "When he has lifted that large plastic water jug with both hands from under the table, tell me what is mounted on the wall above the metal-frame folding table with the black backpack on it in this room?",
        "actionOptions": [
          "Please give me the view of a downward-facing camera position over the foreground tabletop, with the rear wall and table visible in the background but the upper wall region above that table cut off and outside the field of view.",
          "Please give me the view of the near interior from a fixed diagonal line of sight, with the right-hand wall and floor filling most of the frame, a far opening on the left, and the requested upper-wall region outside the field of view.",
          "Please give me the view of the fixed camera looking across the room toward the far wall, with the upper-left section of that wall above the midground furnishings clearly visible and unobstructed.",
          "Please give me the view of the room from a wide position facing the back wall, with the folding table in the right half of the frame and the wall area directly above it clearly visible."
        ],
        "answerOptions": [
          "A wall clock",
          "An air conditioner",
          "A television",
          "An electric fan"
        ],
        "correctAction": 2,
        "correctActions": [
          2,
          3
        ],
        "correctAnswer": 1,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "",
        "historicalPreference": null,
        "videoSrc": "assets/examples/vim/views-view_005.mp4",
        "evidence": [
          {
            "kind": "video",
            "src": "assets/examples/vim/views-view_003.mp4",
            "synchronized": true
          },
          {
            "kind": "video",
            "src": "assets/examples/vim/views-view_004.mp4",
            "synchronized": true
          }
        ],
        "answerImages": []
      },
      {
        "id": "VIM_000022_turn_000002",
        "start": 27.033333,
        "end": 45.0,
        "ask": 41.333333,
        "askEnd": 45.0,
        "answer": null,
        "answerEnd": null,
        "windows": {
          "waiting": {
            "start_s": 27.033333,
            "end_s": 41.333333,
            "start_frame": 811,
            "end_frame": 1240
          },
          "asking": {
            "start_s": 41.333333,
            "end_s": 45.0,
            "start_frame": 1240,
            "end_frame": 1350
          },
          "answering": null
        },
        "query": "When he has picked up the slender brush from the workbench, tell me what color the board on the wall behind him with two white sheets of paper pinned to it is?",
        "actionOptions": [
          "Please give me the view of a fixed camera positioned broadly in front of the work area and looking toward the back wall, with the upper central wall region visible beyond the foreground obstruction, the left edge partly occupied by a nearby figure, and the lower central wall area largely occluded.",
          "Please give me the view of the room from a front-facing camera position, with a wide line of sight toward the interior, where the central wall area is largely occluded by the person and bicycle and only the surrounding wall regions remain visible.",
          "Please give me the view of the near-left vantage looking diagonally across the space toward the far-right background, with the upper-left wall region reduced to a narrow sliver at the frame edge and mostly outside the field of view.",
          "Please give me the view of the elevated camera position facing diagonally across the workbench toward the rear wall, with the upper-left wall region behind the person partially occluded and near the top edge of the frame."
        ],
        "answerOptions": [
          "Brown",
          "Gray",
          "Green",
          "Blue"
        ],
        "correctAction": 0,
        "correctActions": [
          0
        ],
        "correctAnswer": 0,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "",
        "historicalPreference": null,
        "videoSrc": "assets/examples/vim/views-view_001.mp4",
        "evidence": [
          {
            "kind": "video",
            "src": "assets/examples/vim/views-view_002.mp4",
            "synchronized": true
          }
        ],
        "answerImages": []
      }
    ],
    "poster": "assets/examples/vim/poster.jpg"
  },
  {
    "id": "icm",
    "code": "ICM",
    "title": "Individual Concept Missing",
    "group": "Video uncertainty",
    "category": "Implicit information",
    "scene": "Recognizing a user-defined character",
    "sourceId": "ICM_000006",
    "sourceDataset": "PEARL",
    "sourceUrl": null,
    "videoSrc": "assets/examples/icm/video.mp4",
    "duration": 120.833,
    "sourceDuration": 1384.583333,
    "simulated": false,
    "turns": [
      {
        "id": "ICM_000006_turn_000001",
        "start": 0,
        "end": 120.833,
        "ask": 91,
        "askEnd": 100.5,
        "answer": 100.5,
        "answerEnd": 120.833,
        "windows": {
          "waiting": {
            "start_s": 0,
            "end_s": 91,
            "start_frame": 0,
            "end_frame": 2184
          },
          "asking": {
            "start_s": 91,
            "end_s": 100.5,
            "start_frame": 2184,
            "end_frame": 2412
          },
          "answering": {
            "start_s": 100.5,
            "end_s": 120.833,
            "start_frame": 2412,
            "end_frame": 2900
          }
        },
        "query": "When {Edgar} is riding a horse as it gallops across the grassy slope, tell me what color this horse is?",
        "actionOptions": [
          "Is it true that the character with slim young human with tan skin, spiky dark-brown hair, dark eyebrows, and brown eyes is {Edgar}?",
          "Is it true that the character with slim young human with tan skin, straight pale-blond hair, dark eyebrows, and brown eyes is {Edgar}?",
          "Is it true that the character with slim young human with tan skin, spiky pale-blond hair, dark eyebrows, and brown eyes is {Edgar}?",
          "Is it true that the character with slim young human with pale skin, spiky pale-blond hair, dark eyebrows, and brown eyes is {Edgar}?"
        ],
        "answerOptions": [
          "Black",
          "Pink",
          "White",
          "Yellow"
        ],
        "correctAction": 2,
        "correctActions": [
          2
        ],
        "correctAnswer": 0,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "[CONCEPT DEFINITION 1/1]\nAlias: {Edgar}\nOriginal definition question:\nThis character is my friend, named {Edgar}. Please remember this name. From now on, regardless of who this character might be in real life or in any media, you must refer to them as {Edgar}.",
        "historicalPreference": null,
        "videoSrc": "assets/examples/icm/video.mp4",
        "evidence": [
          {
            "kind": "image",
            "src": "assets/examples/icm/evidence-turn_000001-image_001.jpg.webp",
            "synchronized": false
          }
        ],
        "answerImages": []
      }
    ],
    "poster": "assets/examples/icm/poster.jpg"
  },
  {
    "id": "pacm",
    "code": "PACM",
    "title": "Personalized Action Concept Missing",
    "group": "Video uncertainty",
    "category": "Implicit information",
    "scene": "Matching a personalized movement definition",
    "sourceId": "PACM_000001",
    "sourceDataset": "Blender",
    "sourceUrl": null,
    "videoSrc": "assets/examples/pacm/video.mp4",
    "duration": 150.0,
    "sourceDuration": 150.0,
    "simulated": false,
    "turns": [
      {
        "id": "PACM_000001_turn_000001",
        "start": 0.0,
        "end": 150.0,
        "ask": 0.0,
        "askEnd": 35.0,
        "answer": 35.0,
        "answerEnd": 150.0,
        "windows": {
          "waiting": null,
          "asking": {
            "start_s": 0.0,
            "end_s": 35.0,
            "start_frame": 0,
            "end_frame": 840
          },
          "answering": {
            "start_s": 35.0,
            "end_s": 150.0,
            "start_frame": 840,
            "end_frame": 3600
          }
        },
        "query": "When you have watched the characters in the video complete their full actions for the first time, tell me: Who performs the action referred to as 'Qorvani' in this video?",
        "actionOptions": [
          "Does 'Qorvani' require a backward weight shift, a right knee lift, and bringing the left foot back, in that order?",
          "Does 'Qorvani' require a right side step, opening both arms at mid height, and a right crossover step, in that order?",
          "Does 'Qorvani' require a forward torso lean, a low left-arm sweep, and opening both hands, in that order?",
          "Does 'Qorvani' require circling the right wrist, folding both elbows, and a brief pause, in that order?"
        ],
        "answerOptions": [
          "The person initially on the far left",
          "The person initially second from the left",
          "The person initially on the far right",
          "The person initially third from the left"
        ],
        "correctAction": 1,
        "correctActions": [
          1
        ],
        "correctAnswer": 0,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "",
        "historicalPreference": null,
        "videoSrc": "assets/examples/pacm/video.mp4",
        "evidence": [
          {
            "kind": "video",
            "src": "assets/examples/pacm/evidence-turn_000001-video.mp4",
            "synchronized": false
          }
        ],
        "answerImages": []
      }
    ],
    "poster": "assets/examples/pacm/poster.jpg"
  },
  {
    "id": "auq",
    "code": "AUQ",
    "title": "Ambiguous User Question",
    "group": "User uncertainty",
    "category": "User intent",
    "scene": "Identifying the intended conference speaker",
    "sourceId": "AUQ_000014",
    "sourceDataset": "youtube",
    "sourceUrl": "https://www.youtube.com/watch?v=Bg8onIl-_VU",
    "videoSrc": "assets/examples/auq/video.mp4",
    "duration": 85.16,
    "sourceDuration": 210.92,
    "simulated": false,
    "turns": [
      {
        "id": "AUQ_000014_turn_000001",
        "start": 34.0,
        "end": 69.0,
        "ask": 34.0,
        "askEnd": 47.2,
        "answer": 47.2,
        "answerEnd": 49.28,
        "windows": {
          "waiting": null,
          "asking": {
            "start_s": 34.0,
            "end_s": 47.2,
            "start_frame": 850,
            "end_frame": 1180
          },
          "answering": {
            "start_s": 47.2,
            "end_s": 49.28,
            "start_frame": 1180,
            "end_frame": 1232
          }
        },
        "query": "Tell me when the person sitting in a white chair starts giving a speech.",
        "actionOptions": [
          "I need to know whether the seated person is wearing formal clothing.",
          "I need to know whether the seated person has a conference lanyard.",
          "I need to know whether the seated person is male or female.",
          "I need to know whether the seated person has dark hair.",
          "I need to know what color chair the seated person occupies.",
          "I need to know whether the seated person is looking sideways."
        ],
        "answerOptions": [],
        "correctAction": 2,
        "correctActions": [
          2
        ],
        "correctAnswer": null,
        "answerMode": "open",
        "referenceAnswer": "Giving a speech.",
        "userReply": "The woman.\n\nThe exact reminder message is: Giving a speech.",
        "historicalPreference": null,
        "videoSrc": "assets/examples/auq/video.mp4",
        "evidence": [],
        "answerImages": []
      },
      {
        "id": "AUQ_000014_turn_000002",
        "start": 69.0,
        "end": 85.16,
        "ask": 69.0,
        "askEnd": 83.28,
        "answer": 83.28,
        "answerEnd": 85.16,
        "windows": {
          "waiting": null,
          "asking": {
            "start_s": 69.0,
            "end_s": 83.28,
            "start_frame": 1725,
            "end_frame": 2082
          },
          "answering": {
            "start_s": 83.28,
            "end_s": 85.16,
            "start_frame": 2082,
            "end_frame": 2129
          }
        },
        "query": "Tell me when the man in a suit begins speaking: \"He has started speaking.\"",
        "actionOptions": [
          "I need to know the color and pattern of the panelist's tie.",
          "I need to know what hair length the seated panelist has.",
          "I need to know what color chair the seated panelist occupies.",
          "I need to know what color shirt the seated panelist wears.",
          "I need to know whether the seated panelist is wearing a lanyard.",
          "I need to know what color suit jacket the panelist wears."
        ],
        "answerOptions": [],
        "correctAction": 0,
        "correctActions": [
          0
        ],
        "correctAnswer": null,
        "answerMode": "open",
        "referenceAnswer": "He has started speaking.",
        "userReply": "He wears a navy tie with white polka dots.\n\nThe exact reminder message is: He has started speaking.",
        "historicalPreference": null,
        "videoSrc": "assets/examples/auq/video.mp4",
        "evidence": [],
        "answerImages": []
      }
    ],
    "poster": "assets/examples/auq/poster.jpg"
  },
  {
    "id": "wuq",
    "code": "WUQ",
    "title": "Wrong User Question",
    "group": "User uncertainty",
    "category": "User intent",
    "scene": "Correcting a false premise in a cooking video",
    "sourceId": "WUQ_000026",
    "sourceDataset": "StreamingBench",
    "sourceUrl": null,
    "videoSrc": "assets/examples/wuq/video.mp4",
    "duration": 78.411667,
    "sourceDuration": 343.426417,
    "simulated": false,
    "turns": [
      {
        "id": "WUQ_000026_turn_000001",
        "start": 0.0,
        "end": 78.411667,
        "ask": 62.5625,
        "askEnd": 78.411667,
        "answer": null,
        "answerEnd": null,
        "windows": {
          "waiting": {
            "start_s": 0.0,
            "end_s": 62.5625,
            "start_frame": 0,
            "end_frame": 1500
          },
          "asking": {
            "start_s": 62.5625,
            "end_s": 78.411667,
            "start_frame": 1500,
            "end_frame": 1880
          },
          "answering": null
        },
        "query": "When the woman wearing magenta-pink clothing, whose top has long sleeves, has finished using tongs to move the noodles beside the stovetop, what is she holding?",
        "actionOptions": [
          "Actually, her magenta-pink top has short sleeves.",
          "Actually, she is wearing a long-sleeved magenta-pink top.",
          "Actually, her magenta-pink top has elbow-length sleeves.",
          "Actually, her magenta-pink top has three-quarter-length sleeves.",
          "Actually, her magenta-pink top has rolled-up long sleeves.",
          "Actually, her magenta-pink top is sleeveless."
        ],
        "answerOptions": [
          "A spatula.",
          "A spoon.",
          "An olive oil bottle.",
          "A whisk."
        ],
        "correctAction": 5,
        "correctActions": [
          5
        ],
        "correctAnswer": 2,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "You have corrected it successfully. Actually, her magenta-pink top is sleeveless. My question is: When the woman wearing magenta-pink clothing has finished using tongs to move the noodles beside the stovetop, what is she holding?",
        "historicalPreference": null,
        "videoSrc": "assets/examples/wuq/video.mp4",
        "evidence": [],
        "answerImages": []
      }
    ],
    "poster": "assets/examples/wuq/poster.jpg"
  },
  {
    "id": "upm",
    "code": "UPM",
    "title": "User Preference Missing",
    "group": "User uncertainty",
    "category": "User preference",
    "scene": "Choosing outfits after asking about preferences",
    "sourceId": "UPM_000020",
    "sourceDataset": "YouTube",
    "sourceUrl": null,
    "videoSrc": "assets/examples/upm/video.mp4",
    "duration": 249.16,
    "sourceDuration": 252.2,
    "simulated": false,
    "turns": [
      {
        "id": "UPM_000020_turn_000001",
        "start": 0.0,
        "end": 79.08,
        "ask": 0.0,
        "askEnd": 66.96,
        "answer": 66.96,
        "answerEnd": 73.04,
        "windows": {
          "waiting": null,
          "asking": {
            "start_s": 0.0,
            "end_s": 66.96,
            "start_frame": 0,
            "end_frame": 1674
          },
          "answering": {
            "start_s": 66.96,
            "end_s": 73.04,
            "start_frame": 1674,
            "end_frame": 1826
          }
        },
        "query": "When large “outfit 6” text appears in the center and the model changes into a white shirt with a khaki slit midi skirt, tell me which of all the outfits shown so far suits you best?",
        "actionOptions": [
          "What footwear color would you prefer with the outfit?",
          "How much midriff exposure would you prefer in the outfit?",
          "Would you prefer the outfit styled with a black crossbody bag?",
          "What sleeve decoration would you prefer on the outfit's top?",
          "Would you prefer loose-fitting pants as the outfit's bottom?",
          "Would you prefer a button-front top in the outfit?"
        ],
        "answerOptions": [
          "Blue fuzzy cardigan, white wide-leg cargo pants, and black crossbody bag.",
          "Light gray ribbed sweater with white loose cargo pants.",
          "Black floral-sleeved cardigan with gray-green wide-leg cargo pants.",
          "Cropped white shirt with gray-green cargo pants and black handbag.",
          "Cropped white blouse, loose black pants, and black crossbody bag.",
          "Cropped white shirt with khaki slit midi skirt."
        ],
        "correctAction": 3,
        "correctActions": [
          3
        ],
        "correctAnswer": 2,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "I prefer white floral sleeve graphics.",
        "historicalPreference": null,
        "videoSrc": "assets/examples/upm/video.mp4",
        "evidence": [],
        "answerImages": [
          "assets/examples/upm/evidence-turn_000001-option_001.jpg.webp",
          "assets/examples/upm/evidence-turn_000001-option_002.jpg.webp",
          "assets/examples/upm/evidence-turn_000001-option_003.jpg.webp",
          "assets/examples/upm/evidence-turn_000001-option_004.jpg.webp",
          "assets/examples/upm/evidence-turn_000001-option_005.jpg.webp",
          "assets/examples/upm/evidence-turn_000001-option_006.jpg.webp"
        ]
      },
      {
        "id": "UPM_000020_turn_000002",
        "start": 79.08,
        "end": 166.6,
        "ask": 79.08,
        "askEnd": 149.16,
        "answer": 149.16,
        "answerEnd": 159.64,
        "windows": {
          "waiting": null,
          "asking": {
            "start_s": 79.08,
            "end_s": 149.16,
            "start_frame": 1977,
            "end_frame": 3729
          },
          "answering": {
            "start_s": 149.16,
            "end_s": 159.64,
            "start_frame": 3729,
            "end_frame": 3991
          }
        },
        "query": "When the large \"outfit 12\" caption appears in the center and the model changes into an all-black look with a knitted cardigan and wide-leg cargo trousers, tell me which of all the outfits shown so far suits you best?",
        "actionOptions": [
          "Which overall outfit palette do you prefer: light neutral or all black?",
          "Which trouser silhouette do you prefer: wide-leg, tapered, or balloon-shaped?",
          "How much midriff exposure do you prefer from the top?",
          "Which top construction do you prefer: button-front, pullover, or fitted T-shirt?",
          "Which trouser color do you prefer: light gray, white, or black?",
          "Which footwear look do you prefer: light athletic shoes or something darker?"
        ],
        "answerOptions": [
          "Cropped white V-neck blouse with light gray pleated wide-leg trousers",
          "Oversized beige ribbed sweater with light gray wide-leg trousers",
          "Cropped white fitted T-shirt with light gray pleated trousers",
          "Cropped white T-shirt with white balloon-leg drawstring trousers",
          "Black ribbed sweater with black wide-leg cargo trousers",
          "Black graphic cardigan, cropped camisole, and black cargo trousers"
        ],
        "correctAction": 3,
        "correctActions": [
          3
        ],
        "correctAnswer": 0,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "I prefer a cropped button-front design with a V neckline.",
        "historicalPreference": null,
        "videoSrc": "assets/examples/upm/video.mp4",
        "evidence": [],
        "answerImages": [
          "assets/examples/upm/evidence-turn_000002-option_001.jpg.webp",
          "assets/examples/upm/evidence-turn_000002-option_002.jpg.webp",
          "assets/examples/upm/evidence-turn_000002-option_003.jpg.webp",
          "assets/examples/upm/evidence-turn_000002-option_004.jpg.webp",
          "assets/examples/upm/evidence-turn_000002-option_005.jpg.webp",
          "assets/examples/upm/evidence-turn_000002-option_006.jpg.webp"
        ]
      },
      {
        "id": "UPM_000020_turn_000003",
        "start": 166.6,
        "end": 249.16,
        "ask": 166.6,
        "askEnd": 239.56,
        "answer": 239.56,
        "answerEnd": 249.16,
        "windows": {
          "waiting": null,
          "asking": {
            "start_s": 166.6,
            "end_s": 239.56,
            "start_frame": 4165,
            "end_frame": 5989
          },
          "answering": {
            "start_s": 239.56,
            "end_s": 249.16,
            "start_frame": 5989,
            "end_frame": 6229
          }
        },
        "query": "When the large \"outfit 18\" subtitle appears in the middle and the model changes into a black chunky-knit sweater with olive-green cargo pants, tell me which of all the outfits shown so far suits you best?",
        "actionOptions": [
          "Which sleeve length do you prefer for this outfit?",
          "Do you prefer cargo trousers or jeans for this look?",
          "Which top color do you prefer among the outfits shown?",
          "How much midriff coverage do you prefer in an outfit?",
          "What visible head accessory do you prefer with the outfit?",
          "Which footwear style do you prefer with these outfits?"
        ],
        "answerOptions": [
          "Gray ribbed collared sweater, navy cargo trousers, and white sneakers.",
          "Black cropped buttoned top, black wide cargo trousers, and white sneakers.",
          "Beige ribbed sweater, black loose trousers, and white sneakers.",
          "White cropped T-shirt, dark blue wide-leg jeans, pale slip-on shoes.",
          "White camisole, dark blue straight-leg jeans, and pale slip-on shoes.",
          "Black chunky ribbed sweater, olive cargo trousers, dark sneakers, and headphones."
        ],
        "correctAction": 4,
        "correctActions": [
          4
        ],
        "correctAnswer": 5,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "I prefer over-ear headphones.",
        "historicalPreference": null,
        "videoSrc": "assets/examples/upm/video.mp4",
        "evidence": [],
        "answerImages": [
          "assets/examples/upm/evidence-turn_000003-option_001.jpg.webp",
          "assets/examples/upm/evidence-turn_000003-option_002.jpg.webp",
          "assets/examples/upm/evidence-turn_000003-option_003.jpg.webp",
          "assets/examples/upm/evidence-turn_000003-option_004.jpg.webp",
          "assets/examples/upm/evidence-turn_000003-option_005.jpg.webp",
          "assets/examples/upm/evidence-turn_000003-option_006.jpg.webp"
        ]
      }
    ],
    "poster": "assets/examples/upm/poster.jpg"
  },
  {
    "id": "upc",
    "code": "UPC",
    "title": "User Preference Conflict",
    "group": "User uncertainty",
    "category": "User preference",
    "scene": "Updating dining-chair preferences after moving",
    "sourceId": "UPC_000047",
    "sourceDataset": "YouTube",
    "sourceUrl": null,
    "videoSrc": "assets/examples/upc/video.mp4",
    "duration": 110.2,
    "sourceDuration": 153.533333,
    "simulated": false,
    "turns": [
      {
        "id": "UPC_000047_turn_000001",
        "start": 0.0,
        "end": 35.5,
        "ask": 0.0,
        "askEnd": 30.0,
        "answer": 30.0,
        "answerEnd": 35.5,
        "windows": {
          "waiting": null,
          "asking": {
            "start_s": 0.0,
            "end_s": 30.0,
            "start_frame": 0,
            "end_frame": 900
          },
          "answering": {
            "start_s": 30.0,
            "end_s": 35.5,
            "start_frame": 900,
            "end_frame": 1065
          }
        },
        "query": "When the backgrounds on both sides turn blue-gray with marble veining and a dark-brown wooden chair with curved vertical back bars appears, now that you have moved from a narrow dining nook to a larger dining room, tell me which of all the dining chairs shown so far best suits you?",
        "actionOptions": [
          "What wood tone do you currently prefer: light, warm, or dark brown?",
          "Which central backrest design do you currently prefer: straight slats or hourglass-shaped splat?",
          "Do you currently prefer bare wooden seats or padded upholstery?",
          "Which top-rail contour do you currently favor: straight, arched, or subtly curved?",
          "Do you currently want armless dining chairs or chairs with armrests?",
          "What leg profile do you currently favor: straight-sided, tapered, or curved?"
        ],
        "answerOptions": [
          "Reddish-brown wooden chairs with three straight back slats and gold inlay.",
          "Light-brown wooden chairs with geometric segmented center backrests.",
          "Dark-brown wooden ladder-back chairs with oval cutout handles.",
          "Warm-brown wooden chairs with single hourglass-shaped central back splats.",
          "Orange-brown wooden chairs with five narrow vertical back slats.",
          "Light-brown wooden chairs with three curved horizontal back rails.",
          "Dark-brown wooden chairs with curved vertical bars and square accents."
        ],
        "correctAction": 1,
        "correctActions": [
          1
        ],
        "correctAnswer": 3,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "I currently prefer a single hourglass-shaped central back splat.",
        "historicalPreference": "I preferred three full-height straight vertical back slats.\nMy former narrow dining nook led me to prefer a sparse three-slat backrest pattern; I have moved from a narrow dining nook to a larger dining room.",
        "videoSrc": "assets/examples/upc/video.mp4",
        "evidence": [],
        "answerImages": [
          "assets/examples/upc/evidence-turn_000001-option_001.jpg.webp",
          "assets/examples/upc/evidence-turn_000001-option_002.jpg.webp",
          "assets/examples/upc/evidence-turn_000001-option_003.jpg.webp",
          "assets/examples/upc/evidence-turn_000001-option_004.jpg.webp",
          "assets/examples/upc/evidence-turn_000001-option_005.jpg.webp",
          "assets/examples/upc/evidence-turn_000001-option_006.jpg.webp",
          "assets/examples/upc/evidence-turn_000001-option_007.jpg.webp"
        ]
      },
      {
        "id": "UPC_000047_turn_000002",
        "start": 35.5,
        "end": 75.5,
        "ask": 35.5,
        "askEnd": 70.5,
        "answer": 70.5,
        "answerEnd": 75.1,
        "windows": {
          "waiting": null,
          "asking": {
            "start_s": 35.5,
            "end_s": 70.5,
            "start_frame": 1065,
            "end_frame": 2115
          },
          "answering": {
            "start_s": 70.5,
            "end_s": 75.1,
            "start_frame": 2115,
            "end_frame": 2253
          }
        },
        "query": "When the title card reading “Wooden Dining Chairs With Arms” appears, now that you have moved and no longer have your old light-wood dining table, tell me which of all the dining chairs shown so far suits you best?",
        "actionOptions": [
          "What chair finish do you currently prefer: natural, dark brown, or light gray?",
          "Do you currently prefer vertical slats or a solid-panel chair back?",
          "Do you currently want an upholstered seat or a bare solid seat?",
          "Do you currently prefer dining chairs with arms or without arms?",
          "Do you currently want straight front legs or visibly curved front legs?",
          "Do you prefer a straight top rail or a visibly curved top rail?"
        ],
        "answerOptions": [
          "Pair of light natural-wood chairs with tall vertical-slat backs.",
          "Pair of dark reddish-brown chairs with vertical-slat backs.",
          "Pair of medium-brown chairs with broad split-panel backs.",
          "Pair of medium-brown chairs with curved rails and openwork backs.",
          "Pair of honey-brown chairs with oval openwork backs and curved legs.",
          "Pair of reddish-brown chairs with slats and woven-look upper panels.",
          "Pair of light gray painted chairs with slatted backs and curved seats."
        ],
        "correctAction": 0,
        "correctActions": [
          0
        ],
        "correctAnswer": 6,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "I now prefer a light gray painted finish.",
        "historicalPreference": "I preferred a light natural-wood finish.\nMy former dining area had a light natural-wood table that I needed chairs to match; I have moved and no longer have my old light-wood dining table.",
        "videoSrc": "assets/examples/upc/video.mp4",
        "evidence": [],
        "answerImages": [
          "assets/examples/upc/evidence-turn_000002-option_001.jpg.webp",
          "assets/examples/upc/evidence-turn_000002-option_002.jpg.webp",
          "assets/examples/upc/evidence-turn_000002-option_003.jpg.webp",
          "assets/examples/upc/evidence-turn_000002-option_004.jpg.webp",
          "assets/examples/upc/evidence-turn_000002-option_005.jpg.webp",
          "assets/examples/upc/evidence-turn_000002-option_006.jpg.webp",
          "assets/examples/upc/evidence-turn_000002-option_007.jpg.webp"
        ]
      },
      {
        "id": "UPC_000047_turn_000003",
        "start": 75.5,
        "end": 110.2,
        "ask": 75.5,
        "askEnd": 105.5,
        "answer": 105.5,
        "answerEnd": 110.2,
        "windows": {
          "waiting": null,
          "asking": {
            "start_s": 75.5,
            "end_s": 105.5,
            "start_frame": 2265,
            "end_frame": 3165
          },
          "answering": {
            "start_s": 105.5,
            "end_s": 110.2,
            "start_frame": 3165,
            "end_frame": 3306
          }
        },
        "query": "When the title card reading “Upholstered Chair with Wooden Back” appears, now that you have moved from a dining nook with a low window behind the table to a room with high windows, tell me which of all the dining chairs shown so far is best for you?",
        "actionOptions": [
          "Which visible wood-tone family do you currently prefer for the chairs?",
          "Do you currently prefer dining chairs with or without armrests?",
          "What seat surface style do you currently prefer: upholstered or bare?",
          "What backrest slat orientation and contour do you currently prefer?",
          "Do you currently prefer straight or curved front-leg profiles?",
          "Do you prefer matching chair pairs or single-chair presentations?"
        ],
        "answerOptions": [
          "Pair of reddish-brown armchairs with compact straight vertical-slat wooden backs.",
          "Pair of gray-brown armchairs with curved horizontal ladder backs.",
          "Pair of burgundy wooden armchairs with tall geometric open backs.",
          "Pair of rustic brown armchairs with tall straight vertical-slat backs.",
          "Pair of medium-brown armchairs with low open rectangular backs.",
          "Pair of orange-brown armchairs with tall narrow vertical-slat backs."
        ],
        "correctAction": 3,
        "correctActions": [
          3
        ],
        "correctAnswer": 1,
        "answerMode": "choice",
        "referenceAnswer": null,
        "userReply": "I now prefer a curved horizontal-slat backrest.",
        "historicalPreference": "I preferred a compact, straight vertical-slat backrest.\nMy former dining nook had a low window directly behind the table; I have moved to a dining room with high windows.",
        "videoSrc": "assets/examples/upc/video.mp4",
        "evidence": [],
        "answerImages": [
          "assets/examples/upc/evidence-turn_000003-option_001.jpg.webp",
          "assets/examples/upc/evidence-turn_000003-option_002.jpg.webp",
          "assets/examples/upc/evidence-turn_000003-option_003.jpg.webp",
          "assets/examples/upc/evidence-turn_000003-option_004.jpg.webp",
          "assets/examples/upc/evidence-turn_000003-option_005.jpg.webp",
          "assets/examples/upc/evidence-turn_000003-option_006.jpg.webp"
        ]
      }
    ],
    "poster": "assets/examples/upc/poster.jpg"
  }
];

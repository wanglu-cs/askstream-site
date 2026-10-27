// Illustrative demo data. All timings, options, and multi-turn continuations are simulated.
// Replace each case videoSrc and turns with final annotations when available.
window.ASKSTREAM_EXAMPLES = [
  {
    "id": "kvem",
    "title": "Key Visual Evidence Missing",
    "code": "KVEM",
    "group": "Video uncertainty",
    "category": "Explicit information",
    "scene": "Coffee preparation",
    "videoSrc": null,
    "duration": 270,
    "simulated": true,
    "turns": [
      {
        "id": "kvem-1",
        "start": 0,
        "ask": 22,
        "askEnd": 32,
        "answer": 62,
        "end": 84,
        "query": "After the ground coffee is poured into the container, tell me how full the container is.",
        "actionOptions": [
          "Answer immediately without requesting additional information.",
          "Please reveal the blurred container beside the coffee grinder.",
          "Reveal the clock on the wall.",
          "Clarify the color of the kitchen cabinet."
        ],
        "answerOptions": [
          "Slightly more than half full.",
          "About one-third full.",
          "Nearly full.",
          "Completely empty."
        ],
        "correctAction": 1,
        "correctAnswer": 1,
        "userReply": "Here is a clear view of the container."
      },
      {
        "id": "kvem-2",
        "start": 90,
        "ask": 112,
        "askEnd": 122,
        "answer": 152,
        "end": 174,
        "query": "When she picks up the measuring spoon, tell me the quantity marked on its handle.",
        "actionOptions": [
          "Tell me your preferred coffee brand.",
          "Answer immediately without requesting additional information.",
          "Please show the measurement marking on the spoon clearly.",
          "Show the rear counter instead."
        ],
        "answerOptions": [
          "Two tablespoons.",
          "Half a teaspoon.",
          "One tablespoon.",
          "One teaspoon."
        ],
        "correctAction": 2,
        "correctAnswer": 2,
        "userReply": "The spoon handle is now visible."
      },
      {
        "id": "kvem-3",
        "start": 180,
        "ask": 202,
        "askEnd": 212,
        "answer": 242,
        "end": 264,
        "query": "After she places the packet next to the mug, tell me the brand on the packet.",
        "actionOptions": [
          "Show the label on the milk bottle.",
          "Clarify which mug you prefer.",
          "Answer immediately without requesting additional information.",
          "Please remove the blur from the packet beside the mug."
        ],
        "answerOptions": [
          "Daily Blend.",
          "Mountain Coffee.",
          "Sunrise Beans.",
          "Morning Roast."
        ],
        "correctAction": 3,
        "correctAnswer": 3,
        "userReply": "The packet label has been revealed."
      }
    ]
  },
  {
    "id": "vim",
    "title": "Viewpoint Information Missing",
    "code": "VIM",
    "group": "Video uncertainty",
    "category": "Explicit information",
    "scene": "Multi-view cooking",
    "videoSrc": null,
    "duration": 270,
    "simulated": true,
    "turns": [
      {
        "id": "vim-1",
        "start": 0,
        "ask": 22,
        "askEnd": 32,
        "answer": 62,
        "end": 84,
        "query": "When the egg mixture is poured into the pan, tell me the color of the container lid in the sink.",
        "actionOptions": [
          "Answer immediately without requesting additional information.",
          "Switch to the overhead view that fully shows the sink.",
          "Keep the initial view beside the stove.",
          "Show the far end of the kitchen."
        ],
        "answerOptions": [
          "Red.",
          "Blue.",
          "Yellow.",
          "Green."
        ],
        "correctAction": 1,
        "correctAnswer": 1,
        "userReply": "The overhead sink view is now available."
      },
      {
        "id": "vim-2",
        "start": 90,
        "ask": 112,
        "askEnd": 122,
        "answer": 152,
        "end": 174,
        "query": "When she puts the tray down, tell me how many bowls are behind it.",
        "actionOptions": [
          "Zoom in on the oven display.",
          "Answer immediately without requesting additional information.",
          "Switch to the side view that reveals the space behind the tray.",
          "Move to the view behind the refrigerator."
        ],
        "answerOptions": [
          "Two bowls.",
          "Four bowls.",
          "Three bowls.",
          "One bowl."
        ],
        "correctAction": 2,
        "correctAnswer": 2,
        "userReply": "Here is the requested side view."
      },
      {
        "id": "vim-3",
        "start": 180,
        "ask": 202,
        "askEnd": 212,
        "answer": 242,
        "end": 264,
        "query": "When the cupboard opens, tell me which shelf holds the red plate.",
        "actionOptions": [
          "Use the view of the sink.",
          "Ask for the cook’s favorite color.",
          "Answer immediately without requesting additional information.",
          "Switch to a front-facing view of the cupboard interior."
        ],
        "answerOptions": [
          "The top shelf.",
          "The bottom shelf.",
          "There is no red plate.",
          "The middle shelf."
        ],
        "correctAction": 3,
        "correctAnswer": 3,
        "userReply": "The cupboard is now visible from the front."
      }
    ]
  },
  {
    "id": "icm",
    "title": "Individual Concept Missing",
    "code": "ICM",
    "group": "Video uncertainty",
    "category": "Implicit information",
    "scene": "Personalized character recognition",
    "videoSrc": null,
    "duration": 270,
    "simulated": true,
    "turns": [
      {
        "id": "icm-1",
        "start": 0,
        "ask": 6,
        "askEnd": 16,
        "answer": 62,
        "end": 84,
        "query": "When the bottle is on the table in front of Charity, tell me what is inside it.",
        "actionOptions": [
          "Answer immediately without requesting additional information.",
          "Please identify which person is Charity.",
          "Ask which drink the user prefers.",
          "Request a clearer view of the table legs."
        ],
        "answerOptions": [
          "Alcohol.",
          "Juice.",
          "Milk.",
          "Coffee."
        ],
        "correctAction": 1,
        "correctAnswer": 1,
        "userReply": "Charity is the person on the right."
      },
      {
        "id": "icm-2",
        "start": 90,
        "ask": 96,
        "askEnd": 106,
        "answer": 152,
        "end": 174,
        "query": "When Buddy comes back into the room, tell me what Buddy is holding.",
        "actionOptions": [
          "Ask for the meaning of “comes back”.",
          "Answer immediately without requesting additional information.",
          "Please show me who you call Buddy.",
          "Clarify the color of the room."
        ],
        "answerOptions": [
          "A cup.",
          "A bag.",
          "A book.",
          "A phone."
        ],
        "correctAction": 2,
        "correctAnswer": 2,
        "userReply": "Buddy is the person wearing the green jacket."
      },
      {
        "id": "icm-3",
        "start": 180,
        "ask": 186,
        "askEnd": 196,
        "answer": 242,
        "end": 264,
        "query": "When Noni and Charity sit together, tell me who is closer to the window.",
        "actionOptions": [
          "Ask for the user’s seating preference.",
          "Request the name of the room.",
          "Answer immediately without requesting additional information.",
          "Please identify the person you call Noni."
        ],
        "answerOptions": [
          "Charity.",
          "They are equally close.",
          "Neither person is visible.",
          "Noni."
        ],
        "correctAction": 3,
        "correctAnswer": 3,
        "userReply": "Noni is the person in the striped shirt."
      }
    ]
  },
  {
    "id": "pacm",
    "title": "Personalized Action Concept Missing",
    "code": "PACM",
    "group": "Video uncertainty",
    "category": "Implicit information",
    "scene": "Personalized movement recognition",
    "videoSrc": null,
    "duration": 270,
    "simulated": true,
    "turns": [
      {
        "id": "pacm-1",
        "start": 0,
        "ask": 6,
        "askEnd": 16,
        "answer": 62,
        "end": 84,
        "query": "When you can identify who performs the personalized action “Vexalia”, tell me who it is.",
        "actionOptions": [
          "Answer immediately without requesting additional information.",
          "Please demonstrate or define the action you call “Vexalia”.",
          "Ask which performer the user likes most.",
          "Request a brighter background."
        ],
        "answerOptions": [
          "The fourth performer.",
          "The third performer.",
          "The first performer.",
          "The second performer."
        ],
        "correctAction": 1,
        "correctAnswer": 1,
        "userReply": "Vexalia is a left side step, a right side step, and a crossed-wrist finish."
      },
      {
        "id": "pacm-2",
        "start": 90,
        "ask": 96,
        "askEnd": 106,
        "answer": 152,
        "end": 174,
        "query": "When a performer completes “Norvexa”, tell me which performer it is.",
        "actionOptions": [
          "Request a view of the audience.",
          "Answer immediately without requesting additional information.",
          "Please provide an example of the action “Norvexa”.",
          "Ask for the performer’s name only."
        ],
        "answerOptions": [
          "The third performer.",
          "The fourth performer.",
          "The first performer.",
          "The second performer."
        ],
        "correctAction": 2,
        "correctAnswer": 2,
        "userReply": "Norvexa combines a knee lift with a low left-arm sweep."
      },
      {
        "id": "pacm-3",
        "start": 180,
        "ask": 186,
        "askEnd": 196,
        "answer": 242,
        "end": 264,
        "query": "When “Lunetra” appears again, tell me which side of the stage it occurs on.",
        "actionOptions": [
          "Ask what stage color the user prefers.",
          "Request an unrelated movement.",
          "Answer immediately without requesting additional information.",
          "Please clarify which movement sequence you call “Lunetra”."
        ],
        "answerOptions": [
          "The left side.",
          "The center.",
          "It does not appear.",
          "The right side."
        ],
        "correctAction": 3,
        "correctAnswer": 3,
        "userReply": "Lunetra is an overhead arm arc followed by a turn to the left."
      }
    ]
  },
  {
    "id": "auq",
    "title": "Ambiguous User Question",
    "code": "AUQ",
    "group": "User uncertainty",
    "category": "User intent",
    "scene": "Panel discussion",
    "videoSrc": null,
    "duration": 270,
    "simulated": true,
    "turns": [
      {
        "id": "auq-1",
        "start": 0,
        "ask": 6,
        "askEnd": 16,
        "answer": 62,
        "end": 84,
        "query": "When the woman wearing a skirt begins expressing her opinion, tell me she has started speaking.",
        "actionOptions": [
          "Answer immediately without requesting additional information.",
          "Which top pattern distinguishes the woman you mean?",
          "Ask for the color of the stage.",
          "Clarify the topic of the discussion instead."
        ],
        "answerOptions": [
          "She has not appeared.",
          "She has started speaking.",
          "She has left the stage.",
          "The host has started speaking."
        ],
        "correctAction": 1,
        "correctAnswer": 1,
        "userReply": "She is wearing a blue-and-red striped top."
      },
      {
        "id": "auq-2",
        "start": 90,
        "ask": 96,
        "askEnd": 106,
        "answer": 152,
        "end": 174,
        "query": "When the man in a suit speaks again, tell me which object he points to.",
        "actionOptions": [
          "Request the name of the studio.",
          "Answer immediately without requesting additional information.",
          "Which of the two men wearing suits do you mean?",
          "Ask which object the user prefers."
        ],
        "answerOptions": [
          "A cup.",
          "The door.",
          "The screen.",
          "A chair."
        ],
        "correctAction": 2,
        "correctAnswer": 2,
        "userReply": "The man in the dark suit on the left."
      },
      {
        "id": "auq-3",
        "start": 180,
        "ask": 186,
        "askEnd": 196,
        "answer": 242,
        "end": 264,
        "query": "When she returns to her seat, tell me who is sitting next to her.",
        "actionOptions": [
          "Ask for a different camera resolution.",
          "Clarify which seat is the most comfortable.",
          "Answer immediately without requesting additional information.",
          "Which woman does “she” refer to?"
        ],
        "answerOptions": [
          "The producer.",
          "The guest in red.",
          "No one.",
          "The host."
        ],
        "correctAction": 3,
        "correctAnswer": 3,
        "userReply": "The woman in the white jacket."
      }
    ]
  },
  {
    "id": "wuq",
    "title": "Wrong User Question",
    "code": "WUQ",
    "group": "User uncertainty",
    "category": "User intent",
    "scene": "Indoor walkthrough",
    "videoSrc": null,
    "duration": 270,
    "simulated": true,
    "turns": [
      {
        "id": "wuq-1",
        "start": 0,
        "ask": 6,
        "askEnd": 16,
        "answer": 62,
        "end": 84,
        "query": "When the larger room with a round clock above the long table is visible, tell me the wall color.",
        "actionOptions": [
          "Answer immediately without requesting additional information.",
          "There is a framed mirror above the table, rather than a round clock. Is that the room you mean?",
          "Assume the mirror is a clock.",
          "Ask about the color of the table only."
        ],
        "answerOptions": [
          "Gray.",
          "Peach.",
          "White.",
          "Blue."
        ],
        "correctAction": 1,
        "correctAnswer": 1,
        "userReply": "Yes, I mean the room with the mirror."
      },
      {
        "id": "wuq-2",
        "start": 90,
        "ask": 96,
        "askEnd": 106,
        "answer": 152,
        "end": 174,
        "query": "When the person in the baseball cap enters the room, tell me what they are carrying.",
        "actionOptions": [
          "Ask which room the user likes.",
          "Answer immediately without requesting additional information.",
          "The person is wearing a knit beanie, rather than a baseball cap. Is that the person you mean?",
          "Assume both hats are the same."
        ],
        "answerOptions": [
          "A box.",
          "An umbrella.",
          "A backpack.",
          "A suitcase."
        ],
        "correctAction": 2,
        "correctAnswer": 2,
        "userReply": "Yes, the person wearing the beanie."
      },
      {
        "id": "wuq-3",
        "start": 180,
        "ask": 186,
        "askEnd": 196,
        "answer": 242,
        "end": 264,
        "query": "When she opens the red cupboard, tell me what is on its top shelf.",
        "actionOptions": [
          "Inspect an unrelated red object.",
          "Ignore the mismatch in the query.",
          "Answer immediately without requesting additional information.",
          "The cupboard is blue, not red. Should I inspect the blue cupboard?"
        ],
        "answerOptions": [
          "A glass vase.",
          "A black plate.",
          "A stack of books.",
          "A white bowl."
        ],
        "correctAction": 3,
        "correctAnswer": 3,
        "userReply": "Yes, I meant the blue cupboard."
      }
    ]
  },
  {
    "id": "upm",
    "title": "User Preference Missing",
    "code": "UPM",
    "group": "User uncertainty",
    "category": "User preference",
    "scene": "Outfit recommendations",
    "videoSrc": null,
    "duration": 270,
    "simulated": true,
    "turns": [
      {
        "id": "upm-1",
        "start": 0,
        "ask": 6,
        "askEnd": 16,
        "answer": 62,
        "end": 84,
        "query": "When the person in a white knit top and white trousers appears, tell me which outfit shown so far suits me best.",
        "actionOptions": [
          "Answer immediately without requesting additional information.",
          "Which skirt color do you prefer: black, gray, or white?",
          "Ask for the brand of the clothes.",
          "Ask which room the video was filmed in."
        ],
        "answerOptions": [
          "Black turtleneck minidress.",
          "Burgundy top with a gray flared miniskirt.",
          "Beige sweater with a black miniskirt.",
          "White top with light-wash jeans."
        ],
        "correctAction": 1,
        "correctAnswer": 1,
        "userReply": "I prefer a gray skirt."
      },
      {
        "id": "upm-2",
        "start": 90,
        "ask": 96,
        "askEnd": 106,
        "answer": 152,
        "end": 174,
        "query": "When the next jacket appears, tell me which jacket best matches my taste.",
        "actionOptions": [
          "Ask for the length of the video.",
          "Answer immediately without requesting additional information.",
          "Do you prefer a fitted or an oversized jacket?",
          "Ask for the name of the model."
        ],
        "answerOptions": [
          "The cropped fitted jacket.",
          "The tailored cream blazer.",
          "The oversized charcoal jacket.",
          "The fitted navy blazer."
        ],
        "correctAction": 2,
        "correctAnswer": 2,
        "userReply": "I prefer an oversized jacket."
      },
      {
        "id": "upm-3",
        "start": 180,
        "ask": 186,
        "askEnd": 196,
        "answer": 242,
        "end": 264,
        "query": "After the last pair of shoes appears, tell me which pair I should choose.",
        "actionOptions": [
          "Ask for the color of the clothing rack.",
          "Request the model’s height.",
          "Answer immediately without requesting additional information.",
          "Do you prefer flat shoes or high heels?"
        ],
        "answerOptions": [
          "The red stilettos.",
          "The silver heels.",
          "The heeled ankle boots.",
          "The black loafers."
        ],
        "correctAction": 3,
        "correctAnswer": 3,
        "userReply": "I prefer flat shoes."
      }
    ]
  },
  {
    "id": "upc",
    "title": "User Preference Conflict",
    "code": "UPC",
    "group": "User uncertainty",
    "category": "User preference",
    "scene": "Home furnishing recommendations",
    "videoSrc": null,
    "duration": 270,
    "simulated": true,
    "turns": [
      {
        "id": "upc-1",
        "start": 0,
        "ask": 6,
        "askEnd": 16,
        "answer": 62,
        "end": 84,
        "query": "When the wooden sofa with gray cushions appears, tell me which sofa fits my newly redecorated minimalist home.",
        "actionOptions": [
          "Answer immediately without requesting additional information.",
          "You previously preferred striped upholstery. What upholstery do you prefer now?",
          "Keep recommending striped upholstery.",
          "Ask about the outdoor ground surface."
        ],
        "answerOptions": [
          "The bright red tufted sofa.",
          "The wood sofa with solid charcoal-gray cushions.",
          "The black-and-white striped sofa.",
          "The floral sofa."
        ],
        "correctAction": 1,
        "correctAnswer": 1,
        "userReply": "I now prefer solid charcoal-gray upholstery."
      },
      {
        "id": "upc-2",
        "start": 90,
        "ask": 96,
        "askEnd": 106,
        "answer": 152,
        "end": 174,
        "query": "When the round coffee table appears, tell me which table suits my current home.",
        "actionOptions": [
          "Ask how long the video is.",
          "Answer immediately without requesting additional information.",
          "You used to prefer ornate furniture. Do you now prefer a simple or a decorative table?",
          "Use the old ornate-furniture preference."
        ],
        "answerOptions": [
          "The patterned marble table.",
          "The table with floral inlays.",
          "The plain oak table.",
          "The carved gold table."
        ],
        "correctAction": 2,
        "correctAnswer": 2,
        "userReply": "I now prefer a simple table with clean lines."
      },
      {
        "id": "upc-3",
        "start": 180,
        "ask": 186,
        "askEnd": 196,
        "answer": 242,
        "end": 264,
        "query": "When the floor lamp appears, tell me which lighting option I should choose.",
        "actionOptions": [
          "Recommend brass based on the old preference.",
          "Request an unrelated view of the sofa.",
          "Answer immediately without requesting additional information.",
          "You previously preferred warm brass. Which lamp finish do you prefer after redecorating?"
        ],
        "answerOptions": [
          "The brass arc lamp.",
          "The polished chrome lamp.",
          "The copper pendant lamp.",
          "The matte-black floor lamp."
        ],
        "correctAction": 3,
        "correctAnswer": 3,
        "userReply": "I now prefer matte black."
      }
    ]
  }
];

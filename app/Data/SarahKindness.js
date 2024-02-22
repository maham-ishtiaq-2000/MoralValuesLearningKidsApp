export const storySlidesArrayData2 = [
    {
        id: '1',
        imageSource: require('../../assets/sarahKindness/slide1.png'),
        description: 'Alex, with cool glasses and a backpack, heads to a school under a rainbow. Flowers are blooming by a welcome sign. It is a happy, colorful day!',
        color: 'white'
    },
    {
        id: '2',
        imageSource: require('../../assets/sarahKindness/slide2.png'),
        description: 'While playing, Alex saw a wallet on the ground that someone had dropped. He picked it up.',
        color: '4E98B3'
    },
    {
        id: '3',
        imageSource: require('../../assets/sarahKindness/slide3.png'),
        description: 'Alex wondered: keep the wallet or give it to the teacher to return to its owner?',
        color: 'white'
    },
    {
        id: '4',
        imageSource: require('../../assets/sarahKindness/slide4.png'),
        description: 'Alex wondered: keep the wallet or give it to the teacher to return to its owner?',
        color: 'white'
    },
    {
        id: 'question',
        imageSource: require('../../assets/theWalletAdventure/childWondering.webp'),
        description: 'Can you imagine what the right choice for Alex might be at this moment?',
        color: '#7da995'
    },
    {
        id: 'options',
        color: '#37B6FF',
        name: "maham",
        optionAImageSource: require('../../assets/theWalletAdventure/rightOption.webp'),
        optionBImageSource: require('../../assets/theWalletAdventure/wrongOption.webp'),
        description: "Now it's your turn! Pick what you want Alex to do next.",
        correctOptionDescription: 'Alex gives wallet to the teacher so that she can hand it to correct owner.',
        wrongOptionDescription: 'Alex quickly hides the wallet in the cupboard so he can keep it with himself.',
        correct: 'A'
    }
];
const endScreen = [
  {
    id : 'endScreen',
    imageSource : require('../../assets/theWalletAdventure/theEndScreen.webp'),
    color : '#87ceeb'
  }
]
export const rightOptionArrayData2 = [
  {
      id : '1',
      imageSource : require('../../assets/theWalletAdventure/correctOption1.webp'),
      description : "When Alex gave the wallet to the teacher, she praised him in front of everyone for being honest, setting a positive example for everyone.",
      color : 'white'
  },
  {
      id : '2',
      imageSource : require('../../assets/theWalletAdventure/correctOption2.webp'),
      description : "Now Alex is happy and satisfied playing with friends because he did the right thing by returning the wallet.",
      color : '#006161'
  },
  ...endScreen
];
export const wrongOptionArrayData2 = [
  {
      id : '1',
      imageSource : require('../../assets/theWalletAdventure/falseOption1.webp'),
      description : "When Alex keeps the wallet, he starts to worry about the person who lost it, thinking they must be upset.",
      color : 'white'
  },
  {
      id : '2',
      imageSource : require('../../assets/theWalletAdventure/falseOption2.webp'),
      description : "Alex shares the wallet situation with his father, who advises him to return it to its rightful owner instead of keeping it himself.",
      color : '#87ceeb'
  },
  {
      id : '3',
      imageSource : require('../../assets/theWalletAdventure/falseOption0.webp'),
      description : "So next day, Alex gives wallet to his teacher so that she can hand it to wallet's owner.",
      color : '#35A367'
  },
  ...rightOptionArrayData2,

];
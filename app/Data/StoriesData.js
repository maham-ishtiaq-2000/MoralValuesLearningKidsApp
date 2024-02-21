import { storySlidesArrayData,rightOptionArrayData,wrongOptionArrayData } from './TheWalletAdventure';
import { storySlidesArrayData2,rightOptionArrayData2,wrongOptionArrayData2 } from './SarahKindness';

export const StoriesData = [
    {
      id: '1',
      imageSource: require('../../assets/theWalletAdventure/rightOption.webp'),
      name: 'Honesty',
      storyName : 'TheWalletAdventure',
      storyTitle : 'The Wallet Adventure',
      storySlidesArrayData : storySlidesArrayData,
      rightOptionArrayData : rightOptionArrayData,
      wrongOptionArrayData : wrongOptionArrayData
    },
    {
      id: '2',
      imageSource: require('../../assets/theWalletAdventure/wrongOption.webp'),
      name: 'Kindness',
      storyName : 'TheWalletAdventure2',
      storyTitle : 'The Wallet Adventure ',
      storySlidesArrayData : storySlidesArrayData2,
      rightOptionArrayData : rightOptionArrayData2,
      wrongOptionArrayData : wrongOptionArrayData2
    }
];
import { UnOrderedList } from '../components/UnOrderedList';

const waysToEarn = [
  'Complete assessments and verfiy your skills. When you complete assessments and verify your skills not only are you able to show companies your skill set but you can also earn tokens for completing the testing.',
  'Refer a freind. When you refer friends to Outdefine you will earn tokens once your friend becomes vetted to the platform. If you are a vetted member you will recieve 250 tokens for every successful friend that also becomes vetted.',
  'If you are not vetted you will earn 50 tokens for every successful friend that becomes a vetted member of Outdefine. Accepting job offers. When you receive a job on the Outdefine platform you are eligible to receive tokens just for siging on! If you are on any type of contract you are also eligible for token vesting. Read “What is token vesting” to learn more.'
];

export const faqs = [
  {
    title: 'How do I use the token?',
    content:
      'Outdefine’s talent network is built around its Solana based token. Users can earn by joining the network, doing work and referring others. The token has utility on the marketplace, helping you get jobs and boosting your applications to the jobs your interested in. You can also earn by doing assessments but most importantly the token represents governance of the direction the platform will move in the future.'
  },
  {
    title: 'Ways to earn?',
    content: (
      <UnOrderedList
        className="pr-5"
        title="There are a couple ways to earn tokens on our platform. Ways to earn are listed below:"
        list={waysToEarn}
      />
    )
  },
  {
    title: 'Ways to redeem?',
    content:
      'Ways to use your token on the Outdefine platfrom. We are curerently in the begining stages of the platform, you are currently able to use tokens to boost your job applications. This helps increase your visibility for the jobs you are really passionate about. In the future you will be able to stake your tokens and even trade on the open market. '
  },
  {
    title: 'Token whitepaper?',
    content: (
      <>
        <span>
          Every coin has a “whitepaper” where all the information about it is
          stored. A whitepaper throws light on two major aspects of a crypto
          project – its purpose and the technology behind it. It contains
          historical performance and other data about cryptocurrency. To find
          our token whitepaper place click
        </span>
        <a
          href="https://www.outdefine.com/whitepaper"
          className="text-black"
          target="_blank"
          rel="noopener"
        >
          {' '}
          here.
        </a>
      </>
    )
  }
];

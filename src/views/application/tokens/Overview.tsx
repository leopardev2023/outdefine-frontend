import { AppDispatch, RootState } from 'app/store';
import Button from 'components/Button/ButtonV2';
import Heading from 'components/Heading/HeadingV2';
import TypographyV2 from 'components/Typography/TypographyV2';
import IconV2 from 'components/V2/Icons/IconV2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks/redux-hooks';
import { getBalance, getRewards } from 'redux/slices/token';
import pathUtils from 'utils/pathUtils';
import { Container } from './components/Container';
import moment from 'moment';
import { Token } from '../assessmentV2/Icons';
import { AvatarWithDefaultV2 } from 'views/client-application/components/Images.WithDefaultV2';
import { ReactComponent as OdfTokenSvg } from 'assets/V2/common/odf-token.svg';

type BalanceProps = {
  balance?: any;
};

const ENUM_REFERRAL_TYPE = ['INVITED', 'SIGNEDUP', 'TRUSTED'];

function Balance(props: BalanceProps) {
  return (
    <div className='bg-white w-[225px] px-4 py-2 rounded-lg'>
      <TypographyV2
        variant='label'
        className='mb-2 text-xs font-semibold font-inter text-inactive-gray'
      >
        Balance
      </TypographyV2>
      <div className='flex flex-row items-center gap-x-4 mt-3 mb-6'>
        <IconV2 iconType='DOLLAR' iconClassName='w-[27px] h-[27px]' />
        <Heading variant='h4' className='text-3xl font-bold font-poppins'>
          {props.balance}
        </Heading>
      </div>
    </div>
  );
}

type TokenHistoryProps = {
  balance: number;
  items: {
    id: string;
    amount: string;
    received_from: string;
    date_issued: Date;
  }[];
};

interface TokenOverview {
  tabHandler: Function;
}

function NoTokenPlaceholder() {
  const navigate = useNavigate();
  return (
    <div className='w-full bg-banner-orange rounded-[8px] p-6'>
      <div className='flex flex-col justify-center items-center gap-y-4'>
        <div className='flex felx-row justify-between items-center gap-x-2'>
          <img
            src='/tokens/astronaut-walk-right.png'
            alt='astronaut-walk-right'
            className='h-[120px]'
          />
          <img
            src='/tokens/astronaut-walk-left.png'
            alt='astronaut-walk-left'
            className='h-[120px]'
          />
        </div>
        <TypographyV2
          variant='caption'
          className='font-poppins text-base font-bold leading-[150%]'
        >
          Complete your assessment and earn rewards
        </TypographyV2>
        <TypographyV2
          variant='caption'
          className='text-sm font-inter font-normal leading-[150%]'
        >
          Earn 500 tokens when you complete your assessments and become a
          trusted member.
        </TypographyV2>
        <Button
          className='mt-4 px-[10px]'
          onClick={() => navigate(pathUtils.ASSESSMENT)}
        >
          Start assessment
        </Button>
      </div>
    </div>
  );
}

function TokenHistory(props: TokenHistoryProps) {
  if (props.items == null || props.items.length === 0) {
    return <NoTokenPlaceholder />;
  }
  return (
    <div>
      <Balance balance={props.balance} />
      <Heading
        variant='h6'
        className='mb-6 mt-9 !text-base font-bold font-poppins'
        bold
      >
        Token history
      </Heading>
      <div className='w-full bg-white rounded px-8 py-6 gap-y-2 flex flex-col'>
        {props.items.map((token) => (
          <div
            className='relative flex w-full p-3 xl:pr-20 border border-purple rounded'
            key={token.id}
          >
            <div className='w-full p-3 flex items-center justify-between flex-wrap xl:flex-nowrap'>
              <div className='flex items-center gap-x-3 w-[100px]'>
                <TypographyV2
                  variant='caption'
                  className='font-poppins text-sm font-bold leading-[150%] first-letter:capitalize'
                >
                  {token.received_from.toLowerCase()}
                </TypographyV2>
              </div>
              <div className='flex flex-col items-center gap-x-3'>
                <TypographyV2
                  variant='label'
                  className='text-xs font-semibold font-inter leading-[150%] text-dark-gray'
                >
                  Month
                </TypographyV2>
                <TypographyV2
                  variant='caption'
                  className='text-xs font-semibold font-inter leading-[150%] text-[#2D2F33]'
                >
                  {moment(token.date_issued).format('MMM')}
                </TypographyV2>
              </div>
              <div className='flex flex-col items-center gap-x-3'>
                <TypographyV2
                  variant='label'
                  className='text-xs font-semibold font-inter leading-[150%] text-dark-gray'
                >
                  Amount
                </TypographyV2>
                <TypographyV2
                  variant='caption'
                  className='text-xs font-semibold font-inter leading-[150%] text-[#2D2F33]'
                >
                  {token.amount}
                </TypographyV2>
              </div>
              <div className='flex flex-col items-center gap-x-3'>
                <TypographyV2
                  variant='label'
                  className='text-xs font-semibold leading-[150%] text-dark-gray'
                >
                  Received
                </TypographyV2>
                <TypographyV2
                  variant='caption'
                  className='text-xs font-semibold font-inter leading-[150%] text-[#2D2F33]'
                >
                  {moment(token.date_issued).format('MM/DD/YY')}
                </TypographyV2>
              </div>
              <div className='flex flex-col items-center gap-x-3'>
                <TypographyV2
                  variant='label'
                  className='text-xs font-semibold leading-[150%] text-dark-gray'
                >
                  Tokens
                </TypographyV2>
                <TypographyV2
                  variant='caption'
                  className='text-xs flex gap-x-2 font-semibold font-inter leading-[150%]'
                >
                  <IconV2 iconType='DOLLAR' iconClassName='w-[16px] h-[16px]' />
                  {token.amount}
                </TypographyV2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TokenOverview(props: TokenOverview) {
  const navigate = useNavigate();
  const profile = useAppSelector((state) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((root: RootState) => root.token);
  const referralsHistory = token.referralsHistory as any;

  useEffect(() => {
    dispatch(getBalance(profile.User.user_id));
    dispatch(getRewards(profile.User.user_id));
  }, [dispatch]);

  return (
    <Container>
      <div className='flex flex-row items-stretch gap-x-4 flex-wrap xl:flex-nowrap gap-y-10'>
        <div className='w-full xl:basis-8/12'>
          <Heading variant='h6' className='mb-5 font-poppins !text-base' bold>
            Tokens
          </Heading>
          <TokenHistory balance={token.balance} items={token.rewardsHistory} />
        </div>
        <div className='w-full xl:basis-4/12'>
          <Heading variant='h6' className='mb-5 font-poppins !text-base' bold>
            Referrals
          </Heading>
          <div className='w-full h-full purple-gradient rounded-[8px] p-6 flex flex-col justify-center items-center'>
            <TypographyV2
              variant='caption'
              className='font-poppins text-base font-semibold'
            >
              Invite friends to join
            </TypographyV2>
            {
              <TypographyV2
                variant='caption'
                className='font-inter !text-sm mt-10 text-center'
              >
                <span>Invite you friends to join and earn </span>
                {/* <Token className='inline-block' /> */}
                <span>
                  {` `}
                  250 tokens per referral when they sign up and become trusted
                  members.
                </span>
              </TypographyV2>
            }
            <Button className='mt-14 px-5' onClick={() => props.tabHandler(2)}>
              Refer friends
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}

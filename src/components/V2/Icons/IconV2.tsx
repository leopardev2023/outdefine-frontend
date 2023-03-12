import { ReactSVGElement } from "react";

import { ReactComponent as Add } from "assets/V2/svg/add.svg";
import { ReactComponent as ArrowRight } from "assets/V2/svg/arrow-right.svg";
import { ReactComponent as Back } from "assets/V2/svg/back.svg";
import { ReactComponent as Badge } from "assets/V2/svg/badge.svg";
import { ReactComponent as Bank } from "assets/V2/svg/bank.svg";
import { ReactComponent as BriefcaseWhite } from "assets/V2/svg/briefcase-white.svg";
import { ReactComponent as BookmarkFilled } from "assets/V2/svg/bookmark-filled.svg";
import { ReactComponent as Bookmark } from "assets/V2/svg/bookmark.svg";
import { ReactComponent as Bookmark2 } from "assets/V2/svg/bookmark2.svg";
import { ReactComponent as Code } from "assets/V2/svg/code.svg";
import { ReactComponent as CodeWhite } from "assets/V2/svg/code-white.svg";
import { ReactComponent as Close } from "assets/V2/svg/close-dark.svg";
import { ReactComponent as CloseWhite } from "assets/V2/svg/close-white.svg";
import { ReactComponent as Clock } from "assets/V2/svg/clock.svg";
import { ReactComponent as ClockSand } from "assets/V2/svg/clock-sand.svg";
import { ReactComponent as Company } from "assets/V2/svg/company.svg";
import { ReactComponent as Date } from "assets/V2/svg/date.svg";
import { ReactComponent as Document } from "assets/V2/svg/document.svg";
import { ReactComponent as DollaBlueCircle } from "assets/V2/svg/dollar-blue-circle.svg";
import { ReactComponent as Edit } from "assets/V2/svg/edit.svg";
import { ReactComponent as Education } from "assets/V2/svg/education.svg";
import { ReactComponent as Location } from "assets/V2/svg/location.svg";
import { ReactComponent as Linkedin } from "assets/V2/svg/linkedin.svg";
import { ReactComponent as Github } from "assets/V2/svg/github.svg";
import { ReactComponent as Message } from "assets/V2/svg/message.svg";
import { ReactComponent as Messenger } from "assets/V2/svg/messenger.svg";
import { ReactComponent as MoneyWallet } from "assets/V2/svg/money-wallet.svg";
import { ReactComponent as Rate } from "assets/V2/svg/rate.svg";
import { ReactComponent as RatingStar } from "assets/V2/svg/rating-star.svg";
import { ReactComponent as RedStar } from "assets/V2/svg/red-star.svg";
import { ReactComponent as Token } from "assets/V2/svg/token.svg";
import { ReactComponent as TriangleArrowSolid } from "assets/V2/svg/triangle-arrow-solid.svg";
import { ReactComponent as TrustedTalent } from "assets/V2/svg/trusted-talent.svg";
import { ReactComponent as Search } from "assets/V2/svg/search.svg";
import { ReactComponent as Portfolio } from "assets/V2/svg/portfolio.svg";
import { ReactComponent as Upload } from "assets/V2/svg/upload.svg";
import { ReactComponent as UploadWhite } from "assets/V2/svg/upload-white.svg";
import { ReactComponent as User } from "assets/V2/svg/user.svg";
import { ReactComponent as UserOrange } from "assets/V2/svg/user-orange.svg";
import { ReactComponent as UserOutline } from "assets/V2/svg/user-outline.svg";
import { ReactComponent as World } from "assets/V2/svg/world.svg";
import { ReactComponent as OutdefineLogo } from "assets/V2/svg/dark-logo.svg";
import { ReactComponent as ArrowUp } from "assets/V2/svg/arrow-up.svg";
import { ReactComponent as ArrowDown } from "assets/V2/svg/arrow-down.svg";
import { ReactComponent as Dollar } from "assets/V2/svg/dollar.svg";
import { ReactComponent as ButtonBackRect } from "assets/V2/svg/btn-back-rectangle.svg";
import { ReactComponent as Shadow } from "assets/V2/svg/shadow.svg";
import { ReactComponent as TripleDot } from "assets/V2/svg/triple-dots.svg";
import { ReactComponent as DollarCircle } from "assets/V2/svg/dollar-circle.svg";
import { ReactComponent as BigCase } from "assets/V2/svg/big-case.svg";
import { ReactComponent as OutdefTransLogo } from "assets/V2/svg/outdef-logo.svg";
import { ReactComponent as User2 } from "assets/V2/svg/user-2.svg";
import { ReactComponent as DocumentGray } from "assets/V2/svg/document-gray.svg";
import { ReactComponent as Trash } from "assets/V2/svg/trash.svg";
import { ReactComponent as Book } from "assets/V2/svg/book.svg";
import { ReactComponent as Hamburger } from "assets/V2/svg/hamburger.svg";
import { ReactComponent as Instagram } from "assets/V2/svg/instagram.svg";
import { ReactComponent as Twitter } from "assets/V2/svg/twitter.svg";
import { ReactComponent as ScrollLeftArrow } from "assets/V2/svg/scroll-left-arrow.svg";
import { ReactComponent as ScrollRightArrow } from "assets/V2/svg/scroll-right-arrow.svg";

const IconV2: React.FC<IIconV2> = (props): ReactSVGElement => {
  const className = props?.iconClassName ?? "";

  const attribute = { className };

  const icons = {
    ADD: <Add {...attribute} />,
    "ARROW-RIGHT": <ArrowRight {...attribute} />,
    BACK: <Back {...attribute} />,
    BADGE: <Badge {...attribute} />,
    BANK: <Bank {...attribute} />,
    "BTN-BACK-RECTANGLE": <ButtonBackRect {...attribute} />,
    BRIEFCASEWHITE: <BriefcaseWhite {...attribute} />,
    BOOKMARK: <Bookmark {...attribute} />,
    BOOKMARK2: <Bookmark2 {...attribute} />,
    BOOKMARKFILLED: <BookmarkFilled {...attribute} />,
    CODE: <Code {...attribute} />,
    CODEWHITE: <CodeWhite {...attribute} />,
    CLOSE: <Close {...attribute} />,
    "CLOSE-WHITE": <CloseWhite {...attribute} />,
    CLOCK: <Clock {...attribute} />,
    "CLOCK-SAND": <ClockSand {...attribute} />,
    COMPANY: <Company {...attribute} />,
    DATE: <Date {...attribute} />,
    DOCUMENT: <Document {...attribute} />,
    "DOLLAR-BLUE-CIRCLE": <DollaBlueCircle {...attribute} />,
    EDIT: <Edit {...attribute} />,
    EDUCATION: <Education {...attribute} />,
    GITHUB: <Github {...attribute} />,
    LOCATION: <Location {...attribute} />,
    "OUTDEF-LOGO": <OutdefineLogo {...attribute} />,
    LINKEDIN: <Linkedin {...attribute} />,
    "MONEY-WALLET": <MoneyWallet {...attribute} />,
    MESSAGE: <Message {...attribute} />,
    MESSENGER: <Messenger {...attribute} />,
    PORTFOLIO: <Portfolio {...attribute} />,
    RATE: <Rate {...attribute} />,
    RATINGSTAR: <RatingStar {...attribute} />,
    REDSTAR: <RedStar {...attribute} />,
    SEARCH: <Search {...attribute} />,
    TOKEN: <Token {...attribute} />,
    "TRIANGLE-ARROW-SOLID": <TriangleArrowSolid {...attribute} />,
    "TRUSTED-TALENT": <TrustedTalent {...attribute} />,
    UPLOAD: <Upload {...attribute} />,
    UPLOADWHITE: <UploadWhite {...attribute} />,
    USER: <User {...attribute} />,
    "USER-ORANGE": <UserOrange {...attribute} />,
    USEROUTLINE: <UserOutline {...attribute} />,
    WORLD: <World {...attribute} />,
    "ARROW-UP": <ArrowUp {...attribute} />,
    "ARROW-DOWN": <ArrowDown {...attribute} />,
    DOLLAR: <Dollar {...attribute} />,
    SHADOW: <Shadow {...attribute} />,
    "TRIPLE-DOT": <TripleDot {...attribute} />,
    "DOLLAR-CIRCLE": <DollarCircle {...attribute} />,
    "OUTDEFINE-TRANS-LOGO": <OutdefTransLogo {...attribute} />,
    "BIG-CASE": <BigCase {...attribute} />,
    "USER-2": <User2 {...attribute} />,
    "DOCUMENT-GRAY": <DocumentGray {...attribute} />,
    TRASH: <Trash {...attribute} />,
    BOOK: <Book {...attribute} />,
    HAMBURGER: <Hamburger {...attribute} />,
    INSTAGRAM: <Instagram {...attribute} />,
    TWITTER: <Twitter {...attribute} />,
    "SCROLL-LEFT-ARROW": <ScrollLeftArrow {...attribute} />,
    "SCROLL-RIGHT-ARROW": <ScrollRightArrow {...attribute} />,

  };

  return icons[props.iconType] ?? icons.EDIT;
};

export default IconV2;

import { ChangeEvent, ReactElement } from "react";

import Button from "components/Button/ButtonV2";
import ModalV2 from "components/Modal/ModalV2";
import IconButtonV2 from "components/V2/IconButton";
import IconV2 from "components/V2/Icons";
import useJobAction from "../hooks/useJobAction";
import TextareaV2 from "components/V2/Textarea/TextareaV2";
import InputV2 from "components/V2/Input/InputV2";
import { LogoWithDefaultV2 } from "views/client-application/components/Images.WithDefaultV2";
import useJobInvitations from "../hooks/useJobInvitations";

export default function ApplyButtonGroup({}: {}): ReactElement {
  const {
    jobId,
    invitation,
    isApplied,
    isSaved,
    isAccepted,
    action,
    loading,
    modal,
    message,
    tokenBalance,
    amount,
    companyProfile,
    saveHandler,
    applyHandler,
    acceptInvitationHandler,
    setAmount,
    changeMessageHandler,
    openNormalModal,
    openTokenModal,
    closeModal,
  } = useJobAction();

  const { action: accetpAction, addressInviteHandler } = useJobInvitations();

  const acceptHandler = async () => {
    await addressInviteHandler("ACCEPT", invitation.company_id, invitation.job_id, invitation.id);

    acceptInvitationHandler();
  };

  return (
    <>
      {isAccepted && (
        <>
          <Button
            disabled={isApplied}
            onClick={openTokenModal}
            variant="secondary"
            className="font-semibold font-poppins flex gap-1 items-center h-10 px-3"
          >
            <IconV2 iconType="TOKEN" iconClassName="w-[26px] h-[26px]" />
            Apply with tokens
          </Button>
          <Button
            disabled={isApplied}
            onClick={openNormalModal}
            className="font-semibold font-poppins h-10 w-[200px]"
          >
            {isApplied ? "Applied" : "Apply Now"}
          </Button>
        </>
      )}
      {!isAccepted && (
        <Button
          disabled={!invitation}
          onClick={acceptHandler}
          loading={accetpAction.pending}
          className="font-semibold font-poppins h-10 w-[200px]"
        >
          Accept
        </Button>
      )}

      <IconButtonV2
        onClick={() => {
          jobId && saveHandler(Number(jobId));
        }}
        iconType={isSaved ? "BOOKMARKFILLED" : "BOOKMARK"}
        disabled={loading && action === "SAVE"}
        className="w-5 h-6 absolute top-1 -right-12 disabled:cursor-wait"
      />
      <ModalV2 isOpen={modal.visibility} onClose={closeModal}>
        {
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-1/2 left-1/2 w-[720px] bg-white rounded-lg shadow-card -translate-x-1/2 -translate-y-1/2"
          >
            <div className="w-full pt-12 pb-8 px-14 relative">
              <IconButtonV2
                onClick={closeModal}
                iconType={"CLOSE"}
                className="p-0 absolute top-8 right-8"
                iconClassName="w-5 h-5"
              />
              <h5 className="text-center font-semibold text-xl leading-[30px]">
                {modal.type === "TOKEN" ? "Apply with tokens" : "Apply"}
              </h5>
              <div className="mt-7 flex w-full justify-between">
                <div className="flex items-center gap-[14px]">
                  <div className={`w-[65px] h-[65px] rounded-full`}>
                    {companyProfile?.Company?.logo ? (
                      <LogoWithDefaultV2 src={companyProfile?.Company?.logo} />
                    ) : (
                      <IconV2 iconType={"OUTDEF-LOGO"} iconClassName="w-full h-full" />
                    )}
                  </div>
                  <div>
                    <p className="font-poppins font-semibold text-base leading-6">
                      {companyProfile?.job_title}
                    </p>
                    <span className="font-inter text-sm leading-[21px]">
                      {companyProfile?.company_name}
                    </span>
                  </div>
                </div>
                {/* <div className='flex gap-[18px]'>
                  <div className='translate-y-4 w-9 h-9 rounded-full bg-dark-gray/40'></div>
                  <div>
                    <p className='font-poppins text-xs leading-[18px]'>
                      You’ll be connecting with
                    </p>
                    <span className='flex gap-[18px] font-poppins font-semibold text-xs'>
                      <span>{}</span>
                      <span>-Recruiter</span>
                    </span>
                  </div>
                </div> */}
              </div>

              <p className="mt-9 font-poppins text-xs mb-4">Introduce yourself</p>
              <TextareaV2
                value={message}
                onChange={changeMessageHandler}
                className="w-full h-[134px] resize-none text-xs font-inter"
                limitText="100 word max"
              />

              {modal.type === "TOKEN" && (
                <div className="mt-9">
                  <p className="font-semibold font-inter text-xs">
                    Applying with tokens will boost your applications to the top.
                  </p>
                  <div className="mt-4 flex gap-9">
                    <div>
                      <p className="mb-3 font-poppins text-xs">Your Tokens</p>
                      <InputV2
                        value={tokenBalance}
                        className="w-[120px]"
                        icon={<IconV2 iconType={"TOKEN"} iconClassName="w-4 h-4" />}
                      />
                    </div>
                    <div>
                      <p className="mb-3 font-poppins text-xs">Tokens to apply </p>
                      <InputV2
                        value={amount}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setAmount(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value))
                        }
                        className="w-[120px]"
                        icon={<IconV2 iconType={"TOKEN"} iconClassName="w-4 h-4" />}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex mt-8 justify-center">
                <Button
                  loading={loading && action === "APPLY"}
                  onClick={applyHandler}
                  disabled={
                    (modal.type === "TOKEN" && (amount > tokenBalance || amount === 0)) ||
                    message === ""
                  }
                  className={`${modal.type === "NORMAL" ? "w-[140px]" : "w-[200px]"} h-10 px-0`}
                >
                  {modal.type === "NORMAL" ? "Apply" : "Apply with tokens"}
                </Button>
              </div>
            </div>
          </div>
        }
      </ModalV2>
    </>
  );
}

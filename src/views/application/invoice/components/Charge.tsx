import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { FormInput, Radio, TextArea } from 'components/forms';
import Heading from 'components/Heading';
import DateInput from 'components/DateInput';
import { SelectBoxRole } from 'components/forms/Select';

interface ChargeProps {
    index?: number;
    setChargeList?: any;
    charge?: any;
    chargeList?: any;
}

const Charge: React.FC<ChargeProps> = ({
    index = 0,
    setChargeList,
    // charge,
    chargeList,
}) => {

    const onInputValidate = (e, type) => {
        if (e.target.value === '') {
        }
    };

    return (
        <div className='flex gap-x-10 justify-between font-bold text-base  md:gap-x-[100px] w-full mt-6'>
            <FormInput
                label='Completed duties'
                name={`completedDuties-${index}`}
                placeholder='Completed duties'
                className='text-[18px] w-full'
                onChange={(e: any) => {
                    const tmp = chargeList.map(i => i)
                    if(index >= chargeList.length) tmp.push({})
                    tmp[index].completedDuties = e.target.value
                    setChargeList(tmp);
                }}
                onBlur={(e) => onInputValidate(e, 'completedDuties')}
                stress
                value={chargeList[index]?.completedDuties}
            />

            <div className='flex flex-row justify-between items-center gap-x-[72px] w-full mb-3'>

                <FormInput
                    label='Hours'
                    name={`hours-${index}`}
                    placeholder='Hours'
                    className='text-[18px] w-[150px]'
                    onChange={(e: any) => {
                        const tmp = chargeList.map(i => i)
                        tmp[index].hours = e.target.value;
                        tmp[index].amount = parseInt(tmp[index].rate) * parseInt(tmp[index].hours);
                        setChargeList(tmp);
                    }}
                    onBlur={(e) => onInputValidate(e, 'hours')}
                    stress
                    value={chargeList[index]?.hours}
                />
                <FormInput
                    label='Hourly rate'
                    name={`rate-${index}`}
                    placeholder='Hourly rate'
                    className='text-[18px] w-[150px]'
                    onChange={(e: any) => {
                        const tmp = chargeList.map(i => i)
                        tmp[index].rate = e.target.value;
                        tmp[index].amount = parseInt(tmp[index].rate) * parseInt(tmp[index].hours);
                        setChargeList(tmp);
                    }
                    }
                    onBlur={(e) => onInputValidate(e, 'rate')}
                    stress
                    value={chargeList[index]?.rate}
                />
            </div>
            <FormInput
                label='Amount total'
                name={`amount-${index}`}
                placeholder='$$'
                className='text-[18px] w-full'
                // onChange={(e: any) => {
                //     const tmp = chargeList.map(i => i)
                //     tmp[index].amount = e.target.value
                //     setChargeList(tmp);
                // }
                // }
                onBlur={(e) => onInputValidate(e, 'amount')}
                stress
                value={chargeList[index]?.amount}
            />

        </div>
    );
};

export default Charge;

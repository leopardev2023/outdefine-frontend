import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';

import { FormInput, Radio, TextArea } from 'components/forms';
import Heading from 'components/Heading';
import DateInput from 'components/DateInput';
import { SelectBoxRole } from 'components/forms/Select';

interface ChargeProps {
    index?: number;
    setInvoiceInfo: any;
    invoiceInfo: any;
}

const Charge: React.FC<ChargeProps> = ({
    index = 0,
    setInvoiceInfo,
    invoiceInfo,
}) => {
    const [roleSelected, setRoleSelected] = useState<any>({});

    const onInputValidate = (e, type) => {
        if (e.target.value === '') {
        }
    };

    return (
        <div className='flex gap-x-10 justify-between font-bold text-base  md:gap-x-[100px] w-full mt-6'>
            <FormInput
                label='Completed duties'
                name={`companyDuties-${index}`}
                placeholder='Completed duties'
                className='text-[18px] w-full'
                onChange={(e: any) => {
                    setInvoiceInfo({
                        ...invoiceInfo,
                        companyDuties: {
                            ...invoiceInfo.companyDuties,
                            [index]: {
                                ...invoiceInfo.companyDuties[index],
                                companyDuties: e.target.value,
                            },
                        }});
                }
                }
                onBlur={(e) => onInputValidate(e, 'companyDuties')}
                stress
                value={invoiceInfo.companyDuties}
            />
            <div className='flex flex-row justify-between items-center gap-x-[72px] w-full'>

                <FormInput
                    label='Hours'
                    name={`hours-${index}`}
                    placeholder='Hours'
                    className='text-[18px] w-[150px]'
                    onChange={(e: any) => {
                        setInvoiceInfo({ ...invoiceInfo, 
                            hours: {
                                ...invoiceInfo.hours,
                                [index]: {
                                    ...invoiceInfo.hours[index],
                                    hours: e.target.value,
                                },
                            }});
                    }
                    }
                    onBlur={(e) => onInputValidate(e, 'hours')}
                    stress
                    value={invoiceInfo.hours}
                />
                <FormInput
                    label='Hourly rate'
                    name={`hourlyRate-${index}`}
                    placeholder='Hourly rate'
                    className='text-[18px] w-[150px]'
                    onChange={(e: any) => {
                        setInvoiceInfo({ ...invoiceInfo,
                            hourlyRate: {
                                ...invoiceInfo.hourlyRate,
                                [index]: {
                                    ...invoiceInfo.hourlyRate[index],
                                    hourlyRate: e.target.value,
                                },
                            }});
                    }
                    }
                    onBlur={(e) => onInputValidate(e, 'hourlyRate')}
                    stress
                    value={invoiceInfo.hourlyRate}
                />
            </div>
            <FormInput
                label='Amount total'
                name={`amountTotal-${index}`}
                placeholder='$$'
                className='text-[18px] w-full'
                onChange={(e: any) => {
                    setInvoiceInfo({ ...invoiceInfo, 
                        amountTotal: {
                            ...invoiceInfo.amountTotal,
                            [index]: {
                                ...invoiceInfo.amountTotal[index],
                                amountTotal: e.target.value,
                            },
                        }});
                }
                }
                onBlur={(e) => onInputValidate(e, 'amountTotal')}
                stress
                value={invoiceInfo.amountTotal}
            />

        </div>
    );
};

export default Charge;

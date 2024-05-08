import { Button } from '@/components/common/Button';
import CheckBox from '@/components/common/CheckBox';
import { Divider } from '@/components/common/Divider';
import React, { ChangeEvent } from 'react';

interface AgreementsProps {
    service: boolean;
    location: boolean;
    personalInfo: boolean;
    marketing: boolean;
}
interface Props {
    allAgreed: boolean;
    handleAllCheck: (event: ChangeEvent<HTMLInputElement>) => void;
    agreements: AgreementsProps;
    handleCheck: (event: ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    handleNextStep: () => void;
}

export default function AgreementsPage({
    allAgreed,
    handleAllCheck,
    agreements,
    handleCheck,
    disabled,
    handleNextStep,
}: Props) {
    return (
        <div className="flex flex-col">
            <main id="agreement" className="w-full px-5 pt-7">
                <span className="text-black text-xl font-semibold leading-[30px]">
                    댕댕워크 사용을 위한
                    <br />
                    <span className="text-amber-500 text-xl font-semibold leading-[30px]">약관내용에 동의</span>
                    해주세요
                </span>

                <div className="w-full mt-7">
                    <CheckBox id={'all'} checked={allAgreed} onChange={handleAllCheck} content={'모두 동의합니다.'} />
                </div>
                <Divider className="mt-4" />

                <div className="mt-6 inline-flex flex-col justify-start items-start gap-6">
                    <div className="flex-col justify-start items-start gap-3 flex">
                        <div className=" text-stone-500 text-xs font-normal leading-[18px]">필수 동의</div>
                        <div className="flex flex-col gap-1">
                            <CheckBox
                                id={'service'}
                                checked={agreements.service}
                                onChange={handleCheck}
                                content={'서비스 이용약관'}
                            />
                            <CheckBox
                                id={'location'}
                                checked={agreements.location}
                                onChange={handleCheck}
                                content={'위치기반 서비스 이용약관'}
                            />
                            <CheckBox
                                id={'personalInfo'}
                                checked={agreements.personalInfo}
                                onChange={handleCheck}
                                content={'개인정보 수집과 이용'}
                            />
                        </div>
                    </div>

                    <div className="inline-flex flex-col justify-start items-start gap-3">
                        <div className="text-stone-500 text-xs font-normal leading-[18px]">선택 동의</div>
                        <div className="inline-flex flex-col justify-start items-start gap-[3.5px]">
                            <CheckBox
                                id={'marketing'}
                                checked={agreements.marketing}
                                onChange={handleCheck}
                                content={'마케팅 정보 수신'}
                            />
                            <div className="text-stone-500 text-[10px] font-normal leading-[15px]">
                                앱 알림, 문자 메시지, 이메일로
                                <br /> 광고성 정보를 전송합니다.
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Button
                className="w-full absolute bottom-0"
                disabled={disabled}
                color="primary"
                rounded="none"
                onClick={handleNextStep}
            >
                다음 단계로
            </Button>
        </div>
    );
}
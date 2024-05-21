import DefaultProfileImage from '@/components/common/DefaultProfileImage';
import { MouseEvent } from 'react';

interface AvatarProps {
    id?: string;
    url?: string;
    name?: string;
    size?: 'small' | 'medium' | 'large';
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    className?: string;
}
const imgSize = (size: string) => {
    switch (size) {
        case 'small':
            return '36px';
        case 'medium':
            return '64px';
        case 'large':
            return '112px';
    }
};

export default function Avatar({ url, name, size = 'small', onClick, className, id = '0' }: AvatarProps) {
    return (
        <div id={id} className={`justify-start items-center gap-2 inline-flex ${className}`} onClick={onClick}>
            <div className={`flex justify-center items-center rounded-full border overflow-hidden border-neutral-200`}>
                {url ? (
                    <img src={url} alt={name} width={imgSize(size)} height={imgSize(size)} />
                ) : (
                    <DefaultProfileImage />
                )}
            </div>
            <div className="text-neutral-800 text-sm font-bold leading-[21px]">{name ? name : ''}</div>
        </div>
    );
}

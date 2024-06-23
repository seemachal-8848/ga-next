import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Navbar/Navbar.module.css';
import { CONSTANTS } from '@/services/config/app-config';

interface Item {
    name: string;
    label: string;
    url: string | null;
    seq: number;
    slug: string;
    image: string | null;
    short_description: string | null;
    values: Item[];
}

interface Section {
    name: string;
    label: string;
    url: string;
    seq: number;
    slug: string;
    image: string | null;
    short_description: string | null;
    values: Item[];
}

interface DropdownListProps {
    sections: Section[];
    closeCanvas: () => void
}


const MobileDropdown: React.FC<DropdownListProps> = ({ sections, closeCanvas }) => {
    const imageLoader = ({ src, width, quality }: any) => {
        return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
    };
    return (
        <>
            {sections?.length > 0 ? (
                <div className='container-fluid'>
                    <div className=''>
                        <div className='row'>
                            {Array.isArray(sections) && sections?.length > 0 && sections?.map((section: any, index: number) => (
                                <div key={index} className='col-12'>
                                    <Link key={index} className={`${styles.dropdown_category}`} href={section?.url ?? '/'}>
                                        <div onClick={closeCanvas}>{section?.label}</div>
                                    </Link>
                                    {Array.isArray(section?.values) && section?.values?.length > 0 && section?.values.map((item: any, index: number) => (
                                        <Link key={index} className={`${styles.dropdown_link}`} href={item?.url ?? '/'}>
                                            <div className={styles.sub_category_container} onClick={closeCanvas}>
                                                <div className={styles.icon}>
                                                    {item?.image !== null && item?.image !== '' ?
                                                        <Image src={item?.image} alt='logo' height={50} width={50} loader={imageLoader} /> : ''}
                                                </div>
                                                <div>
                                                    <p className={styles.sub_category}>{item?.label}</p>

                                                </div>

                                            </div>

                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>) : ''}
        </>
    )
}

export default MobileDropdown;









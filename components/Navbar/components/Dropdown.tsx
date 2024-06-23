import React, { useState } from 'react';
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
    setIsDropdownOpen: (isOpen: boolean) => void;
}



const DropdownList: React.FC<DropdownListProps> = ({ sections, setIsDropdownOpen }) => {
    const imageLoader = ({ src, width, quality }: any) => {
        return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
    }

    const handleLinkClick = () => {
        setIsDropdownOpen(false)
    };

    return (
        <>
            {sections?.length > 0 ? (<div className='container-fluid'>
                <div className={styles.dropdown_content}>

                    <div className='row'>

                        {Array.isArray(sections) && sections?.length > 0 && sections?.map((section) => (
                            <div key={section?.seq} className='col-3 mt-5'>
                                <div className={styles.dropdown_category_container}>
                                    <Link href={section?.url ?? '/'}><span className={styles.dropdown_category} onClick={handleLinkClick}>{section?.label}</span></Link>
                                </div>

                                {Array.isArray(section?.values) && section?.values?.length > 0 && section?.values.map((item) => (
                                    <Link key={item?.seq} className={`${styles.dropdown_link}`} href={item?.url ?? '/'}>
                                        <div className={styles.sub_category_container} onClick={handleLinkClick}>
                                            <div className={styles.icon}>
                                                {
                                                    item?.image !== null && item?.image !== '' ?
                                                        <Image src={item?.image} alt='logo'
                                                            height={50} width={50} loader={imageLoader} /> : ''
                                                }
                                            </div>
                                            <div>
                                                <p className={styles.sub_category}>{item?.label}</p>
                                                <p className={styles.sub_category_description}>{item?.short_description ?? 'No data Available'}</p>
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

export default DropdownList;









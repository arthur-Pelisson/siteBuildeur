'use client'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/contextProvider/languageProvider';

const Maps = () => {
    const { language } = useLanguage();
    const [lg, setLg] = useState(language);

    useEffect(() => {
        setLg(language);
    }, [language])

    return (
        <>
            <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d695.7482404620932!2d4.8377683000000005!3d45.7713313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4eafb0dcd38b1%3A0x32a5174124335f73!2s8%20Quai%20Andr%C3%A9%20Lassagne%2C%2069001%20Lyon!5e0!3m2!1s${lg}!2s${lg}!4v1709370842226!5m2!1s${lg}!2s${lg}`} width="100%" height="100%" style={{ border: '0' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </>
    )
}

export default Maps
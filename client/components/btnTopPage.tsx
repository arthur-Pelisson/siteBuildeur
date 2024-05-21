import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React from 'react';

const BtnTopPage = ({color}) => {
    const handleClick = () => {
        const position = window.scrollY;
        if (position > 0) {
            for (let i = position; i >= 0; i--) {
                setTimeout(() => {
                    window.scrollTo(0, i);
                }, 0.1 * (position - i));
            }
        }
    };

    const iconStyle = {
        fill: color, // Utilisation de la couleur spécifiée dans la prop color
    };
    
    return (
        <button className='w-[50px] h-[50px] bg-slate-700 rounded-lg fixed  left-[calc(100%-60px)] top-[90%] z-50 ' onClick={handleClick}>{React.cloneElement(<ArrowUpwardIcon/>, { style: iconStyle })}</button>
    );
};

export default BtnTopPage;
'use client'
import { useLanguage } from "@/contextProvider/languageProvider";
import getParagraph from '@/components/getParagraph';
const Footer =() => {

    return (
        <footer className="footer bg-[#1976d2]" id="footer">
            <div className="text-center justify-center m-auto">
                <div className="text-sm  text-white">{getParagraph("footer")}</div>
            </div>
        </footer>
    )
}
export default Footer;
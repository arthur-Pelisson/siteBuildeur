import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useLanguage } from "@/contextProvider/languageProvider";
import "dayjs/locale/fr"; // Import the French locale
import Loading from './loading';
import { getPostByType } from "@/app/request/requestPost";
import { getTags } from "@/app/request/requestTag";
import { getTagsFromPost, setTagsFromPost } from "@/utils/getTagsFromPost";
import useTranslation from '@/hooks/translation/useTranslation';
import Link from "next/link";
import Tooltip from '@mui/material/Tooltip';

type TLanguage = {
  en: string[];
  fr: string[];
}

const WEEKDAYS_EN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", ];
const WEEKDAYS_FR = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const WEEK_SHORT_EN = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const WEEK_SHORT_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const Calendar = () => {
  const { language } = useLanguage()
  const [today, setToday] = useState(dayjs().locale(language));
  const [currentDate, setCurrentDate] = useState(today);
  const [weekNames, setWeekNames] = useState<TLanguage>({en: WEEKDAYS_EN, fr: WEEKDAYS_FR});
  const { response: responsePosts, Error: errorPosts, Loading: loadingPost, Success: successPosts } = getPostByType("event");
  // const { response: responseTags, Error: errorTags, Loading: loadingTags, fetchRequest, params } = getTags();

  useEffect(() => {
    setToday(dayjs().locale(language));
    setCurrentDate(dayjs().locale(language));
  }, [language]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWeekNamesByScreenSize();
    });
    setWeekNamesByScreenSize();
    return () => {
      window.removeEventListener("resize", () => {
        setWeekNamesByScreenSize();
      });
    }
  }, []);


  const setWeekNamesByScreenSize = () => {
    if (window.innerWidth < 768) {
      console.log("weekShort", weekShort)
      setWeekNames(weekShort);
    } else {
      console.log("weekdays", weekdays)
      setWeekNames(weekdays);
    }
  }
  

  const daysInMonth = useMemo(() => {
    return dayjs(new Date(currentDate.year(), currentDate.month() + 1, 0)).daysInMonth();
  }, [currentDate]);

  const weekdays = {
    en: WEEKDAYS_EN,
    fr: WEEKDAYS_FR,
  };

  const weekShort = {
    en: WEEK_SHORT_EN,
    fr: WEEK_SHORT_FR,
  }

  if (loadingPost) return <Loading display={true} notInModal={true} />
  return (
    <div>
      <MonthNavigation currentDate={currentDate} setCurrentDate={setCurrentDate}></MonthNavigation>
      <DaysMonth daysInMonth={daysInMonth} currentDate={currentDate} daysName={weekNames[language]} today={today} posts={responsePosts} language={language}/>
    </div>
  )
}

const MonthNavigation = ({currentDate, setCurrentDate}) => {

    const handleNextMonth = () => {
      if ( currentDate.month() === 11) {
        setCurrentDate(currentDate.add(1, "year"));
        setCurrentDate(currentDate.month(0));
      } 
      setCurrentDate(currentDate.add(1, "month"));
    } 

    const handlePreviousMonth = () => {
      if ( currentDate.month() === 0) {
        setCurrentDate(currentDate.subtract(1, "year"));
        setCurrentDate(currentDate.month(11));
      } 
      setCurrentDate(currentDate.subtract(1, "month"));
    }
    // console.log(currentDate)
    return (
     <div className="flex justify-center border-4">
      <button
         className="focus:outline-none w-[5rem]"
         aria-label="Previous Month"
         onClick={handlePreviousMonth}
       >
         ◀️
       </button>
         <h1 className="ml-2 mr-2 w-40 text-center text-lg">{currentDate.format("MMMM YYYY")}</h1>
       <button
         className="focus:outline-none w-[5rem]"
         aria-label="Next Month"
         onClick={handleNextMonth}
       >
         ▶️
       </button>
     </div>
    )
}

const DaysMonth = ({daysInMonth, currentDate, daysName, today, posts, language}) => {
  type TDay = {
    week: string;
    day: number;
    month: number;

  }
  const [days, setDays] = useState<TDay[] | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loopForDay()
  }, [currentDate, loading])


  const getDay = (day: number): any => {
    // console.log(today)
    return currentDate.date(day);
    // console.log(getDay);

  }

  const loopForDay = () => {
    const arrayDay: TDay[] = [];
    for (let i = 0; i < daysInMonth; i++) {
      const day = getDay(i+1);
      const week = day.format("dddd");
      const weekShort = day.format("ddd");
      const dayNumber = day.date();
      const month = day.month();
      const year = day.year();
      const Day = {
        week: week,
        weekShort: weekShort,
        day: dayNumber,
        month: month,
        year: year
      }
      arrayDay.push(Day);
    }
    setDays(arrayDay);
    setLoading(false);
    // console.log(arrayDay)
  }

  const eventTOday = (day) => {
    if (posts === null) return null;
      let eventArray: any = [];
      posts.map((post) => {
        const eventDay = dayjs(post.event_post.date_start).date();
        const EventMonth = dayjs(post.event_post.date_start).month();
        const EventYear = dayjs(post.event_post.date_start).year();

        // console.log("posteventstart: ", post.event_post.date_start)
        // console.log("day: ", day, "month: ", EventMonth, "year: ", EventYear)
        // console.log("today: ", day.day, day.month, day.year)
        if (eventDay === day.day && EventMonth === day.month && EventYear === day.year){
          return eventArray.push(post);
        }
      })

      const sortedArrayMinTOMAx = eventArray.sort((a, b) => {
        return dayjs(a.event_post.date_start).diff(dayjs(b.event_post.date_start));
        
      });
      return sortedArrayMinTOMAx;
  }

  const displayDay = (day, index) => {
    const { getTranslation } = useTranslation();
    const event = eventTOday(day);
    // console.log("event: ", event)
    let startGrid = 0;
    if (index === 0) {
      startGrid = daysName.indexOf(day.week.charAt(0).toUpperCase() + day.week.slice(1)) + 1;
      if (startGrid === 0) {
        startGrid = daysName.indexOf(day.weekShort.charAt(0).toUpperCase() + day.weekShort.slice(1, -1)) +1;
      }
    }

    let isToday = "";
    if (day.day === today.date() && today.month() === day.month && today.year() === day.year) {
      isToday = "bg-blue-500";
    }

    return (
      <div key={index} style={{gridColumnStart: startGrid}} className={`text-center col-span-1 border-1`}>
        <div className="w-[100%] h-[10rem] overflow-hidden overflow-y-auto">
          <div className="w-[100%] text-center" >
            <p className={`w-[1.5rem] m-auto ${isToday} rounded-full `}>{day.day}</p>
          </div>
          <div>
            {event !== null && event !== undefined && event.length > 0 && (
              <div className="w-[100%] h-[5rem] ">
                {event.map((post, index) => (
                  <div key={index} className="w-[100%] sm:h-[2rem] h-[3rem] bg-blue-500 border-1 overflow-hidden overflow-y-auto hide-scrollbar">
                    <Tooltip title={`${getTranslation(post.translations, "title", language )}: ${dayjs(post.event_post.date_start).format("HH:mm")}`}>
                      <Link href={`/events/?slug=${post.slug.replace(/ /g, "-")} `}>
                        <p>{getTranslation(post.translations, "title", language ) } : {dayjs(post.event_post.date_start).format("HH:mm")}</p>
                      </Link>
                    </Tooltip>
                  </div>
                ))} 
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  // console.log(daysName)
  if (loading || days === null || daysName === null || daysName === undefined) return <Loading display={true} notInModal={true} />
   return (
    <div className="grid grid-cols-7 gap-0 border-4 border-t-0">
      {daysName.map((weekday, index) => (
        <div key={index} className="text-center font-bold">
          {weekday}
        </div>
      ))}
      {days.map((day, index) => (
        displayDay(day, index)
      ))}
    </div>
  );
}
export default Calendar;
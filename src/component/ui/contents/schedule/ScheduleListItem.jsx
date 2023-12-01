import React from 'react';
import { CiCalendarDate } from "react-icons/ci";
import { GrLocationPin } from "react-icons/gr";
import { PiBusLight } from "react-icons/pi";

const ScheduleListItem = ({ day, date, location, transportation }) => {
    return (
        <div className='schedule-item'>
            <CiCalendarDate size={30}/>
            <div className='schedule-item-date'>{date}</div>
            <GrLocationPin size={20}/>
            <div className='schedule-item-location'>{location}</div>
            <PiBusLight size={30}/>
            <div className='schedule-item-transportation'>{transportation}</div>
        </div>
    );
}

export default ScheduleListItem;

import React from 'react';
import { CiCalendarDate } from "react-icons/ci";
import { GrLocationPin } from "react-icons/gr";
import { PiBusLight } from "react-icons/pi";

const ScheduleListItem = ({ day, date, location, transportation }) => {
    return (
        <div className='schedule-item'>
            <div className='schedule-icon'><CiCalendarDate size={30}/></div>
            <div className='schedule-item-date'>{date}</div>
            <div className='schedule-icon'><GrLocationPin size={20}/></div>
            <div className='schedule-item-location'>{location}</div>
            <div className='schedule-icon'><PiBusLight size={30}/></div>
            <div className='schedule-item-transportation'>{transportation}</div>
        </div>
    );
}

export default ScheduleListItem;

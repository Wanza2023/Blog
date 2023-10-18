import React from 'react';

const ScheduleListItem = ({ day, date, location, transportation }) => {
    return (
        <div className='schedule-item'>
        <div className='schedule-item-day'>{day}</div>
        <div className='schedule-item-date'>{date}</div>
        <div className='schedule-item-location'>{location}</div>
        <div className='schedule-item-transportation'>{transportation}</div>
        </div>
    );
}

export default ScheduleListItem;

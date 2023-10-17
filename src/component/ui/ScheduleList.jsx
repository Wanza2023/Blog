import React from 'react';
import ScheduleListItem from './ScheduleListItem';

const ScheduleList = ({ scheduleData }) => {
     return (
        <div className='schedule-items'>
        {scheduleData.map((item, index) => (
            <ScheduleListItem
            key={index}
            day={item.day}
            date={item.date}
            location={item.location}
            transportation={item.transportation}
            />
        ))}
        </div>
    );
}

export default ScheduleList;

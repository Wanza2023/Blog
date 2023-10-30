import React from 'react';
import ScheduleListItem from './ScheduleListItem';

const ScheduleList = ({ scheduleData }) => {
     return (
        <div className='schedule-items'>
        {scheduleData.map((item, index) => (
            <ScheduleListItem
            key={index}
            date={item.date}
            location={item.location}
            transportation={item.transport}
            />
        ))}
        </div>
    );
}

export default ScheduleList;

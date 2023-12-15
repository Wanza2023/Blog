import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart,Line } from 'recharts';

// 바 차트에 사용할 샘플 데이터
const data = [
    { name: '게시글1', views: 189},
    { name: '게시글2', views: 55},
    { name: '게시글3', views: 34},
    { name: '게시글4', views: 3},
    { name: '게시글5', views: 67},
    { name: '게시글6', views: 12},
    { name: '게시글7', views: 45 },
];

const data2 = [
    { name: '1월', 작성글: 5},
    { name: '2월', 작성글: 7},
    { name: '3월', 작성글: 16},
    { name: '4월', 작성글: 6},
    { name: '5월', 작성글: 12},
    { name: '6월', 작성글: 17},
    { name: '7월', 작성글: 23 },
    { name: '8월', 작성글: 5 },
    { name: '9월', 작성글: 0 },
    { name: '10월', 작성글: 12 },
    { name: '11월', 작성글: 21 },
    { name: '12월', 작성글: 8},
]

function PersonalStatistic() {
    return (
        <>
        <div>
            {/* ResponsiveContainer은 차트를 반응형으로 만듭니다 */}
            <ResponsiveContainer width="100%" height={500}>
                {/* BarChart는 바 차트의 컨테이너 역할을 합니다 */}
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    {/* CartesianGrid는 차트에 그리드를 추가합니다 */}
                    <CartesianGrid strokeDasharray="5 5" />
                    {/* XAxis는 차트의 x축을 나타냅니다 */}
                    <XAxis dataKey="name" />
                    {/* YAxis는 차트의 y축을 나타냅니다 */}
                    <YAxis />
                    {/* Tooltip은 바에 마우스를 올렸을 때 정보를 표시합니다 */}
                    <Tooltip />
                    {/* Legend는 차트의 범례를 표시합니다 */}
                    <Legend />
                    {/* Bar은 차트에서 각 바를 정의합니다 */}
                    {/* dataKey는 바에 사용할 데이터 속성을 지정합니다 */}
                    {/* fill은 바의 색상을 설정합니다 */}
                    <Bar dataKey="views" fill="#5076ff" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        <div>
            <ResponsiveContainer width="100%" height={500}>
                <LineChart data={data2} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    {/* Tooltip은 바에 마우스를 올렸을 때 정보를 표시합니다 */}
                    <Tooltip />
                    {/* Legend는 차트의 범례를 표시합니다 */}
                    <Legend />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="작성글" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
        </>
    );
}

export default PersonalStatistic;

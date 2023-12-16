import React,{useEffect,useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,LineChart,Line } from 'recharts';
import axios from 'axios';
import "../../../styles/component/PersonalStatistic.css";

function PersonalStatistic() {

    const [views, setViews] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const memberId = sessionStorage.getItem('memberId');
            try {
                const responsePost = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/${memberId}/dashboard/posts`);
                const responseView = await axios.get(`${process.env.REACT_APP_BOARD_API_KEY}/${memberId}/dashboard/views`);

                if (responsePost.status === 200 && responseView.status === 200) {
                    setPosts(responsePost.data.body);
                    setViews(responseView.data.body);
                }
                else {
                    console.error('Invalid response data format');
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className='statistic-view-container'>
                <div className='statistic-title'>내가 쓴 게시글 조회수 순위</div>
                {/* ResponsiveContainer은 차트를 반응형으로 만듭니다 */}
                <ResponsiveContainer width="100%" height={500}>
                    {/* BarChart는 바 차트의 컨테이너 역할을 합니다 */}
                    <BarChart data={views} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        {/* CartesianGrid는 차트에 그리드를 추가합니다 */}
                        <CartesianGrid strokeDasharray="5 5" />
                        {/* XAxis는 차트의 x축을 나타냅니다 */}
                        <XAxis dataKey="title" />
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
            <div className='statistic-log-container'>
                <div className='statistic-title'>나의 블로그 월별 기록</div>
                <ResponsiveContainer width="100%" height={500}>
                    <LineChart data={posts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        {/* Tooltip은 바에 마우스를 올렸을 때 정보를 표시합니다 */}
                        <Tooltip />
                        {/* Legend는 차트의 범례를 표시합니다 */}
                        <Legend />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default PersonalStatistic;

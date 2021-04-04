import React from 'react';
import './Statistic.scss';
import {StatisticItem} from "./StatisticItem/StatisticItem";

const Statistic = ({data, statistic}) => {

    return (
        <section className={"section section-statistic"}>
            <div className={"statistic-wrapper"}>
                {
                    data.map(item => <StatisticItem
                        statistic={statistic}
                        key={item.name}
                        name={item.name}
                        value={item.value}
                        list={item.list}/>)
                }
            </div>
        </section>
    );
};

export default Statistic
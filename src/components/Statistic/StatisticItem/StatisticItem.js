import React from 'react';
import './StatisticItem.scss';

export const StatisticItem = ({name, value, list, statistic}) => {

    const [active, setActive] = React.useState(false);
    const listRef = React.useRef();
    const wrapperRef = React.useRef();

    const setDropdown = (state) => {
        if (statistic && list) {
            wrapperRef.current.style.height = state ? `${listRef.current.scrollHeight}px` : 0
            setActive(state);
        }
    };

    const getValue = (value) => {
        value = statistic[value];
        return value
    }

    return (
        <div className={`statistic-item ${list ? "list" : ""}`}>
            <div onClick={() => setDropdown(!active)} className={`statistic-item-title ${active ? "active" : ""}`}>
                <p>
                    <span>{name}</span>
                    {list && <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6L8 0H0L4 6Z" fill="#373A3C"/>
                    </svg>
                    }
                </p>
                <p className={statistic ? "" : "placeholder"}>{statistic ? getValue(value) : ""}</p>
            </div>
            {statistic && list && <div ref={wrapperRef} style={{height: 0}} className={`list-wrapper ${active ? "active" : ""}`}>
                <ul ref={listRef}>
                    {getValue(list).map(item => <li key={item}>{item}</li>)}
                </ul>
            </div>}
        </div>
    );
};
import React from 'react';
import './App.scss';

import {Btn} from "./components/Btn/Btn";
import {Loader} from "./components/Loader/Loader";
import axios from "axios";
import Statistic from "./components/Statistic/Statistic";


function App() {

    const [formState, setFormState] = React.useState();
    const [state, setState] = React.useState({
        isInit: false,
        isPending: false,
        isOnline: false,
        statisticSchema: [
            {
                name: "Название сервера:",
                value: "serverName"
            },
            {
                name: "Версия сервера:",
                value: "version"
            },
            {
                name: "Порт:",
                value: "port"
            },
            {
                name: "Название мира:",
                value: "map"
            },
            {
                name: "Максимальное количество игроков:",
                value: "maxPlayers"
            },
            {
                name: "Игроков онлайн:",
                value: "onlinePlayers",
                list: "players"
            }
        ],
        error: ""

    });

    React.useEffect(() => {
        if (!state.isInit) {

            setState({...state, isPending: true})

            axios.get("http://35.207.113.215:3000/stats", {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
                .then((res) => {
                    setState({
                        ...state,
                        isInit: true,
                        isOnline: true,
                        isPending: false,
                        statistic: res.data
                    })
                })
                .catch((rel) => {
                    setState({
                        ...state,
                        isInit: true,
                        isPending: false,
                        error: rel.response.data.message ? rel.response.data.message : rel.error.toString()
                    })
                })
        }
    }, [state.isInit])


    return (
        <div className="App">
            <div className={"container"}>
                <header>
                    <h1>Mine Stats</h1>
                    <div
                        className={`status ${state.isOnline ? "online" : state.isPending ? "pending" : "offline"}`}></div>
                </header>


                <div className={"error"}>{state.error}</div>


                <Statistic statistic={state.statistic} data={state.statisticSchema}/>

                <form className={"console-form"}>
                    <div className={`area ${!formState ? "error" : ""}`}>
                        <input
                            onChange={(value) => setFormState(value.currentTarget.value)}></input>
                    </div>
                    <Btn callback={""} text={"Отправить"}/>
                </form>

                <Btn text={"Btn 1"}/>
                <Btn text={"Btn 2"} className={"orange"}/>
                <Btn text={"Btn 3"} className={"red"}/>
            </div>
        </div>
    );
}

export default App;

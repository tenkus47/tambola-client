import React, { useState, useEffect, useRef } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import "./style/play.css";
import { socket } from "../socket";
import { useSelector, useDispatch } from "react-redux";
import { Howl } from "howler";
import TicketListSelf from "./TicketList";
import axios from "axios";
import { serverURL } from "../server";
import Timer from './Timer'
import cheersound from "../sound/cheer.mp3";
import { Link } from "react-router-dom";
import GameTime from "./GameTime";
import TicketView from "./TicketView";
import { soundfile } from "../soundtext/soundtext";

var instalink = "lhasa_tambola_official";
var telelink = "https://t.me/joinchat/ke1BmVpym7Q4ZGM1";

function GameView() {
  var voices = {
    default: false,
    lang: "en-US",
    localService: true,
    name: "Microsoft Zira - English (United States)",
    voiceURI: "Microsoft Zira - English (United States)",
  };

  const { width, height } = useWindowSize();
  const myticket = useRef(null);
  const [timeset, setTimeset] = useState(false);
  const [showpopup, setShowpopup] = useState(true);
  const [showAnounced, setAnounced] = useState(false);
  const [showElement, setShowElement] = useState({});
  var id1 = null;
  const { speak } = useSpeechSynthesis();
  const dispatch = useDispatch();
  const { random, list } = useSelector((state) => state.NumberGenerate);
  const [clicked, setclicked] = useState(false);
  const arrayInitial = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
    79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  ];
  const [winnerlist, setwinnerlist] = useState();
  const [gamefinished, Setgamefinished] = useState(false);
  const [listofwinner, setlistofwinner] = useState(false);
  const [date, setDate] = useState(null);
  const [table, setTable] = useState();
  var anouncedN = useRef();

  useEffect(() => {
    axios.get(serverURL + "/getwinnerlist").then((res) => {
      if (res.data[res.data.length - 1]?.thirdfullhouseWinner.length > 0) {
        var newDate = res.data[res.data.length - 1].date;
        var daten = new Date(
          newDate.getTime() + newDate.getTimezoneOffset() * 60 * 1000
        );
        var writedate = `${daten.getDate()}-${daten.getMonth()}-${daten.getFullYear()}`;
        setDate(writedate);
        setwinnerlist({
          firstlineWinner: res.data[res.data.length - 1].firstlineWinner,
          secondlineWinner: res.data[res.data.length - 1].secondlineWinner,
          thirdlineWinner: res.data[res.data.length - 1].thirdlineWinner,
          fourcornerWinner: res.data[res.data.length - 1].fourcornerWinner,
          tempwinner: res.data[res.data.length - 1].temperatureWinner,
          q5winner: res.data[res.data.length - 1].quickfiveWinner,
          fullhouseWinner: res.data[res.data.length - 1].fullhouseWinner,
          secondfullhouseWinner:
            res.data[res.data.length - 1].secondfullhouseWinner,
          thirdfullhouseWinner:
            res.data[res.data.length - 1].thirdfullhouseWinner,
        });
        setlistofwinner(true);
      }
    });
  }, []);

  useEffect(() => {
    const fetcher = async () => {
      var { data } = await axios.get(serverURL + "/anounced");
      var res = data[data.length - 1];
      anouncedN.current = {
        list: res?.list,
        random: res?.random,
      };
    };
    fetcher();
  }, [random]);

  useEffect(() => {
    var id = showElement.id ? parseInt(showElement.id) : 0;
    const fetcher = async () => {
      var res = await axios.get(serverURL + `/getlist/${id}`);
      setTable(res.data[0]);
    };
    fetcher();
  }, [showElement]);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("number", (item, list) => {
      dispatch({ type: "update", item, list });
    });

    socket.on("gamefinished", (data) => {
      setTimeout(() => {
        Setgamefinished(true);
      }, 4000);
    });
    socket.on("winnerlist", (data) => {
      setwinnerlist(data);
      console.log(data);
    });
    socket.on("gotoend", (data) => {
      alert(data);
    });
    socket.on("serverdown", (data) => {
      alert(data);
      window.location = "/play";
    });
    return () => socket.disconnect();
  }, [clicked]);
  var showRand = "";
  useEffect(() => {
    var single = "";
    if (random > 1 && random < 10) {
      single = "single number ";
    }
    speak({
      text: soundfile[random - 1],
      voice: voices,
    });
    setTimeout(() => {
      speak({
        text: `${single} ${random}`,
        voice: voices,
      });
    }, 1500);

    showRand = random;
    setInterval(() => {
      showRand = "";
    }, 3000);
  }, [random]);



  function mapped(item, index) {
    return (
      <button
        key={index}
        type="button"
        onClick={() => setShowElement({ name: item[0], id: item[1] })}
      >
        <span style={{ display: "block" }}>
          {item[0]} Ticket:{item[1]}
        </span>
      </button>
    );
  }
  if (listofwinner) {
    if (timeset) {
      return (
        <div className="popup">
          <div className="message">
            <h3 className="message-heading text-animation">
              Game has Completed
            </h3>
            <div>
              Winners will be Given Prices soon , Thank you for playing
              <center>
                {" "}
                <a
                  href="/play"
                  style={{
                    color: "lightgreen",
                    textTransform: "uppercase",
                    fontSize: 40,
                  }}
                >
                  Lhasa Tambola
                </a>
              </center>
            </div>
            <h4>
              Winner list of Date: <GameTime />
            </h4>
            <div style={{ fontWeight: 700, display: "block" }}>
              {" "}
              Shuffled number with order:
            </div>
            <div
              className="listofAnounced"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {anouncedN.current?.list?.map((item) => (
                <div
                  style={{
                    margin: 3,
                    backgroundColor: "red",
                    border: "pink 1px solid",
                    color: "white",
                    fontWeight: 500,
                  }}
                  key={item}
                >
                  {item}
                </div>
              ))}
            </div>

            {showElement.name ? (
              <div>
                <h3>
                  {" "}
                  {showElement.name} : {showElement.id}{" "}
                </h3>
                <TicketView
                  ticketdata={table?.ticket}
                  color={"hsl(134,49%,70%)"}
                />
              </div>
            ) : null}
            {winnerlist && (
              <div className="winnerboard">
                <div className="listElement">
                  quick five : {winnerlist?.q5winner.map(mapped)}{" "}
                </div>
                {/* <div className='listElement '>temperature  :  {winnerlist?.tempwinner.map(mapped)}  </div> */}
                <div className="listElement">
                  Four corner : {winnerlist?.fourcornerWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  First line : {winnerlist?.firstlineWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Second line : {winnerlist?.secondlineWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Third line : {winnerlist?.thirdlineWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  First fullhouse : {winnerlist?.fullhouseWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Second fullhouse :{" "}
                  {winnerlist?.secondfullhouseWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Third fullhouse :{" "}
                  {winnerlist?.thirdfullhouseWinner.map(mapped)}{" "}
                </div>
              </div>
            )}
            <center>
              <Link
                to="/Ticketlist"
                style={{
                  textDecoration: "none",
                  color: "black",
                  backgroundColor: "orange",
                  padding: 10,
                  borderRadius: 10,
                  cursor: "pointer",
                  marginTop: 30,
                }}
              >
                Show the list of Tickets
              </Link>
            </center>
          </div>
        </div>
      );
    } else {
      var sound = new Howl({
        src: [cheersound],
      });
      id1 = sound.play();
      setTimeout(() => {
        sound.stop();
        setTimeset(true);
      }, 4000);

      return (
        <div className="popup">
          <div className="message">
            <img
              src="https://i.gifer.com/9MeP.gif"
              alt="won-image"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>
      );
    }
  }

  if (showpopup) {
    return (
      <div className="popup1">
        <Confetti width={width} height={height} />
        <div className="message">
          <h3 className="message-heading text-animation">!!ANOUNCEMENT!!</h3>
          <p>
            TAMBOLA is a skill base game considered by supreme court of india.
            Its legal all over India except in Odhisa and Assam. The game is
            design for fun and enjoyment. We have variety of prize to be win. We
            always ensure the game to be enjoyable by keeping many prize as
            possible for players.
          </p>
          <div>
            None of the employee, agents or owner themself of
            <center>
              {" "}
              <span
                style={{
                  color: "lightgreen",
                  textTransform: "uppercase",
                  fontSize: 40,
                }}
              >
                Lhasa Tambola
              </span>
            </center>{" "}
            can participate in the game. Game will be redraw in case of server
            fault or in case of any technical issue during the game. Tickets can
            not be cancel out in case there is a redraw of the game.
          </div>{" "}
        </div>
        <p> we donate ₹1 from every ticket you buy to a needy one! </p>
        <p> so make your contribution and enjoy the game </p>

        <button
          type="button"
          onClick={() => setShowpopup(false)}
          style={{ marginTop: 20, backgroundColor: "orange", padding: 10 }}
        >
          I Accept
        </button>
      </div>
    );
  }

  if (gamefinished) {
    if (timeset) {
      return (
        <div className="popup">
          <div className="message">
            <h3 className="message-heading text-animation">
              Game has Completed
            </h3>
            <div>
              Winners will be Given Prices soon , Thank you for playing
              <center>
                {" "}
                <span
                  style={{
                    color: "lightgreen",
                    textTransform: "uppercase",
                    fontSize: 40,
                  }}
                >
                  Lhasa Tambola
                </span>
              </center>
            </div>
            <div style={{ fontWeight: 700, display: "block" }}>
              {" "}
              Shuffled number with order:
            </div>
            <div
              className="listofAnounced"
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                margin: "30px 0",
              }}
            >
              {anouncedN?.current?.list?.map((item, index) => (
                <span
                  style={{
                    fontSize: 14,
                    width: 30,
                    borderRadius: "50%",
                    backgroundColor: "red",
                    border: "blue 2px solid",
                    color: "white",
                    fontWeight: 500,
                    marginLeft: "5px",
                    marginBottom: "2px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  key={index}
                >
                  {item}
                </span>
              ))}
            </div>
            <h4>
              Winner list of <GameTime />{" "}
            </h4>
            {winnerlist && (
              <div className="winnerboard">
                <div className="listElement">
                  quick five : {winnerlist?.q5winner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Four corner : {winnerlist?.fourcornerWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  First line : {winnerlist?.firstlineWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Second line : {winnerlist?.secondlineWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Third line : {winnerlist?.thirdlineWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  First fullhouse : {winnerlist?.fullhouseWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Second fullhouse :{" "}
                  {winnerlist?.secondfullhouseWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Third fullhouse :{" "}
                  {winnerlist?.thirdfullhouseWinner.map(mapped)}{" "}
                </div>
              </div>
            )}
          </div>
          {showElement.name ? (
            <div>
              <h3>
                {" "}
                {showElement.name} : {showElement.id}{" "}
              </h3>
              <TicketView
                ticketdata={table?.ticket}
                color={"hsl(134,49%,70%)"}
              />
            </div>
          ) : null}
          <center>
            <Link
              to="/Ticketlist"
              style={{
                textDecoration: "none",
                color: "black",
                backgroundColor: "orange",
                padding: 10,
                borderRadius: 10,
                cursor: "pointer",
                marginTop: 20,
              }}
            >
              Show the list of Tickets
            </Link>
          </center>
        </div>
      );
    } else {
      var sound = new Howl({
        src: [cheersound],
      });
      id1 = sound.play();
      setTimeout(() => {
        sound.stop();
        setTimeset(true);
      }, 4000);

      return (
        <div className="popup">
          <div className="message">
            <img
              src="https://i.gifer.com/9MeP.gif"
              alt="won-image"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>
      );
    }
  }

  if (!showpopup && !gamefinished) {
    return (
      <div className="gameView">
        <a
          href="/play"
          style={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            textDecoration: "none",
          }}
        >
          {" "}
          <h1
            className="text-animation center title"
            style={{ backgroundColor: "white", width: "100vw" }}
          >
            <Confetti width={width - 10} height={70} numberOfPieces={50} />
            Lhasa Tambola
          </h1>
        </a>

        <center>
          <h6 style={{ marginTop: "30%", paddingTop: 10 }}>
            Don't panic if you dont see your ticket in list, just refresh the
            page
          </h6>
        </center>
         <Timer/>
        <GameTime />
        <center>
          <img
            src="https://i.gifer.com/xt.gif"
            alt="imgofgif"
            style={{ width: 120, height: 90, borderRadius: 10 }}
          />
        </center>
        {!random && (
          <center>
            {" "}
            <h3>The game will start soon, Kindly “Have Patience” </h3>
          </center>
        )}

        {/* {  
          showRand? (<div style={{position:'absolute',top:20,right:20}}>{showRand}</div>)
          :null
        } */}
        <center>
          {" "}
          {showElement.name ? (
            <div>
              <h3>
                {" "}
                {showElement.name} : {showElement.id}{" "}
              </h3>
              <TicketView
                ticketdata={table?.ticket}
                color={"hsl(134,49%,70%)"}
              />
            </div>
          ) : null}{" "}
        </center>
        {list.length > 0 && (
          <center>
            <button type="button" onClick={() => setAnounced((prev) => !prev)}>
              {" "}
              Show anounced list with order
            </button>
          </center>
        )}
        <center>
          {" "}
          <div
            style={{
              display: "flex",
              padding: 2,
              flexWrap: "wrap",
              maxWidth: 400,
              margin: "30px 20px",
              width: "100vw",
            }}
          >
            {showAnounced &&
              list.map((item, index) => {
                const lastvalue = list[list.length - 1];

                return (
                  <span
                    style={
                      lastvalue === item
                        ? {
                            fontSize: 20,
                            width: 30,
                            borderRadius: "50%",
                            backgroundColor: "red",
                            border: "blue 2px solid",
                            color: "white",
                            fontWeight: 500,
                            marginLeft: "5px",
                            marginBottom: "2px",
                          }
                        : {
                            width: 30,
                            borderRadius: "50%",
                            backgroundColor: "red",
                            border: "blue 2px solid",
                            color: "white",
                            fontWeight: 500,
                            marginLeft: "5px",
                            marginBottom: "2px",
                          }
                    }
                    key={index}
                  >
                    {item}
                  </span>
                );
              })}
          </div>
        </center>
        <center>
          <div className="board">
            {winnerlist && (
              <div className="winnerboard">
                <h1>winnerlist</h1>
                <div className="listElement">
                  quick five : {winnerlist?.q5winner.map(mapped)}{" "}
                </div>
                {/* <div className='listElement '>temperature  :  {winnerlist?.tempwinner.map(mapped)}  </div> */}
                <div className="listElement">
                  Four corner : {winnerlist?.fourcornerWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  First line : {winnerlist?.firstlineWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Second line : {winnerlist?.secondlineWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Third line : {winnerlist?.thirdlineWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  First fullhouse : {winnerlist?.fullhouseWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Second fullhouse :{" "}
                  {winnerlist?.secondfullhouseWinner.map(mapped)}{" "}
                </div>
                <div className="listElement">
                  Third fullhouse :{" "}
                  {winnerlist?.thirdfullhouseWinner.map(mapped)}{" "}
                </div>
              </div>
            )}
          </div>
        </center>
        <br />
        <center>
          <Link
            to="/Ticketlist"
            style={{
              textDecoration: "none",
              color: "black",
              backgroundColor: "orange",
              padding: 10,
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            Ticket List
          </Link>
        </center>
        <br />
        {!random && (
          <div>
            {" "}
            <br />
            <center>
              <Link
                to="/ShowAvailable"
                style={{
                  textDecoration: "none",
                  color: "black",
                  backgroundColor: "orange",
                  padding: 10,
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                Remaining Tickets
              </Link>
            </center>
            <br />
          </div>
        )}
        {random ? (
          <center>
            <div className="anounced-num"> {random}</div>
          </center>
        ) : null}
        <br />

        <center>
          <div className="anounced-list">
            {arrayInitial.map((item, index) => (
              <button
                style={
                  list.includes(item)
                    ? {
                        borderWidth: 10,
                        borderColor: "black",
                        borderRadius: 20,
                        backgroundColor:
                          item === list[list.length - 1] ? "red" : "green",
                        color:
                          item === list[list.length - 1] ? "black" : "white",
                        fontSize:
                          item === list[list.length - 1] ? 18 : "inherit",
                      }
                    : {
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: "50%",
                      }
                }
                type="text"
                key={index}
                className="btn-board"
              >
                {item}
              </button>
            ))}
          </div>
        </center>
        <center>
          <label htmlFor="ticketsearch" className="searchlabel">
            Enter your Registered Mobile no{" "}
          </label>
          <input
            id="ticketsearch"
            type="text"
            placeholder="search your mobile no."
            style={{
              marginTop: 30,
              padding: 10,
              fontFamily: "sans-serif",
              color: "purple",
              borderRadius: 10,
            }}
            onChange={(e) => {
              myticket.current = e.target.value;
            }}
          />
          <input
            type="button"
            style={{ padding: 7, marginLeft: 10, borderRadius: 10 }}
            value="search"
            onClick={() => {
              setclicked((prev) => !prev);
            }}
          />
        </center>
        <div className="listOfTicket">
          {myticket.current !== null && (
            <TicketListSelf page="public" list={list} id={myticket.current} />
          )}
        </div>

        <footer style={{ paddingLeft: 20, marginTop: 80 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <a
              href={telelink}
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              {" "}
              Join our Telegram
            </a>
            <a
              href="http://m.instagram.com"
              style={{
                textDecoration: "none",
                color: "black",
                cursor: "pointer",
              }}
            >
              Follow on Instragram : {instalink}
            </a>
            <a href="https://wa.me/8744948878">
              {" "}
              Our Agent Watsapp : 8744948878
            </a>
          </div>

          <h6>programed by T.K</h6>
        </footer>
      </div>
    );
  }
}

export default GameView;

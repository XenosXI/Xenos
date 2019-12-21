import React from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";
import Input from "./Input";
import axios from "axios";
const subjects = ["Angular", "React", "Golang"];
const targetDate = moment("12/21/2900 18:00:00");
function App() {
  const [name, setName] = React.useState("");
  const [mail, setMail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [check, setCheck] = React.useState(false);
  const [timer, setTimer] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading,setIsLoading] = React.useState(false);
  const handleSubmit = () => {
    setIsLoading(true);
    axios.get("http://www.mocky.io/v2/5dfde561310000ed1ac96e39?mocky-delay=4000ms&fbclid=IwAR1NA3y26FW1O25k8aa1PfjUiz1_dYuwyV9-QjmwHFX9bc9GSbQ_Tx9IHu0")
    .then(response =>{
      const { data } = response
      setMessage(data.response)
      setIsLoading(false);
    })
  };
  const clickcancel = () => {
    setMessage("Fail");
  }
  const updateTimer = () => {
    const diffHours = targetDate.diff(moment(), "hours");
    const diffMinutes = targetDate.diff(moment(), "minutes") % 60;
    const diffSeconds = targetDate.diff(moment(), "seconds") % 60;
    setTimer(
      `${diffHours} hours ${diffMinutes} minutes ${diffSeconds} seconds`
    );

    console.log(diffHours);
  };
  React.useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    axios
      .get("http://www.mocky.io/v2/5dfde8a6310000551ec96e5b")
      .then(response =>{
        setSubject(response.data.subject);
      })
    return () => clearInterval(interval); //always
    updateTimer(); //work when refresh only
  }, []);
  console.log("State", { name, mail, subject, check });
  return (
    <div className="App">
      <div className="field">
        <div className="title">React Register</div>
        <p>Form ends in</p>
        <p>{timer}</p>
        <Input
          label="Name"
          value={name}
          onChangeFromComponent={value => setName(value)}
        />
        <Input
          label="Email"
          value={mail}
          onChangeFromComponent={value => setMail(value)}
        />
      </div>
      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select
              value={subject}
              onChange={event => setSubject(event.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              value={check}
              onChange={event => setCheck(event.target.checked)}
            />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button className={`button is-link ${isLoading && "is-loading"}`} onClick={handleSubmit} disabled={isLoading}>
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light" onClick={clickcancel}>Cancel</button>
        </div>
      </div>
      <p>{message}</p>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}
export default App;

// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    start: false,
    pause: false,
    minutes: 25,
    prevSeconds: 0,
    activeLimit: true,
  }

  convertingTime = () => {
    const {minutes, prevSeconds} = this.state
    const totalTime = minutes * 60 - prevSeconds
    const minutess = Math.floor(totalTime / 60)
    const seconds = Math.floor(totalTime % 60)
    const stringifiedMinutes = minutess < 10 ? `0${minutess}` : minutess
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  decresingseconds = () => {
    /* const {start, minutes, seconds, prevSeconds} = this.state
    this.setState(prevState => ({
      prevSeconds: prevState.prevSeconds + 1,
    })) */
    this.setState(prevState => {
      const newPrevSeconds = prevState.prevSeconds + 1
      const totalTime = prevState.minutes * 60 - newPrevSeconds
      if (totalTime <= 0) {
        clearInterval(this.interval)
        return {
          start: false,
          prevSeconds: prevState.minutes * 60, // Display 00:00
          activeLimit: false, // Keep buttons disabled
        }
      }
      return {prevSeconds: newPrevSeconds, activeLimit: false}
    })
  }

  /*
  startANDpause = () => {
    const {start} = this.state
    if (start) {
      this.setState(prevState => ({start: !start}))
      this.interval = setInterval(this.decresingseconds, 1000)
    } else {
      this.setState(prevState => ({start: !start}))
    }
  } */

  startANDpause = () => {
    const {start} = this.state
    if (!start) {
      this.interval = setInterval(this.decresingseconds, 1000)
    } else {
      clearInterval(this.interval)
    }
    this.setState(prevState => ({
      start: !prevState.start,
      activeLimit: false,
    }))
  }

  onDecrease = () => {
    const {minutes} = this.state
    if (minutes > 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes - 1,
      }))
    }
  }

  onIncrease = () => {
    const {minutes} = this.state
    if (minutes >= 0) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
      }))
    }
  }

  resetButton = () => {
    this.setState(prevState => ({
      start: false,
      minutes: 25,
      prevSeconds: 0,
      activeLimit: true,
      limitHeading: 25,
    }))
    clearInterval(this.interval)
  }

  render() {
    const timer = this.convertingTime()
    const {
      start,
      pause,
      minutes,
      seconds,
      activeLimit,
      limitHeading,
    } = this.state

    const startPause = start ? 'Pause' : 'Start'
    const runningStatus = start ? 'Running' : 'Paused'
    const StartandPause = start
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const imageAlt = start ? 'pause icon' : 'play icon'

    return (
      <div className="Container">
        <h1 className="heading">Digital Timer</h1>
        <div className="card-container">
          <div className="time-container">
            <div className="running-container">
              <h1 className="timer">{timer}</h1>
              <p className="timer-para">{runningStatus}</p>
            </div>
          </div>
          <div className="tools-container">
            <div className="start-pause-Container">
              <button
                className="start-container"
                type="button"
                onClick={this.startANDpause}
              >
                <img
                  src={StartandPause}
                  alt={imageAlt}
                  className="start-image"
                />
                {start ? 'Pause' : 'Start'}
              </button>
              <button
                className="start-container"
                type="button"
                onClick={this.resetButton}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="start-image"
                  alt="reset icon"
                />
                Reset
              </button>
            </div>
            <p className="set-heading">Set Timer Limit</p>
            <div className="limit-container">
              <button
                type="button"
                className="limit-symbols"
                disabled={!activeLimit}
                onClick={this.onDecrease}
              >
                -
              </button>
              <p className="limit-number">{minutes}</p>
              <button
                type="button"
                className="limit-symbols"
                disabled={!activeLimit}
                onClick={this.onIncrease}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

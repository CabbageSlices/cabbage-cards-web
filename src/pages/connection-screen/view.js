import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import ExplodingCat from './exploding.png'

const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  width: 600,
  paddingTop: 30,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch'
}

const imageStyle = {
  width: '80%',
  marginTop: '5%'
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '60%',
  borderRadius: 5,
  border: '1px solid #000000',
  padding: 20
}

const playerInputStyle = {
  width: '50%',
  height: 30,
  marginBottom: 30,
  fontSize: 16,

}

const roomInputStyle = {
  width: '50%',
  height: 30,
  fontSize: 16,
  marginBottom: 30,
  boxShadow: 'none'
}

const buttonStyle = {
  width: '25%',
  height: 30,
  backgroundColor: 'white',
  boxShadow: 0
}

// initial screen where players input the room code and their name
const ConnectionScreen = (props) => {
  console.log(props)
  return (
    <center>
      <div style={pageStyle}>
        <img src={ExplodingCat} alt="" style={imageStyle} />
        <div style={containerStyle}>
          <input
            style={playerInputStyle}
            type="text"
            placeholder="Player Name"
            id="playerNameField"
            onChange={props.setPlayerName.bind(this)} value={props.playerName}
          />
          <input
            style={roomInputStyle}
            type="text"
            placeholder="Room Code"
            id="roomCodeField"
            onChange={props.setRoomCode.bind(this)}
            value={props.roomCode}
          />
          <button style={buttonStyle} onClick={props.connectToServer} id="connectButton">Connect</button>
        </div>
      </div>
    </center>
  )
}

ConnectionScreen.propTypes = {
  connectToServer: PropTypes.func.isRequired,
  setPlayerName: PropTypes.func.isRequired,
  setRoomCode: PropTypes.func.isRequired,
  playerName: PropTypes.string,
  roomCode: PropTypes.string
}

ConnectionScreen.defaultProps = {
  playerName: '',
  roomCode: ''
}

export default ConnectionScreen

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import './style/cell.css';

const cellCss = {
  cell: {
    flexShrink: 0,
    border: '1px solid rgba(0,0,0, .45)',
    borderTop: 0,
    borderLeft: 0,
  },
  cellDiv: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .45)',
  },
};

class Cell extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    isToday: PropTypes.bool,
  }
  static defaultProps = {
    width: 100,
    height: 60,
    isToday: false,
  }

  constructor (props) {
    super(props);
  }

  render () {
    const { width, height, data, isToday } = this.props;
    const cellStyle = {
      ...cellCss.cell,
      width,
      height,
      position: 'relative',
    };
    const todayStyle = {
      height: 1,
      width: '100%',
      background: 'red',
      top: moment().minute() / 60 * height,
      position: 'absolute',
    };
    const circleStyle = {
      display: 'block',
      height: 5,
      width: 5,
      borderRadius: '50%',
      background: 'red',
      position: 'absolute',
      top: -1,
      left: width * 0.5 - 5,
    };

    console.log('data: ')
    console.log(data)
    if (data.length === 0) {
      return (
        <div
          className="cell"
          style={cellStyle}
        >
          <div style={{ width, height }} />
          { isToday ? <div style={todayStyle}><span style={circleStyle} /></div> : null}
        </div>
      );
    }
    const d = data[0];
    const dStartMinute = parseInt(d.startTime.split(':')[1]);
    const dEndMinute = parseInt(d.endTime.split(':')[1]);
    const liStyle = {
      ...cellCss.cellDiv,
      height: dEndMinute - dStartMinute / 60 * height,
      width,
      background: 'rgba(0, 200, 0, .8)',
      borderLeft: '3px solid red',
    };
    return (
      <div
        className="cell"
        style={cellStyle}
      >
        <div style={liStyle}>{d.courseCategoryName}</div>
        { isToday ? <div style={todayStyle} /> : null}
      </div>
    );
  }
}

export default Cell;
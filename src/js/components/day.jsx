import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import Timeslot from './timeslot.jsx';

import {
  DEFAULT_TIMESLOT_FORMAT,
  DEFAULT_TIMESLOT_SHOW_FORMAT,
} from '../constants/day.js';

import {
  DEFAULT,
  DISABLED,
} from '../constants/timeslot.js';

export default class Day extends React.Component {

  render() {
    const dayClassNames = classnames({
      'tsc-day': true,
    });

    return (
      <div className = { dayClassNames }>
        { this._renderTitle() }
        { this._renderTimeSlots() }
      </div>
    );
  }

  _renderTitle() {
    const {
      renderTitle,
      momentTime,
    } = this.props;

    return (
      <div className = "tsc-day__title">
        <span>{renderTitle(momentTime)}</span>
      </div>
    );
  }

  _renderTimeSlots() {
    const {
      timeslots,
      timeslotFormat,
      timeslotShowFormat,
      momentTime,
      initialDate,
    } = this.props;

    return timeslots.map((slot, index) => {
      let description = '';
      for (let i = 0; i < slot.length; i ++){
        description += moment(slot[i], timeslotFormat).format(timeslotShowFormat);
        if (i < (slot.length - 1)){
          description += ' - ';
        }
      }
      let timeslotDate = momentTime.clone();
      timeslotDate.add(slot[0], timeslotFormat);

      let status = DEFAULT;
      if (timeslotDate.isBefore(initialDate) || timeslotDate.isSame(initialDate)) {
        status = DISABLED;
      }


      return (
        <Timeslot
          key = { index }
          description = { description }
          onClick = { this._onTimeslotClick.bind(this, index) }
          status = { status }
        />
      );
    });
  }

  _onTimeslotClick(index) {
    const {
      onTimeslotClick,
    } = this.props;

    onTimeslotClick(index);
  }
}

Day.defaultProps = {
  timeslotFormat: DEFAULT_TIMESLOT_FORMAT,
  timeslotShowFormat: DEFAULT_TIMESLOT_SHOW_FORMAT,
  renderTitle: (momentTime) => {
    return momentTime.format('dddd (D)');
  },
};

/**
 * @type {String} timeslotFormat: format used by moment when identifying the timeslot
 * @type {String} timslotShowFormat: format to show used by moment when formating timeslot hours for final view.
 * @type {Array} timeslots: Array of timeslots.
 * @type {Function} onTimeslotClick: Function to be excecuted when clicked.
 * @type {Function} renderTitle: Function to be used when rendering the title.
 * @type {Object} momentTime: MomentJS datetime object.
 */
Day.propTypes = {
  timeslots: PropTypes.array.isRequired,
  timeslotFormat: PropTypes.string.isRequired,
  timeslotShowFormat: PropTypes.string.isRequired,
  onTimeslotClick: PropTypes.func.isRequired,
  renderTitle: PropTypes.func.isRequired,
  momentTime: PropTypes.object.isRequired,
  initialDate: PropTypes.object.isRequired,
};
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

import React, { Component } from "react";
import PropTypes from "prop-types";

import { Calendar } from "react-date-range";

import { formatDate } from "../../util/functions";

const TODAY_DATE = new Date();

export class DatePicker extends Component {
  static propTypes = {
    dateSelected: PropTypes.func.isRequired,
  };

  state = {
    date: TODAY_DATE,
  };

  refreshDate = () => {
    const date = this.props.initialDate
      ? new Date(this.props.initialDate)
      : TODAY_DATE;
    if (!isNaN(date)) this.setState({ date });
  };

  onChange = (datetime) => {
    const stringDate = formatDate(
      datetime.getFullYear(),
      datetime.getMonth() + 1,
      datetime.getDate()
    );
    this.props.dateSelected(stringDate);
    this.setState({ date: datetime });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.initialDate !== this.props.initialDate) {
      this.refreshDate();
    }
  }

  componentDidMount() {
    this.refreshDate();
  }

  render() {
    return (
      <Calendar
        date={this.state.date}
        onChange={this.onChange}
        weekStartsOn={1}
      />
    );
  }
}

export default DatePicker;

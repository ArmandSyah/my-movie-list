import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { DatePicker } from "material-ui-pickers";

import {
  Button,
  Typography,
  withStyles,
  CssBaseline,
  Modal,
  Slide,
  IconButton,
  TextField
} from "@material-ui/core";
import Icon from "@mdi/react";
import { mdiBaby, mdiNeedle, mdiPlusCircle, mdiClose } from "@mdi/js";

import styles from "./Styles";

const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

class VaccinationRecord extends React.Component {
  render() {
    const { name, vaccinationDate, vaccineName } = this.props;
    const options = { year: "numeric", month: "long", day: "numeric" };

    return (
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date={vaccinationDate.toLocaleDateString("en-US", options)}
        iconStyle={{ background: "#87A878", color: "#fff" }}
        icon={<Icon path={mdiNeedle} />}
      >
        <h3 className="vertical-timeline-element-title">{`${name} received a vacination for ${vaccineName}`}</h3>
      </VerticalTimelineElement>
    );
  }
}

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datesUsed: [this.props.dateOfBirth],
      events: [],
      today: Date.now(),
      latestVaccinationDate: Date.now(),
      openAddModal: false
    };
  }

  componentDidMount() {
    const { name, dateOfBirth } = this.props;
    const { datesUsed } = this.state;
    const es = [];

    let days = 60;
    const vaccineList1 = ["diphtheria", "tetanus", "pertusis"];
    vaccineList1.forEach(vaccine => {
      es.unshift(
        <VaccinationRecord
          name={name}
          vaccinationDate={addDays(dateOfBirth, days)}
          vaccineName={vaccine}
        />
      );
      datesUsed.unshift(addDays(dateOfBirth, days));
      days += 7;
    });

    this.setState({ events: es });
  }

  handleModalAddVaccinationRecord = () => {
    this.setState({ openAddModal: true });
  };

  handleModalClose = () => {
    this.setState({ openAddModal: false });
  };

  addNewVaccinationRecord = (vaccineName, vaccinationDate) => {
    const { name } = this.props;
    const { datesUsed, events } = this.state;
    const record = (
      <VaccinationRecord
        name={name}
        vaccinationDate={vaccinationDate}
        vaccineName={vaccineName}
      />
    );
    var trueIndex = -1;
    let trueIndexFound = false;
    datesUsed.forEach((date, index) => {
      if (!trueIndexFound) {
        if (datesUsed.length === index + 1) {
          trueIndex = index;
          trueIndexFound = true;
        } else if (date <= vaccinationDate && date >= datesUsed[index + 1]) {
          trueIndex = index;
          trueIndexFound = true;
        }
      }
    });

    events.splice(trueIndex, 0, record);
    datesUsed.splice(trueIndex, 0, vaccinationDate);

    this.setState({ events, datesUsed, openAddModal: false });
  };

  render() {
    const { classes } = this.props;
    const { events } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <div
          style={{
            paddingTop: "30px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            style={{ marginTop: "10px", marginBottom: "10px" }}
          >
            Activity Timeline
          </Typography>
          <VerticalTimeline layout="2-columns">{events}</VerticalTimeline>
        </div>
      </main>
    );
  }
}

export default withStyles(styles)(Timeline);

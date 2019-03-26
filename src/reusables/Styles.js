import green from "@material-ui/core/colors/green";

const styles = theme => ({
  root: {},
  main: {
    flexGrow: 1,
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(650 + theme.spacing.unit * 3 * 2)]: {
      width: 650,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    fullWidth: true,
    display: "flex"
  },
  formIcon: { width: 46, height: 46 },
  line: {
    display: "inline-flex",
    verticalAlign: "bottom"
  },
  grow: {
    flexGrow: 1
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  showcaseroot: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    alignItems: "space-around"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

export default styles;
